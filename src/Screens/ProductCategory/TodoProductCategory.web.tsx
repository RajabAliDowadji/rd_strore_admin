import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { isEmpty } from "../../Utils/common";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import "./ProductCategories.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductCategory = () => {
  const initialData = {
    category_name: "",
    product_type: [],
    search_name: "",
  };
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      category_name: false,
      product_type: false,
    },
    errorMsg: {
      category_name: "",
      product_type: "",
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

  const cancelPlaceHandle = () => {
    navigate("/product-categories");
  };
  const deletePlaceHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
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

  const optionalInputChangeHandle = (event: any) => {
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
    const isProdCatValid = isEmpty("Category name", formData.category_name);
    const isProdTypeValid = dropDownValidate(
      "Product type",
      formData.product_type
    );
    if (isProdCatValid.status || isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          category_name: isProdCatValid.status,
          product_type: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          category_name: isProdCatValid.message,
          product_type: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE PRODUCT CATEGORY API CALL
        navigate("/product-categories");
      } else {
        // TODO CREATE PRODUCT CATEGORY API CALL
        navigate("/product-categories");
      }
    }
  };

  const onDeleteConfirmHandle = () => {
    navigate("/product-categories");
    //TODO DELETE PRODUCT CATEGORY API CALL
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
          title="Product category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodCategory_mainContainer">
          <Box className="prodCategory_titleContainer">
            <Typography className="prodCategory_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="category_name"
                type="text"
                label="Category name"
                name="category_name"
                value={formData.category_name}
                error={dataError.errors.category_name}
                errorText={dataError.errorMsg.category_name}
                onChange={inputChangeHandle.bind(this, "Category name")}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <DropDown
                label="Product type"
                name="product_type"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={items}
                values={formData.product_type}
                placeholder="Please select product type"
                error={dataError.errors.product_type}
                errorText={dataError.errorMsg.product_type}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product type",
                  "product_type"
                )}
              />
            </Box>
            <Box className="prodCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="prodCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="prodCategory_BtnContainer">
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
                    onClick={deletePlaceHandle}
                  />
                </Box>
              ) : (
                <Box className="prodCategory_BtnContainer">
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
                    onClick={cancelPlaceHandle}
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
export default TodoProductCategory;
