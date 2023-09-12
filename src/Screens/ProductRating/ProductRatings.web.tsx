import React from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box, Typography } from "@material-ui/core";
import DataTable from "../../components/DataTable/DataTable.web";
import "./ProductRatings.web.css";

const configJSON = require("../../Constants/Products");

const ProductRatings = () => {
  const rows = [
    {
      _id: "64eb569e0165857d2237d1ec",
      rating: 2,
      product: {
        product_title: "Amul Quality Ghee",
        product_size: "1000g",
        product_MRP_price: 600,
        product_price: 550,
        product_sub_category: "64eb34721ab30213d3853b82",
        product_brand: "64eb462cf0896dfc3973fe70",
        is_vegetarian: true,
      },
    },
  ];
  return (
    <Box>
      <Dashboard>
        <Box className="productRating_mainContainer">
          <Box className="productRating_buttonContainer">
            <Typography className="productRating_titleText">
              {configJSON.productRatingTxt}
            </Typography>
          </Box>
          <DataTable
            rows={rows}
            columns={configJSON.productRatingColumns}
            onViewClick={undefined}
            onEditClick={undefined}
            onDeleteClick={undefined}
            isAction={false}
          />
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ProductRatings;
