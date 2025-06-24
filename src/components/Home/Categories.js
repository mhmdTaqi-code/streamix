import React, { useEffect } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import GETALLCAT from './../../redux/action/CatgAction';
import { axios } from 'axios';
import Baseurl from './../../Api/BaceUrl';

export default function Categories() {


const a = async () => {
  const res = await Baseurl.get("/live/api/streams/?categories=1");
  console.log(res.data); // اطبع البيانات هنا
};




const { catg: categories, isLoading } = useSelector(state => state.catg);
const dispatch = useDispatch()

useEffect(()=>{
dispatch(GETALLCAT())
a(); 
},[])

useEffect(() => {
  console.log("Updated categories: ", categories);
}, [categories]);





  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ color: "#000", mb: 2 }}>Categories</Typography>
      <Grid container spacing={2}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    bgcolor: "#fafafa",
                    color: "#000",
                    borderRadius: 2,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={cat.image}
                    alt={cat.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {cat.title}
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
