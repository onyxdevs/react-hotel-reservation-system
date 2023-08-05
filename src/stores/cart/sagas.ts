import { put } from "redux-saga/effects";
import validatorjs from "validator";

import {
  applyCoupon,
  applyCouponFailed,
  setNewReservation,
  newReservationFailed,
  finishDeleteReservation,
  deleteReservationFailed,
} from "./actions";
import {
  logger,
  getStoredValue,
  handleCatchedError,
} from "../../lib/scripts/utils";
import apis from "../../apis";

export function* checkCouponSaga(payload: any): any {
  logger.debug("[saga]", "checkCouponSaga", payload);

  try {
    const resData = yield apis.checkCoupon(payload.couponCode);
    if (!resData.length) {
      throw new Error("Coupon code is not valid.");
    }
    // Validate expiration date
    if (!validatorjs.isAfter(resData[0].expiration_at)) {
      throw new Error("Coupon code is not valid.");
    }
    yield put(applyCoupon(resData[0]));
  } catch (error) {
    yield put(handleCatchedError(applyCouponFailed)(error));
  }
}

export function* newReservationSaga(payload: any): any {
  logger.debug("[saga]", "newReservationSaga", payload);

  const reservationId = getStoredValue<string>("reservationId");

  try {
    let resData: TypeNewReservation;
    if (!reservationId) {
      resData = yield apis.newReservation(payload.data);
    } else {
      resData = yield apis.updateReservation(payload.data, reservationId);
    }
    yield put(setNewReservation(resData));
  } catch (error) {
    yield put(handleCatchedError(newReservationFailed)(error));
  }
}

export function* deleteReservationSaga(payload: any): any {
  logger.debug("[saga]", "newReservationSaga", payload);

  try {
    const resData: TypeNewReservation = yield apis.deleteReservation(
      payload.reservationId
    );
    yield put(finishDeleteReservation(resData));
  } catch (error) {
    yield put(handleCatchedError(deleteReservationFailed)(error));
  }
}
