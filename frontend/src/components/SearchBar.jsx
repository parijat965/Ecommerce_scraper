/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  TextField,
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

const SearchBar = ({ onSearch, width = "100%" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false);
    }, 500); // Debounce time reduced for faster UX

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm.trim());
  }, [debouncedSearchTerm, onSearch]);

  return (
    <Box width={width}>
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};

export default SearchBar;
