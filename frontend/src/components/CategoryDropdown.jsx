/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const CategoryDropdown = ({ onSelectCategory, width = "100%" }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <Box width={width}>
      {" "}
      <FormControl fullWidth>
        {" "}
        <InputLabel>Select a Category</InputLabel>
        <Select
          onChange={(e) => onSelectCategory(e.target.value)}
          defaultValue=""
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryDropdown;
