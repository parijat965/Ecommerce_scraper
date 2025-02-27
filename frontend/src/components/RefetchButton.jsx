/* eslint-disable react/prop-types */
import { useState } from "react";
import { refetchProduct } from "../api";
import { IconButton, CircularProgress, Snackbar, Alert } from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

const RefetchButton = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleRefetch = () => {
    setLoading(true);

    refetchProduct(productId)
      .then((res) => {
        setLoading(false);
        setAlert({
          open: true,
          message: res.data.message, // ✅ Use actual response message from API
          severity: res.status === 202 ? "success" : "info", // ✅ Differentiate messages
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Error refetching product data.",
          severity: "error",
        });
        console.error("Error refetching product:", err);
      });
  };

  return (
    <>
      <IconButton color="secondary" onClick={handleRefetch} disabled={loading}>
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <RefreshOutlinedIcon />
        )}
      </IconButton>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RefetchButton;
