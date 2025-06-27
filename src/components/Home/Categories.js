import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import GETALLCAT from "../../redux/action/CatgAction";

export default function Categories() {
  const dispatch = useDispatch();
  const { catg: categories, isLoading } = useSelector((state) => state.catg);
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    dispatch(GETALLCAT()); // هذا يفترض أنه يجلب البيانات من API الصحيح
  }, []);

  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: darkMode ? "#fff" : "#000", mb: 2 }}
      >
        categories
      </Typography>

      <Grid container spacing={2}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={cat.id}>
            <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0 8px 20px rgba(255,255,255,0.05)"
                      : "0 8px 20px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={cat.Category_img}
                    alt={cat.name}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        color: darkMode ? "#fff" : "#000",
                      }}
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Tilt>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
