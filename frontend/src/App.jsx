import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import CategoryDropdown from "./components/CategoryDropdown";
import ProductList from "./components/ProductList";
import ScrapeProductForm from "./components/ScrapeProductForm";
import SearchBar from "./components/SearchBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchTriggered(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTriggered(true);
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          E-commerce Scraper
        </Typography>
      </Box>
      <ScrapeProductForm />

      <Box display="flex" gap={2} mt={3}>
        <SearchBar onSearch={handleSearch} width="50%" />
        <CategoryDropdown onSelectCategory={handleCategoryChange} width="50%" />
      </Box>

      {searchTriggered && (
        <ProductList categoryId={selectedCategory} searchQuery={searchQuery} />
      )}
    </Container>
  );
}

export default App;
