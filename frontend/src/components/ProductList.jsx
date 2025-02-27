/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import ImageCarousel from "./ImageCarousel";
import RefetchButton from "./RefetchButton";

const ProductList = ({ categoryId, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!categoryId && !searchQuery) {
      setProducts([]);
      return;
    }
    fetchProducts(categoryId, searchQuery, currentPage)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.meta.total_pages);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [categoryId, searchQuery, currentPage]);

  return (
    <Box mt={3}>
      {products.length === 0 ? (
        <Typography variant="h6">No products found.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {product.images?.length > 0 && (
                    <ImageCarousel images={product.images} />
                  )}

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      overflowY: "auto",
                      maxHeight: "140px",
                      padding: "8px",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mt: 1,
                        flexWrap: "wrap",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <Chip
                        label={`Size: ${product.size}`}
                        color="primary"
                        variant="outlined"
                        sx={{ minWidth: "100px", textAlign: "center" }}
                      />
                      <Chip
                        label={`Price: ₹${product.price}`}
                        color="secondary"
                        variant="outlined"
                        sx={{ minWidth: "100px", textAlign: "center" }}
                      />
                      <Chip
                        label={`${product.discount}`}
                        color="success"
                        variant="filled"
                        sx={{ minWidth: "100px", textAlign: "center" }}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "0.85rem", mt: 1 }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>

                  <Box display="flex" gap={1} p={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={product.url}
                      target="_blank"
                      fullWidth
                      sx={{ fontSize: "0.8rem", borderRadius: "8px" }}
                    >
                      View Product
                    </Button>

                    <RefetchButton productId={product.id} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductList;
