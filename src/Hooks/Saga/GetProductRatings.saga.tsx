import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_RATINGS } from "./Constant";
import { getProductRatingsAPI } from "../../services/GetProductRatings.api";
import {
  getProductRatings,
  getProductRatingsSuccess,
  getProductRatingsFailure,
  internalServerFailure,
} from "../redux/GetProductRatings.redux";
import { SuccessResponseState } from "../../Modal/GetProductRatings.modal";

export function* getProductRatingsAPISaga() {
  yield put(getProductRatings());
  let result: SuccessResponseState;
  try {
    result = yield getProductRatingsAPI();
    if (result.status === 200) {
      yield put(getProductRatingsSuccess(result));
    } else {
      yield put(getProductRatingsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductRatingsSaga() {
  yield takeEvery(GET_PRODUCT_RATINGS, getProductRatingsAPISaga);
}
