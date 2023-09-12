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
import { isEmpty } from "../../Utils/common";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import "./ProductInventories.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductInventory = () => {
  const initialData = {
    quantity: "",
    product: "",
    product_brand: [],
    product_sub_category: [],
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
      quantity: false,
      product: false,
    },
    errorMsg: {
      quantity: "",
      product: "",
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
    navigate("/product-inventories");
  };

  const deleteshopHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    navigate("/product-inventories");
    //TODO DELETE PRODUCT INVENTORY API CALL
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
        // TODO UPDATE PRODUCT INVENTORY API CALL
        navigate("/product-inventories");
      } else {
        // TODO CREATE PRODUCT INVENTORY API CALL
        navigate("/product-inventories");
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
                  data={items}
                  values={formData.product_sub_category}
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
                  data={items}
                  values={formData.product_brand}
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
                  label="Is Vegetarian"
                  name="is_vegetarian"
                  multi={false}
                  disabled={false}
                  clearable={false}
                  required={false}
                  data={items}
                  values={formData.is_vegetarian}
                  placeholder="Product is vegetarian."
                  onChange={dropDownOnChangeHandle.bind(
                    this,
                    "Whether Product is vegetarian or not.",
                    "is_vegetarian"
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
                  data={items}
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
