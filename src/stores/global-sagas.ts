import { takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_HOTELS } from "./hotels/constants";
import { getHotelsSaga } from "./hotels/sagas";
import {
  CHECK_COUPON,
  NEW_RESERVATION,
  DELETE_RESERVATION,
} from "./cart/constants";
import {
  checkCouponSaga,
  newReservationSaga,
  deleteReservationSaga,
} from "./cart/sagas";

function* globalSagas() {
  yield takeEvery(FETCH_HOTELS, getHotelsSaga);
  yield takeLatest(CHECK_COUPON, checkCouponSaga);
  yield takeLatest(NEW_RESERVATION, newReservationSaga);
  yield takeLatest(DELETE_RESERVATION, deleteReservationSaga);
  // NOTE: other app sagas go here
}

export default globalSagas;
