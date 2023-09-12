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

import "./ProductTypes.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductType = () => {
  const initialData = {
    type_name: "",
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
      type_name: false,
    },
    errorMsg: {
      type_name: "",
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
    navigate("/product-types");
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
  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdTypeValid = isEmpty("Product type", formData.type_name);
    if (isProdTypeValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          type_name: isProdTypeValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          type_name: isProdTypeValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE shopCategory API CALL
        navigate("/product-types");
      } else {
        // TODO CREATE shopCategory API CALL
        navigate("/product-types");
      }
    }
  };

  const onDeleteConfirmHandle = () => {
    navigate("/product-types");
    //TODO DELETE PLACE API CALL
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Product type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="productType_mainContainer">
          <Box className="productType_titleContainer">
            <Typography className="productType_titleText">
              {isEdit
                ? configJSON.editProductTypeTitleText
                : configJSON.createProductTypeTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="type_name"
                type="text"
                label="Product type"
                name="type_name"
                value={formData.type_name}
                error={dataError.errors.type_name}
                errorText={dataError.errorMsg.type_name}
                onChange={inputChangeHandle.bind(this, "Product type")}
              />
            </Box>
            <Box className="productType_textFieldContainer">
              <CustomTextField
                id="search_name"
                type="text"
                label="Search name"
                name="search_name"
                value={formData.search_name}
                onChange={optionalInputChangeHandle}
              />
            </Box>
            <Box className="productType_buttonSubContainer">
              {isEdit ? (
                <Box className="productType_BtnContainer">
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
                <Box className="productType_BtnContainer">
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
export default TodoProductType;
