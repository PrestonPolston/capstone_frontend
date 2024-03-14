import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GetProductReview from "./GetProductReview";
import RelatedProducts from "./ReletedProducts";

export default function InfoTab({ productData }) {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productData) {
      setLoading(false);
    }
  }, [productData]);

  const ProductDescription = () => {
    if (!productData || !productData.description) {
      return <Typography>No description available</Typography>;
    }

    return <Typography>{productData.description}</Typography>;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        bgcolor: "primary",
        color: "primary",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "primary" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Product Description" value="1" />
            <Tab label="Reviews" value="2" />
            <Tab label="Related Products" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ backgroundColor: "background.paper" }}>
          <ProductDescription />
        </TabPanel>
        <TabPanel value="2">
          <GetProductReview productId={productData ? productData.id : ""} />
        </TabPanel>
        <TabPanel value="3">
          {loading ? (
            <Typography>Loading Related Products...</Typography>
          ) : (
            <RelatedProducts />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
