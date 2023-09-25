import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import Dashboard from "../Dashboard/Dashboard.web";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import {
  DELETE_SHOP_CATEGORY,
  GET_SHOP_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import { successToaster, errorToaster } from "../../Utils/common";
import { GetShopCategoryByIdResponse } from "../../Modal/GetShopCategoryById.modal";
import "./ShopCategories.web.css";

const configJSON = require("../../Constants/Shop");

const ViewShopCategory = () => {
  let { id } = useParams();
  const initialData = useMemo(() => {
    return {
      _id: "",
      category_name: "",
      lower_range: 0,
      upper_range: 0,
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(initialData);
  const state = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({
      type: GET_SHOP_CATEGORY_BY_ID,
      payload: { id: id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.get_shop_category_by_id &&
      state.get_shop_category_by_id.shopCategory &&
      state.get_shop_category_by_id.shopCategory !== null
    ) {
      let temp: GetShopCategoryByIdResponse = initialData;
      temp._id = state.get_shop_category_by_id.shopCategory._id;
      temp.category_name =
        state.get_shop_category_by_id.shopCategory.category_name;
      temp.lower_range = state.get_shop_category_by_id.shopCategory.lower_range;
      temp.upper_range = state.get_shop_category_by_id.shopCategory.upper_range;
      setFormData((prev: GetShopCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_shop_category &&
      !state.delete_shop_category.isError &&
      state.delete_shop_category.message !== ""
    ) {
      successToaster(state.delete_shop_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "shop-categories" },
      });
      navigate("/shop-categories");
    } else if (
      state &&
      state.delete_shop_category &&
      state.delete_shop_category.isError
    ) {
      errorToaster(state.delete_shop_category.message);
    }
  }, [dispatch, navigate, id, state]);

  const addShopCategoryHandle = () => {
    dispatch({
      type: RESET_STATE,
      payload: { state: "shop-categories" },
    });
    navigate("/shop-categories/create");
  };
  const editShopCategoryHandle = () => {
    navigate(`/shop-categories/edit/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_SHOP_CATEGORY,
      payload: { id: id },
    });
    setModalOpen(false);
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="Place"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="place_mainContainer">
          <Box className="place_buttonContainer">
            <ActiveButton
              title={configJSON.shopCategoryBtnTxt}
              disabled={false}
              onClick={addShopCategoryHandle}
            />
          </Box>
          <Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="_id"
                type="text"
                label="Id"
                name="_id"
                value={formData._id}
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="shop_category_name"
                type="text"
                label="Category name"
                name="shop_category_name"
                value={formData.category_name}
                disabled={true}
              />
            </Box>
            <Box className="place_textFieldContainer">
              <CustomTextField
                id="lower_range"
                type="number"
                label="Lower range"
                name="lower_range"
                value={formData.lower_range}
                disabled={true}
              />
            </Box>

            <Box className="place_textFieldContainer">
              <CustomTextField
                id="upper_range"
                type="number"
                label="Upper range"
                name="upper_range"
                value={formData.upper_range}
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="place_buttonSubContainer">
            <ActiveButton
              title={configJSON.editBtnTxt}
              disabled={false}
              onClick={editShopCategoryHandle}
              style={{ width: "205px", margin: "0px 15px 0px 0px" }}
            />
            <DeleteButton
              title={configJSON.deleteBtnTxt}
              disabled={false}
              onClick={deleteBtnClickHandle}
              style={{ width: "205px", margin: "0px 0px 0px 15px" }}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default ViewShopCategory;
