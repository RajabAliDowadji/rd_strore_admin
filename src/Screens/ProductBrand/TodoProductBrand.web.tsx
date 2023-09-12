import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { isEmpty } from "../../Utils/common";
import "./ProductBrands.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductBrand = () => {
  const initialData = {
    brand_name: "",
    sub_category_ids: {
      sub_category: [],
    },
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
      brand_name: false,
      sub_category_ids: false,
    },
    errorMsg: {
      brand_name: "",
      sub_category_ids: "",
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

  const cancelProdBrandHandle = () => {
    navigate("/product-brands");
  };
  const deleteProdBrandHandle = () => {
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
    const data = {
      sub_category: values,
    };
    setFormData((prev) => ({
      ...prev,
      [keyName]: data,
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
    const isProdBrandValid = isEmpty("Brand name", formData.brand_name);
    const isProdSubCatValid = dropDownValidate(
      "Product sub-categories",
      formData.sub_category_ids.sub_category
    );
    if (isProdBrandValid.status || isProdSubCatValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          brand_name: isProdBrandValid.status,
          sub_category_ids: isProdSubCatValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          brand_name: isProdBrandValid.message,
          sub_category_ids: isProdSubCatValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE PRODUCT BRAND API CALL
        navigate("/product-brands");
      } else {
        // TODO CREATE PRODUCT BRAND API CALL
        navigate("/product-brands");
      }
    }
  };

  const onDeleteConfirmHandle = () => {
    navigate("/product-brands");
    //TODO DELETE PRODUCT BRAND API CALL
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
          title="Product brand"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodBrand_mainContainer">
          <Box className="prodBrand_titleContainer">
            <Typography className="prodBrand_titleText">
              {isEdit
                ? configJSON.editProductBrandTitleText
                : configJSON.createProductBrandTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodBrand_textFieldContainer">
              <CustomTextField
                id="brand_name"
                type="text"
                label="Brand name"
                name="brand_name"
                value={formData.brand_name}
                error={dataError.errors.brand_name}
                errorText={dataError.errorMsg.brand_name}
                onChange={inputChangeHandle.bind(this, "Brand name")}
              />
            </Box>
            <Box className="prodBrand_textFieldContainer">
              <DropDown
                label="Product sub-categories"
                name="sub_category_ids"
                multi={true}
                disabled={false}
                clearable={false}
                required={false}
                data={items}
                values={formData.sub_category_ids.sub_category}
                placeholder="Please select product sub-categories"
                error={dataError.errors.sub_category_ids}
                errorText={dataError.errorMsg.sub_category_ids}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product sub-categories",
                  "sub_category_ids"
                )}
              />
            </Box>
            <Box className="prodBrand_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="prodBrand_buttonSubContainer">
              {isEdit ? (
                <Box className="prodBrand_BtnContainer">
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
                    onClick={deleteProdBrandHandle}
                  />
                </Box>
              ) : (
                <Box className="prodBrand_BtnContainer">
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
                    onClick={cancelProdBrandHandle}
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
export default TodoProductBrand;
