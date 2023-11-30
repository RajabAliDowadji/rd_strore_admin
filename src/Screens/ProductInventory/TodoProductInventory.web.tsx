import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import "./ProductInventories.web.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_INVENTORY,
  DELETE_PRODUCT_INVENTORY,
  EDIT_PRODUCT_INVENTORY,
  GET_PRODUCTS,
  GET_PRODUCT_BRANDS,
  GET_PRODUCT_INVENTORY_BY_ID,
  GET_PRODUCT_SUB_CATEGORIES,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import {
  GetProductSubCategoriesColumns,
  ProductSubCategory,
} from "../../Modal/GetProductSubCategories.modal";
import {
  ProductBrand,
  ProductBrandColumns,
} from "../../Modal/GetProductBrands.modal";
import { GetProductColumns, Product } from "../../Modal/GetProducts.modal";

const configJSON = require("../../Constants/Products");

const TodoProductInventory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({ quantity: "", product: "" });
  const [subCategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [products, setProducts] = useState<GetProductColumns[]>([]);
  const [productBrands, setProductBrands] = useState<ProductBrandColumns[]>([]);
  const [productSubCategories, setProductSubCategories] = useState<
    GetProductSubCategoriesColumns[]
  >([]);

  const [dataError, setDataError] = useState({
    errors: {
      quantity: false,
      product: false,
    },
    errorMsg: {
      quantity: "",
      product: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_INVENTORY_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
      payload: { brand_name: "", sub_category_name: "" },
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORIES,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_BRANDS,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_products &&
      state.get_products.products &&
      state.get_products.products.length !== 0
    ) {
      let tempArr: GetProductColumns[] = [];
      const filteredData = state.get_products.products.filter(
        (product: Product) => product._id === formData.product
      );
      if (filteredData.length === 0) {
        setFormData((prev: any) => ({
          ...prev,
          product: "",
        }));
      }
      state.get_products.products.map((product: Product) =>
        tempArr.push({
          _id: product._id,
          product_title: product.product_title,
          product_size: product.product_size,
          product_MRP_price: product.product_MRP_price,
          product_price: product.product_price,
          sub_category_name: product.product_sub_category.sub_category_name,
          brand_name: product.product_brand.brand_name,
          is_vegetarian: product.is_vegetarian,
          is_published: product.is_published,
        })
      );
      setProducts(tempArr);
    } else if (
      state &&
      state.get_products &&
      state.get_products.products &&
      state.get_products.products.length === 0
    ) {
      setFormData((prev: any) => ({
        ...prev,
        product: "",
      }));
      setProducts([]);
    }
  }, [formData.product, state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_inventory_by_id &&
      state.get_product_inventory_by_id.productInventory &&
      state.get_product_inventory_by_id.productInventory !== null
    ) {
      let temp: any = { quantity: "", product: "" };
      const productInventory =
        state.get_product_inventory_by_id.productInventory;
      temp.quantity = productInventory.quantity;
      temp.product = productInventory.product._id;
      setFormData((prev: any) => ({
        ...prev,
        ...temp,
      }));
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
      state.delete_product_inventory &&
      !state.delete_product_inventory.isError &&
      state.delete_product_inventory.message !== ""
    ) {
      successToaster(state.delete_product_inventory.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-inventories" },
      });
      navigate("/product-inventories");
    } else if (
      state &&
      state.delete_product_inventory &&
      state.delete_product_inventory.isError
    ) {
      errorToaster(state.delete_product_inventory.message);
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_inventory &&
      state.add_edit_product_inventory.productInventory &&
      state.add_edit_product_inventory.productInventory !== null &&
      !state.add_edit_product_inventory.isError &&
      state.add_edit_product_inventory.message !== ""
    ) {
      successToaster(state.add_edit_product_inventory.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-inventories" },
      });
      navigate("/product-inventories");
    }
  }, [dispatch, navigate, state]);

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
    navigate("/product-inventories");
  };

  const deleteshopHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_INVENTORY,
      payload: { id: id },
    });
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    setFormData((prev: any) => ({
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
    if (keyName === "product_sub_category") {
      setSubCategoryId(values[0]._id);
      dispatch({
        type: GET_PRODUCTS,
        payload: { brand_name: "", sub_category_name: values[0]._id },
      });
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-inventories" },
      });
    } else if (keyName === "product_brand") {
      setBrandId(values[0]._id);
      dispatch({
        type: GET_PRODUCTS,
        payload: { brand_name: values[0]._id, sub_category_name: "" },
      });
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-inventories" },
      });
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [keyName]: values.length !== 0 ? values[0]._id : "",
      }));
    }
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
    const isProdQtyValid = isEmpty("Product quantity", formData.quantity);
    const isProdValid = dropDownValidate("Product", formData.product);
    if (isProdQtyValid.status || isProdValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          quantity: isProdQtyValid.status,
          product: isProdValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          quantity: isProdQtyValid.message,
          product: isProdValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_INVENTORY,
          payload: {
            id: id,
            values: formData,
          },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_INVENTORY,
          payload: formData,
        });
      }
    }
  };

  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product Inventory"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="productInventory_todoContainer">
          <Box className="productInventory_titleContainer">
            <Typography className="productInventory_titleText">
              {isEdit
                ? configJSON.editProductInvTitleText
                : configJSON.createProductInvTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box>
              <Box className="productInventory_textFieldContainer">
                <CustomTextField
                  id="quantity"
                  type="text"
                  label="Product quantity"
                  name="quantity"
                  value={formData.quantity}
                  error={dataError.errors.quantity}
                  errorText={dataError.errorMsg.quantity}
                  onChange={inputChangeHandle.bind(this, "Product quantity")}
                />
              </Box>
              <Box className="productInventory_textFieldContainer">
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
                  values={subCategoryId}
                  placeholder="Please select Product sub-category"
                  onChange={dropDownOnChangeHandle.bind(
                    this,
                    "Product sub-category",
                    "product_sub_category"
                  )}
                />
              </Box>
              <Box className="productInventory_textFieldContainer">
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
                  values={brandId}
                  placeholder="Please select product brand."
                  onChange={dropDownOnChangeHandle.bind(
                    this,
                    "Product brand",
                    "product_brand"
                  )}
                />
              </Box>
              <Box className="productInventory_textFieldContainer">
                <DropDown
                  label="Product"
                  name="product"
                  multi={false}
                  disabled={false}
                  clearable={false}
                  required={false}
                  labelField={"product_title"}
                  valueField={"_id"}
                  data={products}
                  values={formData.product}
                  placeholder="Please select product."
                  error={dataError.errors.product}
                  errorText={dataError.errorMsg.product}
                  onChange={dropDownOnChangeHandle.bind(
                    this,
                    "Product",
                    "product"
                  )}
                />
              </Box>
            </Box>
            <Box className="productInventory_buttonSubContainer">
              {isEdit ? (
                <Box className="productInventory_BtnContainer">
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
                <Box className="productInventory_BtnContainer">
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

export default TodoProductInventory;
