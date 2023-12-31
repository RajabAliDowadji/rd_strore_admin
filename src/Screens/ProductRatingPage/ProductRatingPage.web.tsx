import { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/DataTable/DataTable.web";
import { GET_PRODUCT_RATINGS } from "../../Hooks/Saga/Constant";
import NoDataFound from "../../Ui/Data/NoDataFound.web";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  GetProductRatingsColumns,
  ProductRating,
} from "../../Modal/GetProductRatings.modal";
import "./ProductRatingPage.web.css";

const configJSON = require("../../Constants/Products");

const ProductRatingPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [ProductRatings, setProductRatings] = useState<
    GetProductRatingsColumns[]
  >([]);
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_RATINGS,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_ratings &&
      state.get_product_ratings.productRatings &&
      state.get_product_ratings.productRatings.length !== 0
    ) {
      let tempArr: GetProductRatingsColumns[] = [];
      state.get_product_ratings.productRatings.map(
        (productRating: ProductRating) =>
          tempArr.push({
            _id: productRating._id,
            product_title: productRating.product.product_title,
            product_size: productRating.product.product_size,
            product_MRP_price: productRating.product.product_MRP_price,
            product_price: productRating.product.product_price,
            sub_category_name:
              productRating.product.product_sub_category.sub_category_name,
            brand_name: productRating.product.product_brand.brand_name,
            rating: productRating.rating,
            is_vegetarian: productRating.product.is_vegetarian,
          })
      );
      setProductRatings(tempArr);
    }
  }, [state]);

  return (
    <Box>
      <DashboardPage>
        <Box className="prodratingpage_buttonContainer">
          <Typography className="prodratingpage_maintitleText">
            Product Rating
          </Typography>
        </Box>
        {ProductRatings.length === 0 ? (
          <NoDataFound />
        ) : (
          <DataTable
            rows={ProductRatings}
            columns={configJSON.productRatingColumns}
            onViewClick={undefined}
            onEditClick={undefined}
            onDeleteClick={undefined}
            isAction={false}
          />
        )}
      </DashboardPage>
    </Box>
  );
};

export default ProductRatingPage;
