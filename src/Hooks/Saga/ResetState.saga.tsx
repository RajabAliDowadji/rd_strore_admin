import { takeEvery, put } from "redux-saga/effects";
import { RESET_STATE } from "./Constant";
import { addEditPlaceResetState } from "../redux/AddEditPlace.redux";
import { deletePlaceResetState } from "../redux/DeletePlace.redux";
import { getPlaceByIdResetState } from "../redux/GetPlaceById.redux";
import { getPlaceResetState } from "../redux/GetPlace.redux";
import { deleteShopCategoryResetState } from "../redux/DeleteShopCategory.redux";
import { addEditShopCategoryResetState } from "../redux/AddEditShopCategory.redux";
import { getShopCategoryByIdResetState } from "../redux/GetShopCategoryById.redux";
import { addEditCommissionTypeResetState } from "../redux/AddEditCommissionType.redux";
import { getCommissionTypeByIdResetState } from "../redux/GetCommissionTypeById.redux";
import { deleteCommissionTypeResetState } from "../redux/DeleteCommissionType.redux";
import { addEditProductTypeResetState } from "../redux/AddEditProductType.redux";
import { getProductTypeByIdResetState } from "../redux/GetProductTypeById.redux";
import { deleteProductTypeResetState } from "../redux/DeleteProductType.redux";
import { addEditProductCategoryResetState } from "../redux/AddEditProductCategory.redux";
import { getProductCategoryByIdResetState } from "../redux/GetProductCategoryById.redux";
import { deleteProductCategoryResetState } from "../redux/DeleteProductCategory.redux";
import { addEditProductSubCategoryResetState } from "../redux/AddEditProductSubCategory.redux";
import { getProductSubCategoryByIdResetState } from "../redux/GetProductSubCategoryById.redux";
import { deleteProductSubCategoryResetState } from "../redux/DeleteProductSubCategory.redux";
import { addEditProductBrandResetState } from "../redux/AddEditProductBrand.reddux";
import { getProductBrandByIdResetState } from "../redux/GetProductBrandById.redux";
import { deleteProductBrandResetState } from "../redux/DeleteProductBrand.redux";
import { addEditFileResetState } from "../redux/AddEditFile.redux";
import { deleteFileResetState } from "../redux/DeleteFile.redux";
import { getShopByIdResetState } from "../redux/GetShopById.redux";
import { deleteShopResetState } from "../redux/DeleteShop.redux";
import { addEditShopResetState } from "../redux/AddEditShop.redux";
import { addEditProductResetState } from "../redux/AddEditProduct.redux";
import { getProductByIdResetState } from "../redux/GetProductById.redux";
import { deleteProductResetState } from "../redux/DeleteProduct.redux";
import { addEditFilesResetState } from "../redux/AddEditFiles.redux";
import { addEditProductInventoryResetState } from "../redux/AddEditProductInventory.redux";
import { getProductInventoryByIdResetState } from "../redux/GetProductInventoryById.redux";
import { deleteProductInventoryResetState } from "../redux/DeleteProductInventory.redux";
import { addEditCommissionResetState } from "../redux/AddEditCommission.redux";
import { getCommissionByIdResetState } from "../redux/GetCommissionById.redux";
import { deleteCommissionResetState } from "../redux/DeleteCommission.redux";

export function* resetStateAPISaga({
  payload,
}: {
  type: string;
  payload: any;
}) {
  if (payload.state === "places") {
    yield put(addEditPlaceResetState());
    yield put(getPlaceByIdResetState());
    yield put(getPlaceResetState());
    yield put(deletePlaceResetState());
  } else if (payload.state === "shop-categories") {
    yield put(addEditShopCategoryResetState());
    yield put(getShopCategoryByIdResetState());
    yield put(deleteShopCategoryResetState());
  } else if (payload.state === "shops") {
    yield put(addEditShopResetState());
    yield put(getShopByIdResetState());
    yield put(deleteShopResetState());
  } else if (payload.state === "commission-types") {
    yield put(addEditCommissionTypeResetState());
    yield put(getCommissionTypeByIdResetState());
    yield put(deleteCommissionTypeResetState());
  } else if (payload.state === "product-types") {
    yield put(addEditProductTypeResetState());
    yield put(getProductTypeByIdResetState());
    yield put(deleteProductTypeResetState());
  } else if (payload.state === "product-categories") {
    yield put(addEditProductCategoryResetState());
    yield put(getProductCategoryByIdResetState());
    yield put(deleteProductCategoryResetState());
  } else if (payload.state === "product-sub-categories") {
    yield put(addEditProductSubCategoryResetState());
    yield put(getProductSubCategoryByIdResetState());
    yield put(deleteProductSubCategoryResetState());
  } else if (payload.state === "product-brands") {
    yield put(addEditProductBrandResetState());
    yield put(getProductBrandByIdResetState());
    yield put(deleteProductBrandResetState());
  } else if (payload.state === "file") {
    yield put(addEditFileResetState());
    yield put(addEditFilesResetState());
    yield put(deleteFileResetState());
  } else if (payload.state === "products") {
    yield put(addEditProductResetState());
    yield put(getProductByIdResetState());
    yield put(deleteProductResetState());
  } else if (payload.state === "product-inventories") {
    yield put(addEditProductInventoryResetState());
    yield put(getProductInventoryByIdResetState());
    yield put(deleteProductInventoryResetState());
  } else if (payload.state === "commissions") {
    yield put(addEditCommissionResetState());
    yield put(getCommissionByIdResetState());
    yield put(deleteCommissionResetState());
  }
}

export default function* resetStateSaga() {
  yield takeEvery(RESET_STATE, resetStateAPISaga);
}
