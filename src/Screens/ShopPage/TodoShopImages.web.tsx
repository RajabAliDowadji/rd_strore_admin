import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_FILE,
  DELETE_FILE,
  DELETE_SHOP,
  GET_SHOP_BY_ID,
  RESET_STATE,
} from "../../Hooks/Saga/Constant";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../Ui/Button/DeleteButton.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import CancelButton from "../../Ui/Button/CancelButton.web";
import {
  errorToaster,
  isImageUpload,
  successToaster,
} from "../../Utils/common";
import {
  GetShopByIdResponse,
  GetShopImagesByIdResponse,
} from "../../Modal/GetShopById.modal";
import ImageUpload from "../../Ui/Image/ImageUpload.web";
import {
  profile_placeHolder,
  shop_placeHolder,
  card_placeHolder,
} from "./assets";
import "./ShopPage.web.css";

interface TodoShopImagesProps {
  activeStep: number;
  activeStepChangeHandle: any;
}

const TodoShopImages = ({
  activeStep,
  activeStepChangeHandle,
}: TodoShopImagesProps) => {
  const initialData = useMemo(() => {
    return {
      owner_image: "",
      owner_aadhar_card: "",
      shop_image: "",
    };
  }, []);

  const initialFileData = useMemo(() => {
    return {
      owner_image: {
        file_url: "",
      },
      shop_image: {
        file_url: "",
      },
      owner_aadhar_card: {
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
      owner_image: false,
      owner_aadhar_card: false,
      shop_image: false,
    },
    errorMsg: {
      owner_image: "",
      owner_aadhar_card: "",
      shop_image: "",
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
      let temp: GetShopImagesByIdResponse = {
        owner_image: "",
        owner_aadhar_card: "",
        shop_image: "",
      };
      let tempFile: any = {
        owner_image: {
          file_url: "",
        },
        shop_image: {
          file_url: "",
        },
        owner_aadhar_card: {
          file_url: "",
        },
      };
      temp.owner_image =
        state.get_shop_by_id.shop.owner_image &&
        state.get_shop_by_id.shop.owner_image !== null &&
        state.get_shop_by_id.shop.owner_image._id
          ? state.get_shop_by_id.shop.owner_image._id
          : "";
      temp.owner_aadhar_card =
        state.get_shop_by_id.shop.owner_aadhar_card &&
        state.get_shop_by_id.shop.owner_aadhar_card !== null &&
        state.get_shop_by_id.shop.owner_aadhar_card._id
          ? state.get_shop_by_id.shop.owner_aadhar_card._id
          : "";
      temp.shop_image =
        state.get_shop_by_id.shop.shop_image &&
        state.get_shop_by_id.shop.shop_image !== null &&
        state.get_shop_by_id.shop.shop_image._id
          ? state.get_shop_by_id.shop.shop_image._id
          : "";

      tempFile.owner_image =
        state.get_shop_by_id.shop.owner_image &&
        state.get_shop_by_id.shop.owner_image !== null &&
        state.get_shop_by_id.shop.owner_image
          ? state.get_shop_by_id.shop.owner_image
          : tempFile.owner_image;

      tempFile.owner_aadhar_card =
        state.get_shop_by_id.shop.owner_aadhar_card &&
        state.get_shop_by_id.shop.owner_aadhar_card !== null &&
        state.get_shop_by_id.shop.owner_aadhar_card
          ? state.get_shop_by_id.shop.owner_aadhar_card
          : tempFile.owner_aadhar_card;

      tempFile.shop_image =
        state.get_shop_by_id.shop.shop_image &&
        state.get_shop_by_id.shop.shop_image !== null &&
        state.get_shop_by_id.shop.shop_image
          ? state.get_shop_by_id.shop.shop_image
          : tempFile.shop_image;
      if (key === "") {
        setFileData((prev: string[]) => ({
          ...prev,
          ...tempFile,
        }));

        setFormData((prev: GetShopByIdResponse) => ({
          ...prev,
          ...temp,
        }));
      }
    } else if (state.get_shop_category_by_id.isError) {
      errorToaster(state.get_shop_category_by_id.message);
    }
  }, [key, state]);

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

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    const key = event.target.name;
    const reader = new FileReader();
    if (fileData[key] && fileData[key]._id) {
      setKey(key);
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

    const isOwnerImgValid = isImageUpload("Owner Image", formData.owner_image);
    const isOwnerAadharValid = isImageUpload(
      "Owner aadhar image",
      formData.owner_aadhar_card
    );
    const isShopImageValid = isImageUpload("Shop image", formData.shop_image);

    if (
      isOwnerImgValid.status ||
      isOwnerAadharValid.status ||
      isShopImageValid.status
    ) {
      setDataError((prev) => ({
        ...prev,
        errors: {
          ...dataError.errors,
          owner_image: isOwnerImgValid.status,
          owner_aadhar_card: isOwnerAadharValid.status,
          shop_image: isShopImageValid.status,
        },
        errorMsg: {
          ...dataError.errorMsg,
          owner_image: isOwnerImgValid.message,
          owner_aadhar_card: isOwnerAadharValid.message,
          shop_image: isShopImageValid.message,
        },
      }));
    } else {
      if (isEdit) {
        //TODO
      } else {
        //TODO
      }
    }
  };

  return (
    <Box>
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
              <Typography className="shoppage_titleText">Images</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={profile_placeHolder}
                  title={"Owner Image"}
                  description={
                    "The owner image should see perfectly and image size should be less than 5 Mb."
                  }
                  errorText={dataError.errorMsg.owner_image}
                  imageUrl={fileData.owner_image.file_url}
                  onFileChange={onFileChange}
                  name="owner_image"
                  onClick={onFileUpload}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={shop_placeHolder}
                  title={"Shop Image"}
                  description={
                    "The shop image should see perfectly and image size should be less than 5 Mb."
                  }
                  errorText={dataError.errorMsg.shop_image}
                  imageUrl={fileData.shop_image.file_url}
                  onFileChange={onFileChange}
                  name="shop_image"
                  onClick={onFileUpload}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="shoppage_textFieldContainer">
                <ImageUpload
                  profile_placeHolder={card_placeHolder}
                  title={"Owner aadhar card Image"}
                  description={
                    "The Owner aadhar card should see perfectly and image size should be less than 5 Mb."
                  }
                  errorText={dataError.errorMsg.owner_aadhar_card}
                  imageUrl={fileData.owner_aadhar_card.file_url}
                  onFileChange={onFileChange}
                  name="owner_aadhar_card"
                  onClick={onFileUpload}
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
    </Box>
  );
};
export default TodoShopImages;
