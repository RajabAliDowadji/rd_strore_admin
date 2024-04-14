import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SHOP_BASIC_DETAILS,
  DELETE_SHOP,
  EDIT_SHOP_BASIC_DETAILS,
  GET_SHOP_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import { GetShopByIdResponse } from "../../Modal/GetShopById.modal";
import { aadharValidate } from "../../Validations/aadharValidate.web";
import { emailValidate } from "../../Validations/emailValidate.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import "./ShopPage.web.css";

interface TodoShopBankDetailsProps {
  activeStep: number;
  activeStepChangeHandle: any;
}

const TodoShopBankDetails = ({
  activeStep,
  activeStepChangeHandle,
}: TodoShopBankDetailsProps) => {
  const initialData = useMemo(() => {
    return {
      account_holder_name: "",
      account_number: "",
      ifsc_code: "",
      bank_name: "",
    };
  }, []);

  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);
  const [dataError, setDataError] = useState({
    errors: {
      account_holder_name: false,
      account_number: false,
      ifsc_code: false,
      bank_name: false,
    },
    errorMsg: {
      account_holder_name: "",
      account_number: "",
      ifsc_code: "",
      bank_name: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_SHOP_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_by_id &&
      state.get_shop_by_id.shop &&
      state.get_shop_by_id.shop !== null
    ) {
      let temp: GetShopByIdResponse = {
        shop_name: "",
        owner_name: "",
        email: "",
        phone_number: "",
        optional_number: "",
        aadhar_number: "",
        second_owner_name: "",
        second_owner_number: "",
        address: "",
        place: "",
        shop_category: "",
      };
      temp._id = state.get_shop_by_id.shop._id;
      temp.shop_name = state.get_shop_by_id.shop.shop_name;
      temp.owner_name = state.get_shop_by_id.shop.owner_name;
      temp.email = state.get_shop_by_id.shop.email;
      temp.phone_number = state.get_shop_by_id.shop.phone_number;
      temp.optional_number = state.get_shop_by_id.shop.optional_number;
      temp.aadhar_number = state.get_shop_by_id.shop.aadhar_number;
      temp.second_owner_name = state.get_shop_by_id.shop.second_owner_name;
      temp.second_owner_number = state.get_shop_by_id.shop.second_owner_number;
      temp.address = state.get_shop_by_id.shop.address;
      temp.place = state.get_shop_by_id.shop.place._id;
      temp.shop_category = state.get_shop_by_id.shop.shop_category._id;

      setFormData((prev: GetShopByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_shop_category_by_id.isError) {
      errorToaster(state.get_shop_category_by_id.message);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop &&
      !state.delete_shop.isError &&
      state.delete_shop.message !== ""
    ) {
      successToaster(state.delete_shop.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shops" },
      });
      navigate("/shops");
    } else if (state && state.delete_shop && state.delete_shop.isError) {
      errorToaster(state.delete_shop.message);
    }
  }, [dispatch, navigate, id, state]);

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
    navigate("/shops");
  };

  const deleteshopHandle = () => {
    setModalOpen(true);
  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_SHOP,
      payload: { id: id },
    });
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
    if (fieldName === "Email") {
      isValid = emailValidate(fieldName, event.target.value);
    }
    if (fieldName === "Aadhar number") {
      isValid = aadharValidate(fieldName, event.target.value);
    }
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

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAccountHolderNameValid = isEmpty(
      "Shop name",
      formData.account_holder_name
    );
    const isAccountNumberValid = isEmpty("Shop name", formData.account_number);
    const isIFSCCodeValid = isEmpty("Shop name", formData.ifsc_code);
    const isBankNameValid = isEmpty("Shop name", formData.bank_name);

    if (
      isAccountHolderNameValid.status ||
      isAccountNumberValid.status ||
      isIFSCCodeValid.status ||
      isBankNameValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          account_holder_name: isAccountHolderNameValid.status,
          account_number: isAccountNumberValid.status,
          ifsc_code: isIFSCCodeValid.status,
          bank_name: isBankNameValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          account_holder_name: isAccountHolderNameValid.message,
          account_number: isAccountNumberValid.message,
          ifsc_code: isIFSCCodeValid.message,
          bank_name: isBankNameValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_SHOP_BASIC_DETAILS,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_SHOP_BASIC_DETAILS,
          payload: formData,
        });
      }
    }
  };

  return (
    <>
      <DeleteModal
        open={modalOpen}
        title="Shop"
        onClose={modalHandleClose}
        onConfirmClick={onDeleteConfirmHandle}
      />
      <form onSubmit={formSubmitHandle}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="shoppage_titleText">
                Bank Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box className="shoppage_textFieldContainer">
                <CustomTextField
                  id="bank_name"
                  type="text"
                  label="Bank name"
                  name="bank_name"
                  value={formData.bank_name}
                  error={dataError.errors.bank_name}
                  errorText={dataError.errorMsg.bank_name}
                  onChange={inputChangeHandle.bind(this, "Bank name")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="shoppage_textFieldContainer">
                <CustomTextField
                  id="account_holder_name"
                  type="text"
                  label="Account holder name"
                  name="account_holder_name"
                  value={formData.account_holder_name}
                  error={dataError.errors.account_holder_name}
                  errorText={dataError.errorMsg.account_holder_name}
                  onChange={inputChangeHandle.bind(this, "Account holder name")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="shoppage_textFieldContainer">
                <CustomTextField
                  id="account_number"
                  type="text"
                  label="Account number"
                  name="account_number"
                  value={formData.account_number}
                  error={dataError.errors.account_number}
                  errorText={dataError.errorMsg.account_number}
                  onChange={inputChangeHandle.bind(this, "Account number")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="shoppage_textFieldContainer">
                <CustomTextField
                  id="ifsc_code"
                  type="text"
                  label="IFSC code"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  error={dataError.errors.ifsc_code}
                  errorText={dataError.errorMsg.ifsc_code}
                  onChange={inputChangeHandle.bind(this, "IFSC code")}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="shoppage_buttonSubContainer">
          {isEdit ? (
            <Box className="shoppage_BtnContainer">
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
                onClick={deleteshopHandle}
              />
            </Box>
          ) : (
            <Box className="shoppage_BtnContainer">
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
                onClick={cancelshopHandle}
              />
            </Box>
          )}
        </Box>
      </form>
    </>
  );
};
export default TodoShopBankDetails;
