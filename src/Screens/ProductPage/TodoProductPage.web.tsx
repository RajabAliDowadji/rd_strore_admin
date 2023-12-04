import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT_BRANDS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_SUB_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import {
  ProductBrandColumns,
  ProductBrand,
} from "../../Modal/GetProductBrands.modal";
import {
  GetProductSubCategoriesColumns,
  ProductSubCategory,
} from "../../Modal/GetProductSubCategories.modal";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import { multiImageUploadValidate } from "../../Validations/multiImageUpload.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import MultipleImageUpload from "../../Ui/Image/MultipleImageUpload.web";
import { uploadimage_placeholder, noimage_placeholder } from "./assets";
import FileInput from "../../components/Modals/FileInput/FileInput.web";
import "./ProductPage.web.css";
import {
  GetProductCategoriesColumns,
  ProductCategory,
} from "../../Modal/GetProductCategories.modal";

const configJSON = require("../../Constants/Products");

const TodoProductPage = () => {
  const initialData = useMemo(() => {
    return {
      product_title: "",
      product_size: "",
      product_MRP_price: "",
      product_price: "",
      product_description: "",
      product_sub_category: "",
      product_category: "",
      product_brand: "",
      product_images: [
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
        { file_url: "" },
      ],
      is_vegetarian: "",
    };
  }, []);
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fileModalOpen, setFileModalOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [productBrands, setProductBrands] = useState<ProductBrandColumns[]>([]);
  const [productCategories, setProductCategories] = useState<
    GetProductCategoriesColumns[]
  >([]);
  const [productSubCategories, setProductSubCategories] = useState<
    GetProductSubCategoriesColumns[]
  >([]);
  const [dataError, setDataError] = useState({
    errors: {
      product_title: false,
      product_size: false,
      product_MRP_price: false,
      product_price: false,
      product_description: false,
      product_brand: false,
      product_category: false,
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
      product_category: "",
      product_sub_category: "",
      product_images: "",
      is_vegetarian: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_BRANDS,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_product_by_id &&
      state.get_product_by_id.product &&
      state.get_product_by_id.product !== null
    ) {
      let temp: any = initialData;
      temp.product_title = state.get_product_by_id.product.product_title;
      temp.product_size = state.get_product_by_id.product.product_size;
      temp.product_MRP_price =
        state.get_product_by_id.product.product_MRP_price;
      temp.product_price = state.get_product_by_id.product.product_price;
      temp.product_description =
        state.get_product_by_id.product.product_description;
      temp.product_sub_category =
        state.get_product_by_id.product.product_sub_category._id;
      temp.product_category = state.get_product_by_id.product.product_category
        ? state.get_product_by_id.product.product_category._id
        : "";
      temp.product_brand = state.get_product_by_id.product.product_brand._id;
      temp.product_images = state.get_product_by_id.product.product_images;
      temp.is_vegetarian = state.get_product_by_id.product.is_vegetarian
        ? "true"
        : "false";
      setFiles(state.get_product_by_id.product.product_images);
      setFormData((prev: any) => ({
        ...prev,
        ...temp,
      }));
      dispatch({
        type: RESET_STATE,
        payload: { state: "products" },
      });
    }
  }, [dispatch, initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_brands &&
      state.get_product_brands.productBrands &&
      state.get_product_brands.productBrands.length !== 0
    ) {
      let tempArr: ProductBrandColumns[] = [];
      state.get_product_brands.productBrands.map((productBrand: ProductBrand) =>
        tempArr.push({
          _id: productBrand._id,
          brand_name: productBrand.brand_name,
        })
      );
      setProductBrands(tempArr);
    } else if (
      state &&
      state.get_product_brands &&
      state.get_product_brands.productBrands &&
      state.get_product_brands.productBrands.length === 0
    ) {
      setProductBrands([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_sub_categories &&
      state.get_product_sub_categories.productSubCategories &&
      state.get_product_sub_categories.productSubCategories.length !== 0
    ) {
      let tempArr: GetProductSubCategoriesColumns[] = [];
      state.get_product_sub_categories.productSubCategories.map(
        (productCategory: ProductSubCategory) =>
          tempArr.push({
            _id: productCategory._id,
            sub_category_name: productCategory.sub_category_name,
            category_name: productCategory.product_category.category_name,
          })
      );
      setProductSubCategories(tempArr);
    } else if (
      state &&
      state.get_product_sub_categories &&
      state.get_product_sub_categories.productSubCategories &&
      state.get_product_sub_categories.productSubCategories.length === 0
    ) {
      setProductSubCategories([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_categories &&
      state.get_product_categories.productCategories &&
      state.get_product_categories.productCategories.length !== 0
    ) {
      let tempArr: GetProductCategoriesColumns[] = [];
      state.get_product_categories.productCategories.map(
        (productCategory: ProductCategory) =>
          tempArr.push({
            _id: productCategory._id,
            category_name: productCategory.category_name,
          })
      );
      setProductCategories(tempArr);
    } else if (
      state &&
      state.get_product_categories &&
      state.get_product_categories.productCategories &&
      state.get_product_categories.productCategories.length === 0
    ) {
      setProductCategories([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_product &&
      state.add_edit_product.product &&
      state.add_edit_product.product !== null &&
      !state.add_edit_product.isError &&
      state.add_edit_product.message !== ""
    ) {
      successToaster(state.add_edit_product.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "products" },
      });
      navigate("/products");
    } else if (
      state &&
      state.add_edit_product &&
      state.add_edit_product.isError
    ) {
      errorToaster(state.add_edit_product.message);
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product &&
      !state.delete_product.isError &&
      state.delete_product.message !== ""
    ) {
      successToaster(state.delete_product.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "products" },
      });
      navigate("/products");
    } else if (state && state.delete_product && state.delete_product.isError) {
      errorToaster(state.get_product.message);
    }
  }, [dispatch, initialData, navigate, state]);

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

  const cancelProductHandle = () => {
    navigate("/products");
  };

  const deleteProductHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: { id: id },
    });
  };

  const onFileUploadClick = () => {
    setFileModalOpen(true);
  };

  const onFileClose = () => {
    setFileModalOpen(false);
  };

  const onFileUploadSuccess = (key: string, values: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: values,
    }));
    setFiles(values);
    setFileModalOpen(false);
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

  const dropDownOnChangeHandle = (
    fieldName: string,
    keyName: string,
    values: any
  ) => {
    const isValid = dropDownValidate(fieldName, values);
    setFormData((prev) => ({
      ...prev,
      [keyName]: values[0]._id,
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
    let tempFormData: any = formData;
    let productImages: any = formData.product_images;
    productImages = productImages.map((image: any) => image._id);
    tempFormData = { ...tempFormData, product_images: productImages };
    const isProdTitleValid = isEmpty("Product title", formData.product_title);
    const isProdSizeValid = isEmpty("Product size", formData.product_size);
    const isProdMRPPriceValid = isEmpty(
      "Product MRP price",
      formData.product_MRP_price.toString()
    );
    const isProdPriceValid = isEmpty(
      "Product price",
      formData.product_price.toString()
    );
    const isProdDescValid = isEmpty(
      "Product description",
      formData.product_description
    );
    const isProdCatValid = dropDownValidate(
      "Product category",
      formData.product_category
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
      isProdCatValid.status ||
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
          product_category: isProdCatValid.status,
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
          product_category: isProdCatValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT,
          payload: { id: id, values: tempFormData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT,
          payload: tempFormData,
        });
      }
    }
  };

  const isVegetarianItems = [
    { label: "Yes", _id: "true" },
    { label: "No", _id: "false" },
  ];

  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <FileInput
          open={fileModalOpen}
          onClose={onFileClose}
          name={"product_images"}
          multiple={true}
          onSuccess={onFileUploadSuccess}
          files={files}
        />
        <Box className="prodpage_mainContainer">
          <Box className="prodpage_titleContainer">
            <Typography className="prodpage_titleText">
              {isEdit
                ? configJSON.editProductTitleText
                : configJSON.createProductTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box className="prodpage_textFieldContainer">
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
                  <Box className="prodpage_textFieldContainer">
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
                  <Box className="prodpage_textFieldContainer">
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
                <Grid item xs={3}>
                  <Box className="prodpage_textFieldContainer">
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
                <Grid item xs={3}>
                  <Box className="prodpage_textFieldContainer">
                    <DropDown
                      label="Product category"
                      name="product_category"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      labelField={"category_name"}
                      valueField={"_id"}
                      data={productCategories}
                      values={formData.product_category}
                      placeholder="Please select product category."
                      error={dataError.errors.product_category}
                      errorText={dataError.errorMsg.product_category}
                      onChange={dropDownOnChangeHandle.bind(
                        this,
                        "Product category",
                        "product_category"
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box className="prodpage_textFieldContainer">
                    <DropDown
                      label="Product sub-category"
                      name="product_sub_category"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      labelField={"sub_category_name"}
                      valueField={"_id"}
                      data={productSubCategories}
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
                <Grid item xs={3}>
                  <Box className="prodpage_textFieldContainer">
                    <DropDown
                      label="Product brand"
                      name="product_brand"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      labelField={"brand_name"}
                      valueField={"_id"}
                      data={productBrands}
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
                  <Box className="prodpage_textFieldContainer">
                    <CustomTextField
                      id="product_description"
                      type="text"
                      label="Product Description"
                      name="product_description"
                      placeholder=""
                      multiline={true}
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
                  <Box className="prodpage_textFieldContainer">
                    <DropDown
                      label="Is Vegetarian"
                      name="is_vegetarian"
                      multi={false}
                      disabled={false}
                      clearable={false}
                      required={false}
                      labelField={"label"}
                      valueField={"_id"}
                      data={isVegetarianItems}
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
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MultipleImageUpload
                    uploadimg_placeHolder={uploadimage_placeholder}
                    noimage_placeHolder={noimage_placeholder}
                    title={"Product Images"}
                    onClick={onFileUploadClick}
                    selectedImage={formData.product_images}
                    error={dataError.errors.product_images}
                    errorText={dataError.errorMsg.product_images}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="prodpage_buttonSubContainer">
              {isEdit ? (
                <Box className="prodpage_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Update"
                    disabled={false}
                    style={{ margin: "0px 15px 0px 0px" }}
                  />
                  <DeleteButton
                    title="Delete"
                    disabled={false}
                    style={{ margin: "0px 0px 0px 15px" }}
                    onClick={deleteProductHandle}
                  />
                </Box>
              ) : (
                <Box className="prodpage_BtnContainer">
                  <ActiveButton
                    type="submit"
                    title="Save"
                    disabled={false}
                    style={{ margin: "0px 15px 0px 0px" }}
                  />
                  <CancelButton
                    title="Cancel"
                    disabled={false}
                    style={{ margin: "0px 0px 0px 15px" }}
                    onClick={cancelProductHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default TodoProductPage;
