import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import { dropDownValidate } from "../../Validations/dropDownValidate.web";
import DropDown from "../../Ui/DropDown/DropDown.web";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMISSION,
  DELETE_COMMISSION,
  EDIT_COMMISSION,
  GET_COMMISSION_BY_ID,
  GET_COMMISSION_TYPES,
  GET_PRODUCTS,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { CommissionType } from "../../Modal/GetCommissionTypes.modal";
import { GetProductColumns, Product } from "../../Modal/GetProducts.modal";
import { GetCommissionByIdResponse } from "../../Modal/GetCommissionById.modal";
import "./Commissions.web.css";

const configJSON = require("../../Constants/Commission");

const TodoCommission = () => {
  const initialData = useMemo(() => {
    return {
      commission: "",
      commission_type: "",
      product: "",
    };
  }, []);
  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const [commissionTypes, setCommissionTypes] = useState<CommissionType[]>([]);
  const [products, setProducts] = useState<GetProductColumns[]>([]);
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
    if (id) {
      dispatch({
        type: GET_COMMISSION_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: GET_COMMISSION_TYPES,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
      payload: { brand_name: "", sub_category_name: "" },
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
      setProducts([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.get_commission_types &&
      state.get_commission_types.commissionTypes &&
      state.get_commission_types.commissionTypes.length !== 0
    ) {
      let tempArr: CommissionType[] = [];
      state.get_commission_types.commissionTypes.map(
        (commissionType: CommissionType) =>
          tempArr.push({
            _id: commissionType._id,
            commission_name: commissionType.commission_name,
            commission_sign: commissionType.commission_sign,
          })
      );
      setCommissionTypes(tempArr);
    } else if (
      state &&
      state.get_commission_types &&
      state.get_commission_types.commissionTypes &&
      state.get_commission_types.commissionTypes.length === 0
    ) {
      setCommissionTypes([]);
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.delete_commission &&
      !state.delete_commission.isError &&
      state.delete_commission.message !== ""
    ) {
      successToaster(state.delete_commission.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "commissions" },
      });
      navigate("/commissions");
    } else if (
      state &&
      state.delete_commission &&
      state.delete_commission.isError
    ) {
      errorToaster(state.delete_commission.message);
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_commission &&
      state.add_edit_commission.commission &&
      state.add_edit_commission.commission !== null &&
      !state.add_edit_commission.isError &&
      state.add_edit_commission.message !== ""
    ) {
      successToaster(state.add_edit_commission.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "commissions" },
      });
      navigate("/commissions");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.get_commission_by_id &&
      state.get_commission_by_id.commission &&
      state.get_commission_by_id.commission !== null
    ) {
      let temp: GetCommissionByIdResponse = initialData;
      temp.commission = state.get_commission_by_id.commission.commission;
      temp.commission_type =
        state.get_commission_by_id.commission.commission_type._id;
      temp.product = state.get_commission_by_id.commission.product._id;
      console.log("temp", temp);
      setFormData((prev: GetCommissionByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    } else if (state.get_commission_type_by_id.isError) {
      errorToaster(state.get_commission_type_by_id.message);
    }
  }, [initialData, state]);

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
    dispatch({
      type: DELETE_COMMISSION,
      payload: { id: id },
    });
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
    const isCommissionValid = isEmpty(
      "Commisssion",
      formData.commission.toString()
    );
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
        dispatch({
          type: EDIT_COMMISSION,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_COMMISSION,
          payload: formData,
        });
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
                labelField={"commission_name"}
                valueField={"_id"}
                data={commissionTypes}
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
                labelField={"product_title"}
                valueField={"_id"}
                data={products}
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
