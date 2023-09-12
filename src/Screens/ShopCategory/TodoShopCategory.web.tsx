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
import { rangeValidate } from "../../Validations/rangeValidate.web";
import "./ShopCategories.web.css";

const configJSON = require("../../Constants/Shop");

const TodoShopCategory = () => {
  const initialData = {
    category_name: "",
    lower_range: "",
    upper_range: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      category_name: false,
      lower_range: false,
      upper_range: false,
    },
    errorMsg: {
      category_name: "",
      lower_range: "",
      upper_range: "",
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

  const cancelshopCategoryHandle = () => {
    navigate("/shop-categories");
  };

  const deleteshopCategoryHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    navigate("/shop-categories");
    //TODO DELETE SHOP CATEGORY API CALL
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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCategoryValid = isEmpty("Category name", formData.category_name);
    const isLowerRangeValid = isEmpty("Lower range", formData.lower_range);
    let isUpperRangeValid = rangeValidate(
      formData.lower_range,
      formData.upper_range
    );
    if (
      isCategoryValid.status ||
      isLowerRangeValid.status ||
      isUpperRangeValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          category_name: isCategoryValid.status,
          lower_range: isLowerRangeValid.status,
          upper_range: isUpperRangeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          category_name: isCategoryValid.message,
          lower_range: isLowerRangeValid.message,
          upper_range: isUpperRangeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE shopCategory API CALL
        navigate("/shop-categories");
      } else {
        // TODO CREATE shopCategory API CALL
        navigate("/shop-categories");
      }
    }
  };

  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Shop category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="shopCategory_mainContainer">
          <Box className="shopCategory_titleContainer">
            <Typography className="shopCategory_titleText">
              {isEdit
                ? configJSON.editShopCategoryTitleText
                : configJSON.createShopCategoryTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="shopCategory_textFieldContainer">
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
            <Box className="shopCategory_textFieldContainer">
              <CustomTextField
                id="lower_range"
                type="number"
                label="Lower range"
                name="lower_range"
                value={formData.lower_range}
                error={dataError.errors.lower_range}
                errorText={dataError.errorMsg.lower_range}
                onChange={inputChangeHandle.bind(this, "Lower range")}
              />
            </Box>
            <Box className="shopCategory_textFieldContainer">
              <CustomTextField
                id="upper_range"
                type="number"
                label="Upper range"
                name="upper_range"
                value={formData.upper_range}
                error={dataError.errors.upper_range}
                errorText={dataError.errorMsg.upper_range}
                onChange={inputChangeHandle.bind(this, "Upper range")}
              />
            </Box>
            <Box className="shopCategory_buttonSubContainer">
              {isEdit ? (
                <Box className="shopCategory_BtnContainer">
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
                    onClick={deleteshopCategoryHandle}
                  />
                </Box>
              ) : (
                <Box className="shopCategory_BtnContainer">
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
                    onClick={cancelshopCategoryHandle}
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
export default TodoShopCategory;
