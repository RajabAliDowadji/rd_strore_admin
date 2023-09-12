import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import { isEmpty } from "../../Utils/common";
import MultipleImageUpload from "../../Ui/Image/MultipleImageUpload.web";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import { uploadimage_placeholder, noimage_placeholder } from "./assets";
import { multiImageUploadValidate } from "../../Validations/multiImageUpload.web";
import "./Products.web.css";

const configJSON = require("../../Constants/Products");

const TodoProduct = () => {
  const initialData = {
    product_title: "",
    product_size: "",
    product_MRP_price: "",
    product_price: "",
    product_description: "",
    product_sub_category: [],
    product_brand: [],
    product_images: [
      { key: "21", imageURL: "" },
      { key: "21", imageURL: "" },
      { key: "21", imageURL: "" },
      { key: "21", imageURL: "" },
      { key: "21", imageURL: "" },
      { key: "21", imageURL: "" },
    ],
    search_name: "",
    is_vegetarian: [],
  };
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      product_title: false,
      product_size: false,
      product_MRP_price: false,
      product_price: false,
      product_description: false,
      product_brand: false,
      product_sub_category: false,
      product_images: false,
      is_vegetarian: false,
    },
    errorMsg: {
      product_title: "",
      product_size: "",
      product_MRP_price: "",
      product_price: "",
      product_description: "",
      product_brand: "",
      product_sub_category: "",
      product_images: "",
      is_vegetarian: "",
    },
  });
  useEffect(() => {
    const route = location.pathname.split("/");
    if (route && route.length > 0) {
      if (route[2] === "create") {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }
  }, [location]);
  const cancelshopHandle = () => {
    navigate("/products");
  };

  const deleteshopHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    navigate("/products");
    //TODO DELETE SHOP CATEGORY API CALL
  };

  const onMultiFileChange = () => {
    //TODO MULTI FILE ON CHANGE
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [event.target.name]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [event.target.name]: isValid.message,
      },
    }));
  };

  const optionalInputChangeHandle = (fieldName: string, event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const dropDownOnChangeHandle = (
    fieldName: string,
    keyName: string,
    values: any
  ) => {
    const isValid = dropDownValidate(fieldName, values);
    setFormData((prev) => ({
      ...prev,
      [keyName]: values,
    }));
    setDataError((prev) => ({
      ...prev,
      errors: { ...dataError.errors, [keyName]: isValid.status },
      errorMsg: {
        ...dataError.errorMsg,
        [keyName]: isValid.message,
      },
    }));
  };

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdTitleValid = isEmpty("Product title", formData.product_title);
    const isProdSizeValid = isEmpty("Product size", formData.product_size);
    const isProdMRPPriceValid = isEmpty(
      "Product MRP price",
      formData.product_MRP_price
    );
    const isProdPriceValid = isEmpty("Product price", formData.product_price);
    const isProdDescValid = isEmpty(
      "Product description",
      formData.product_description
    );
    const isProdBrandValid = dropDownValidate(
      "Product brand",
      formData.product_brand
    );

    const isProdSubCatValid = dropDownValidate(
      "Product sub-category",
      formData.product_sub_category
    );

    const isProdImagesValid = multiImageUploadValidate(
      "Product images",
      formData.product_images
    );
    const isVegetarianValid = dropDownValidate(
      "Whether Product is vegetarian or not.",
      formData.is_vegetarian
    );
    if (
      isProdTitleValid.status ||
      isProdSizeValid.status ||
      isProdMRPPriceValid.status ||
      isProdPriceValid.status ||
      isProdDescValid.status ||
      isProdBrandValid.status ||
      isProdSubCatValid.status ||
      isProdImagesValid.status ||
      isVegetarianValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          product_title: isProdTitleValid.status,
          product_size: isProdSizeValid.status,
          product_MRP_price: isProdMRPPriceValid.status,
          product_price: isProdPriceValid.status,
          product_description: isProdDescValid.status,
          product_brand: isProdBrandValid.status,
          product_sub_category: isProdSubCatValid.status,
          product_images: isProdImagesValid.status,
          is_vegetarian: isVegetarianValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          product_title: isProdTitleValid.message,
          product_size: isProdSizeValid.message,
          product_MRP_price: isProdMRPPriceValid.message,
          product_price: isProdPriceValid.message,
          product_description: isProdDescValid.message,
          product_brand: isProdBrandValid.message,
          product_sub_category: isProdSubCatValid.message,
          product_images: isProdImagesValid.message,
          is_vegetarian: isVegetarianValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE shop API CALL
        navigate("/products");
      } else {
        // TODO CREATE shop API CALL
        navigate("/products");
      }
    }
  };

  const items = [
    { label: "Last 7 Days", value: 7 },
    { label: "Last 28 Days", value: 28 },
    { label: "Last 90 Days", value: 90 },
  ];

  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="product_todoContainer">
          <Box className="product_titleContainer">
            <Typography className="product_titleText">
              {isEdit
                ? configJSON.editProductTitleText
                : configJSON.createProductTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="product_title"
                      type="text"
                      label="Product title"
                      name="product_title"
                      value={formData.product_title}
                      error={dataError.errors.product_title}
                      errorText={dataError.errorMsg.product_title}
                      onChange={inputChangeHandle.bind(this, "Product title")}
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
                      value={formData.product_size}
                      error={dataError.errors.product_size}
                      errorText={dataError.errorMsg.product_size}
                      onChange={inputChangeHandle.bind(this, "Product size")}
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
                      value={formData.product_MRP_price}
                      error={dataError.errors.product_MRP_price}
                      errorText={dataError.errorMsg.product_MRP_price}
                      onChange={inputChangeHandle.bind(
                        this,
                        "Product MRP price"
                      )}
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
                      value={formData.product_price}
                      error={dataError.errors.product_price}
                      errorText={dataError.errorMsg.product_price}
                      onChange={inputChangeHandle.bind(this, "Product price")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <DropDown
                      label="Product sub-category"
                      name="product_sub_category"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      data={items}
                      values={formData.product_sub_category}
                      placeholder="Please select Product sub-category"
                      error={dataError.errors.product_sub_category}
                      errorText={dataError.errorMsg.product_sub_category}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Product sub-category",
                        "product_sub_category"
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <DropDown
                      label="Product brand"
                      name="product_brand"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      data={items}
                      values={formData.product_brand}
                      placeholder="Please select product brand."
                      error={dataError.errors.product_brand}
                      errorText={dataError.errorMsg.product_brand}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Product brand",
                        "product_brand"
                      )}
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
                      placeholder=""
                      multiline={true}
                      minRows={7}
                      maxRows={7}
                      value={formData.product_description}
                      error={dataError.errors.product_description}
                      errorText={dataError.errorMsg.product_description}
                      onChange={inputChangeHandle.bind(
                        this,
                        "Product Description"
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="product_textFieldContainer">
                    <DropDown
                      label="Is Vegetarian"
                      name="is_vegetarian"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      data={items}
                      values={formData.is_vegetarian}
                      placeholder="Product is vegetarian."
                      error={dataError.errors.is_vegetarian}
                      errorText={dataError.errorMsg.is_vegetarian}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Whether Product is vegetarian or not.",
                        "is_vegetarian"
                      )}
                    />
                  </Box>
                  <Box className="product_textFieldContainer">
                    <CustomTextField
                      id="search_name"
                      type="text"
                      label="Search name"
                      name="search_name"
                      value={formData.search_name}
                      onChange={optionalInputChangeHandle}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MultipleImageUpload
                    uploadimg_placeHolder={uploadimage_placeholder}
                    noimage_placeHolder={noimage_placeholder}
                    title={"Product images"}
                    onFileChange={onMultiFileChange}
                    selectedImage={formData.product_images}
                    error={dataError.errors.product_images}
                    errorText={dataError.errorMsg.product_images}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="product_buttonSubContainer">
              {isEdit ? (
                <Box className="product_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Update"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <DeleteButton
                    title="Delete"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={deleteshopHandle}
                  />
                </Box>
              ) : (
                <Box className="product_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Save"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 15px 0px 0px" }}
                  />
                  <CancelButton
                    title="Cancel"
                    disabled={false}
                    style={{ width: "205px", margin: "0px 0px 0px 15px" }}
                    onClick={cancelshopHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default TodoProduct;
