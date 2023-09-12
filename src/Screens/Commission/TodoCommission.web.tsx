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

import "./Commissions.web.css";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";

const configJSON = require("../../Constants/Commission");

const TodoCommission = () => {
  const initialData = {
    commission: "",
    commission_type: [],
    product: [],
  };
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      commission: false,
      commission_type: false,
      product: false,
    },
    errorMsg: {
      commission: "",
      commission_type: "",
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

  const cancelcommissionsHandle = () => {
    navigate("/commissions");
  };

  const deletecommissionsHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    navigate("/commissions");
    //TODO DELETE COMMISSIONS API CALL
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
    const isCommissionValid = isEmpty("Commisssion", formData.commission);
    const isCommissionTypeValid = dropDownValidate(
      "Commisssion type",
      formData.commission_type
    );
    const isProductValid = dropDownValidate("Product", formData.product);
    if (
      isCommissionValid.status ||
      isCommissionTypeValid.status ||
      isProductValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          commission: isCommissionValid.status,
          commission_type: isCommissionTypeValid.status,
          product: isProductValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          commission: isCommissionValid.message,
          commission_type: isCommissionTypeValid.message,
          product: isProductValid.message,
        },
      }));
    } else {
      if (isEdit) {
        // TODO UPDATE COMMISSION API CALL
        navigate("/commissions");
      } else {
        // TODO CREATE COMMISSION API CALL
        navigate("/commissions");
      }
    }
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
          title="Commission type"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="commissions_mainContainer">
          <Box className="commissions_titleContainer">
            <Typography className="commissions_titleText">
              {isEdit
                ? configJSON.editCommissionTitleText
                : configJSON.createCommissionTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="commissions_textFieldContainer">
              <DropDown
                label="Commission type"
                name="commission_type"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={items}
                values={formData.commission_type}
                placeholder="Please commission type"
                error={dataError.errors.commission_type}
                errorText={dataError.errorMsg.commission_type}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Commission type",
                  "commission_type"
                )}
              />
            </Box>
            <Box className="commissions_textFieldContainer">
              <CustomTextField
                id="commission"
                type="text"
                label="Commisssion"
                name="commission"
                value={formData.commission}
                error={dataError.errors.commission}
                errorText={dataError.errorMsg.commission}
                onChange={inputChangeHandle.bind(this, "Commisssion")}
              />
            </Box>

            <Box className="commissions_textFieldContainer">
              <DropDown
                label="Product"
                name="product"
                multi={false}
                disabled={false}
                clearable={false}
                required={false}
                data={items}
                values={formData.product}
                placeholder="Please select product"
                error={dataError.errors.product}
                errorText={dataError.errorMsg.product}
                onChange={dropDownOnChangeHandle.bind(
                  this,
                  "Product",
                  "product"
                )}
              />
            </Box>
            <Box className="commissions_buttonSubContainer">
              {isEdit ? (
                <Box className="commissions_BtnContainer">
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
                    onClick={deletecommissionsHandle}
                  />
                </Box>
              ) : (
                <Box className="commissions_BtnContainer">
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
                    onClick={cancelcommissionsHandle}
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
export default TodoCommission;
