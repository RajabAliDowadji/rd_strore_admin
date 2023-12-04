import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_FILE,
  ADD_PRODUCT_CATEGORY,
  DELETE_FILE,
  DELETE_PRODUCT_CATEGORY,
  EDIT_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTextField from "../../Ui/CustomTextField/CustomTextField.web";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import { errorToaster, isEmpty, successToaster } from "../../Utils/common";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import { GetProductCategoryByIdResponse } from "../../Modal/GetProductCategoryById.modal";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import { no_image } from "./assets";
import "./ProductCategoryPage.web.css";

const configJSON = require("../../Constants/Products");

const TodoProductCategoryPage = () => {
  const initialData = useMemo(() => {
    return {
      _id: "",
      category_name: "",
      category_image: "",
    };
  }, []);
  const initialFileData = useMemo(() => {
    return {
      category_image: {
        file_url: "",
      },
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
  const [fileData, setFileData] = useState<any>(initialFileData);
  const [key, setKey] = useState("");
  const [dataError, setDataError] = useState({
    errors: {
      category_name: false,
      category_image: false,
    },
    errorMsg: {
      category_name: "",
      category_image: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_PRODUCT_CATEGORY_BY_ID,
        payload: { id: id },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_product_category &&
      state.add_edit_product_category.productCategory &&
      state.add_edit_product_category.productCategory !== null &&
      !state.add_edit_product_category.isError &&
      state.add_edit_product_category.message !== ""
    ) {
      successToaster(state.add_edit_product_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-categories" },
      });
      navigate("/product-categories");
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.delete_product_category &&
      !state.delete_product_category.isError &&
      state.delete_product_category.message !== ""
    ) {
      successToaster(state.delete_product_category.message);
      dispatch({
        type: RESET_STATE,
        payload: { state: "product-categories" },
      });
      navigate("/product-categories");
    } else if (
      state &&
      state.delete_product_category &&
      state.delete_product_category.isError
    ) {
      errorToaster(state.delete_product_category.message);
    }
  }, [dispatch, navigate, state]);

  useEffect(() => {
    if (
      state &&
      state.get_product_category_by_id &&
      state.get_product_category_by_id.productCategory &&
      state.get_product_category_by_id.productCategory !== null
    ) {
      let temp: GetProductCategoryByIdResponse = initialData;
      let tempFile: any = {
        category_image: {
          file_url: "",
        },
      };
      temp._id = state.get_product_category_by_id.productCategory._id;
      temp.category_name =
        state.get_product_category_by_id.productCategory.category_name;
      temp.category_image =
        state.get_product_category_by_id.productCategory.category_image._id;

      tempFile.category_image =
        state.get_product_category_by_id.productCategory.category_image &&
        state.get_product_category_by_id.productCategory.category_image !==
          null &&
        state.get_product_category_by_id.productCategory.category_image
          ? state.get_product_category_by_id.productCategory.category_image
          : tempFile.category_image;

      setFormData((prev: GetProductCategoryByIdResponse) => ({
        ...prev,
        ...temp,
      }));
      setFileData((prev: string[]) => ({
        ...prev,
        ...tempFile,
      }));
    }
  }, [initialData, state]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_file &&
      state.add_edit_file.file &&
      state.add_edit_file.file !== null &&
      !state.add_edit_file.isError &&
      state.add_edit_file.message !== ""
    ) {
      successToaster(state.add_edit_file.message);
      setFormData((prev: any) => ({
        ...prev,
        [key]: state.add_edit_file.file._id,
      }));

      dispatch({
        type: RESET_STATE,
        payload: { state: "file" },
      });
    }
  }, [dispatch, formData, key, navigate, state]);

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

  const onDeleteConfirmHandle = () => {
    dispatch({
      type: DELETE_PRODUCT_CATEGORY,
      payload: { id: id },
    });
  };

  const inputChangeHandle = (fieldName: string, event: any) => {
    let isValid = isEmpty(fieldName, event.target.value);
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

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    const key = event.target.name;
    const reader = new FileReader();
    if (fileData[key] && fileData[key]._id) {
      dispatch({
        type: DELETE_FILE,
        payload: { id: fileData[key]._id },
      });
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileData((prev: any) => ({
        ...prev,
        [key]: { file_url: reader.result },
      }));
    };
    setFormData((prev: any) => ({
      ...prev,
      [key]: file,
    }));
  };

  const onFileUpload = (key: string) => {
    if (formData[key].length !== 0) {
      let bodyData = new FormData();
      bodyData.append("file", formData[key]);
      setKey(key);
      dispatch({
        type: ADD_FILE,
        payload: bodyData,
      });
    } else {
      setDataError((prev) => ({
        ...prev,
        errors: { ...dataError.errors, [key]: true },
        errorMsg: {
          ...dataError.errorMsg,
          [key]: "Please upload File.",
        },
      }));
    }
  };

  const formSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isProdCatValid = isEmpty("Category name", formData.category_name);
    if (isProdCatValid.status) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          category_name: isProdCatValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          category_name: isProdCatValid.message,
        },
      }));
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_PRODUCT_CATEGORY,
          payload: { id: id, values: formData },
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_CATEGORY,
          payload: formData,
        });
      }
    }
  };
  return (
    <Box>
      <DashboardPage>
        <DeleteModal
          open={modalOpen}
          title="Product Category"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="prodcatpage_mainContainer">
          <Box className="prodcatpage_titleContainer">
            <Typography className="prodcatpage_titleText">
              {isEdit
                ? configJSON.editProductCatTitleText
                : configJSON.createProductCatTitleText}
            </Typography>
          </Box>
          <form onSubmit={formSubmitHandle}>
            <Box className="prodcatpage_textFieldContainer">
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
            <Divider className="prodcatpage_textFieldContainer" />
            <Typography className="prodcatpage_titleText">
              Product Category Image
            </Typography>
            <Box className="prodcatpage_textFieldContainer">
              <ImageUpload
                profile_placeHolder={no_image}
                title={"Product Category Image"}
                description={
                  "The product category image should see perfectly and image size should be less than 5 Mb."
                }
                errorText={dataError.errorMsg.category_image}
                imageUrl={fileData.category_image.file_url}
                onFileChange={onFileChange}
                name="category_image"
                onClick={onFileUpload}
              />
            </Box>
            <Box className="prodcatpage_buttonSubContainer">
              {isEdit ? (
                <Box className="prodcatpage_BtnContainer">
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
                    onClick={deletePlaceHandle}
                  />
                </Box>
              ) : (
                <Box className="prodcatpage_BtnContainer">
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
                    onClick={cancelPlaceHandle}
                  />
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default TodoProductCategoryPage;
