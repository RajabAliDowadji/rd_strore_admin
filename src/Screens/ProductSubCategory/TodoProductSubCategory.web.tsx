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
import "./ProductSubCategories.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductSubCategory = () => {
  const initialData = {
    sub_category_name: "",
    product_category: [],
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
      sub_category_name: false,
      product_category: false,
    },
    errorMsg: {
      sub_category_name: "",
      product_category: "",
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
    navigate("/product-sub-categories");
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
    const isProdCatValid = isEmpty(
      "Sub-category name",
      formData.sub_category_name
    );
    const isProdTypeValid = dropDownValidate(
      "Product category",
      formData.product_category
    );
    if (isProdCatValid.status || isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          sub_category_name: isProdCatValid.status,
          product_category: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          sub_category_name: isProdCatValid.message,
          product_category: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE PRODUCT SUB-CATEGORY API CALL
        navigate("/product-sub-categories");
      } else {
        // TODO CREATE PRODUCT SUB-CATEGORY API CALL
        navigate("/product-sub-categories");
      }
    }
  };

  const onDeleteConfirmHandle = () => {
    navigate("/product-sub-categories");
    //TODO DELETE PRODUCT SUB-CATEGORY API CALL
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
        <Box className="prodSubCategory_mainContainer">
          <Box className="prodSubCategory_titleContainer">
            <Typography className="prodSubCategory_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="sub_category_name"
                type="text"
                label="Sub-category name"
                name="sub_category_name"
                value={formData.sub_category_name}
                error={dataError.errors.sub_category_name}
                errorText={dataError.errorMsg.sub_category_name}
                onChange={inputChangeHandle.bind(this, "Sub-category name")}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <DropDown
                label="Product category"
                name="product_category"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={items}
                values={formData.product_category}
                placeholder="Please select product category"
                error={dataError.errors.product_category}
                errorText={dataError.errorMsg.product_category}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product category",
                  "product_category"
                )}
              />
            </Box>
            <Box className="prodSubCategory_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="prodSubCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="prodSubCategory_BtnContainer">
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
                <Box className="prodSubCategory_BtnContainer">
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
export default TodoProductSubCategory;
