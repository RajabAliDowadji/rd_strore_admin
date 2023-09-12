import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const ViewProductBrand = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addProductBrandHandle = () => {
    navigate("/product-brands/create");
  };
  const editProductBrandHandle = () => {
    navigate(`/product-brands/edit/${id}`);
  };
  const deleteProductBrandHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/product-brands");
    //TODO DELETE PRODUCT BRAND API CALL
  };

  const dummyData = {
    _id: "64eb462cf0896dfc3973fe70",
    brand_name: "Amul",
    sub_category_ids: {
      sub_category: [
        {
          _id: "64eb34721ab30213d3853b82",
          sub_category_name: "Buffalo Ghee",
          search_name: "",
          product_category: {
            _id: "64eb318a3d17ea9cd293adf3",
            category_name: "Ghee",
            search_name: "",
            product_type: "64eb2fb3537c71c902a55602",
            createdAt: "2023-08-27T11:20:42.278Z",
            updatedAt: "2023-08-27T11:20:42.278Z",
          },
          createdAt: "2023-08-27T11:33:06.618Z",
          updatedAt: "2023-08-27T11:33:06.618Z",
        },
      ],
    },
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodBrand_mainContainer">
          <Box className="prodBrand_buttonContainer">
            <ActiveButton
              title={configJSON.productTypeBtnTxt}
              disabled={false}
              onClick={addProductBrandHandle}
            />
          </Box>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="prodBrand_textFieldContainer">
                    <CustomTextField
                      id="_id"
                      type="text"
                      label="Id"
                      name="_id"
                      value={dummyData._id}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="prodBrand_textFieldContainer">
                    <CustomTextField
                      id="brand_name"
                      type="text"
                      label="Brand name"
                      name="brand_name"
                      value={dummyData.brand_name}
                      disabled={true}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider className="prodBrand_textFieldContainer" />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className="prodBrand_titleText">
                    Product Sub-Categories
                  </Typography>
                </Grid>
                {dummyData.sub_category_ids.sub_category.map((data: any) => (
                  <>
                    <Grid item xs={4}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="_id"
                          type="text"
                          label="Sub-category Id"
                          name="_id"
                          value={data._id}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="sub_category_name"
                          type="text"
                          label="Sub-category name"
                          name="sub_category_name"
                          value={data.sub_category_name}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="prodBrand_textFieldContainer">
                        <CustomTextField
                          id="category_name"
                          type="text"
                          label="Category name"
                          name="category_name"
                          value={data.product_category.category_name}
                          disabled={true}
                        />
                      </Box>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box className="prodBrand_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductBrandHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteProductBrandHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProductBrand;
