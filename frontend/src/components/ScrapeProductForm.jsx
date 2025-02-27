import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Alert, Snackbar } from "@mui/material";

const ScrapeProductForm = () => {
  const [productUrl, setProductUrl] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [open, setOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleScrape = () => {
    if (!productUrl.trim()) {
      setMessage({
        text: "Please enter a Flipkart product URL.",
        type: "error",
      });
      setOpen(true);
      return;
    }

    axios
      .post(`${API_URL}/products`, { url: productUrl })
      .then((res) => {
        setMessage({ text: res.data.message, type: "success" });
        setProductUrl("");
        setOpen(true);
      })
      .catch((err) => {
        setMessage({
          text: err.response?.data?.error || "Error initiating scraping.",
          type: "error",
        });
        setOpen(true);
      });
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      <TextField
        label="Product URL"
        variant="outlined"
        fullWidth
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="secondary" onClick={handleScrape}>
        Scrape Product
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setOpen(false)}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScrapeProductForm;
