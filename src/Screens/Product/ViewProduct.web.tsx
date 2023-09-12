import React, { useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useNavigate, useParams } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import ViewMultiImages from "../../Ui/Image/ViewMultiImages.web";
import { noimage_placeholder } from "./assets";
import "./Products.web.css";

const configJSON = require("../../Constants/Products");

const ViewProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const addProductHandle = () => {
    navigate("/products/create");
  };
  const editProductHandle = () => {
    navigate(`/products/edit/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    navigate("/products");
    //TODO DELETE PRODUCT API CALL
  };
  const rowImageData = [
    {
      key: "21",
      imageURL:
        "data:image/jpeg;base64,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",
    },
    {
      key: "21",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zcSwaz_lEArFKQZto8ghB3Pc2WBKmV6Ahw&usqp=CAU",
    },
    {
      key: "21",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4hp33602mhDIkKQ6ZJrw3aDiP986fRmKUw&usqp=CAU",
    },
    {
      key: "21",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zcSwaz_lEArFKQZto8ghB3Pc2WBKmV6Ahw&usqp=CAU",
    },
    {
      key: "21",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zcSwaz_lEArFKQZto8ghB3Pc2WBKmV6Ahw&usqp=CAU",
    },
    {
      key: "21",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLCkwul4daq5UuXAkGgs4QhyNOF3ZfjuMVQ&usqp=CAU",
    },
  ];
  const responseData = {
    _id: "64eb4cdd8a92b57617fee7ba",
    product_title: "Amul Quality Ghee",
    product_size: "1000g",
    product_MRP_price: 600,
    product_price: 550,
    product_description:
      "Amul ghee is a good source of energy and can be consumed for better digestion. It is rich in nutrients and provides vitality to the human body. Made from fresh cream, this ghee ensures a rich aroma and granular texture. It is a vegetarian product and does not contain any artificial colours or added preservatives. It provides fat-soluble vitamin A, D, K, and E and helps to reduce the risk of cardiovascular problems. Its Vitamin A component will improve your eye health. Amul ghee price 1 kg comes in a pouch and also in tetra packs, which are travel-friendly and easy to use There is a wide range of Amul ghee packs available online in different forms and price ranges. Pure ghee and cow ghee are two of the most popular products available in stock. You can check the product label, if you want to know more about Amul ghee price. This ghee from Amul is made from natural ingredients and is safe to use. By consuming this product, you can boost your memory power and multiply the taste manifold. Add a spoon of ghee to your food and get the richness of its flavour and aroma. Ghee 1 kg price can be ordered online from the comfort of your home.",
    product_images: ["64eb60ec015f0128e29e03af", "64eb60f1015f0128e29e03b1"],
    product_sub_category: {
      _id: "64eb34721ab30213d3853b82",
      sub_category_name: "Buffalo Ghee",
      search_name: "",
      product_category: "64eb318a3d17ea9cd293adf3",
      createdAt: "2023-08-27T11:33:06.618Z",
      updatedAt: "2023-08-27T11:33:06.618Z",
    },
    product_brand: {
      sub_category_ids: {
        sub_category: ["64eb34721ab30213d3853b82"],
      },
      _id: "64eb462cf0896dfc3973fe70",
      brand_name: "Amul",
      createdAt: "2023-08-27T12:48:44.380Z",
      updatedAt: "2023-08-27T12:49:29.812Z",
    },
    search_name: "amul ghee",
    is_published: true,
    is_vegetarian: true,
    createdAt: "2023-08-27T13:17:17.365Z",
    updatedAt: "2023-08-27T14:44:48.917Z",
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="product_mainContainer">
          <Box className="product_buttonContainer">
            <ActiveButton
              title={configJSON.productBtnTxt}
              disabled={false}
              onClick={addProductHandle}
            />
          </Box>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_title"
                      type="text"
                      label="Product title"
                      name="product_title"
                      value={responseData.product_title}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_size"
                      type="text"
                      label="Product size"
                      name="product_size"
                      value={responseData.product_size}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_MRP_price"
                      type="text"
                      label="Product MRP price"
                      name="product_MRP_price"
                      value={responseData.product_MRP_price.toString()}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_price"
                      type="text"
                      label="Product price"
                      name="product_price"
                      disabled={true}
                      value={responseData.product_price.toString()}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_sub_category"
                      type="text"
                      label="Product sub-category"
                      name="product_sub_category"
                      disabled={true}
                      value={
                        responseData.product_sub_category.sub_category_name
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_brand"
                      type="text"
                      label="Product brand"
                      name="product_brand"
                      value={responseData.product_brand.brand_name}
                      disabled={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_description"
                      type="text"
                      label="Product Description"
                      name="product_description"
                      disabled={true}
                      multiline={true}
                      value={responseData.product_description}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="is_vegetarian"
                      type="text"
                      label="Is vegetarian"
                      name="is_vegetarian"
                      disabled={true}
                      value={responseData.is_vegetarian ? "Yes" : "No"}
                    />
                  </Box>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="search_name"
                      type="text"
                      label="Search name"
                      name="search_name"
                      disabled={true}
                      value={responseData.search_name}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="product_textFieldContainer">
                    <ViewMultiImages
                      noimage_placeHolder={noimage_placeholder}
                      title={"Product images"}
                      selectedImage={rowImageData}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="product_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editProductHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteBtnClickHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};
export default ViewProduct;
