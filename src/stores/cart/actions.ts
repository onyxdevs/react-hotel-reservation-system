import {
  logger,
  getTwoDatesDiff,
  getRoomDetails,
  getStoredValue,
  clearStoredValues,
  getTotals,
} from "../../lib/scripts/utils";
import {
  UPDATE_CART,
  CHECK_COUPON,
  APPLY_COUPON,
  CHECK_COUPON_FAILED,
  NEW_RESERVATION,
  NEW_RESERVATION_FINISH,
  NEW_RESERVATION_FAILED,
  DELETE_RESERVATION,
  DELETE_RESERVATION_FINISH,
  DELETE_RESERVATION_FAILED,
} from "./constants";

type TypeInputValue = string | number;

type TypeInputsValues = {
  [fieldName: string]: TypeInputValue;
};

const transformInputs = (inputs: TypeInputs): TypeInputsValues => {
  const inputsKeys = Object.keys(inputs);
  const inputsLen = inputsKeys.length;
  const newInputs: TypeInputsValues = {};

  if (!inputsLen) return {};

  for (let i = 0; i < inputsLen; i += 1) {
    const key = inputsKeys[i];
    const value = inputs[key].value;
    newInputs[key] = value;
  }

  return newInputs;
};

export const updateCart = (inputs: TypeInputs) => {
  logger.debug("[actions]", "updateCart", inputs);

  const transformedInputs = transformInputs(inputs);

  if (
    typeof transformedInputs.checkin !== "undefined" &&
    typeof transformedInputs.checkout !== "undefined"
  ) {
    transformedInputs["days"] = getTwoDatesDiff(
      transformedInputs.checkin,
      transformedInputs.checkout
    );
  }

  if (typeof transformedInputs.hotel !== "undefined") {
    transformedInputs["hotelId"] = transformedInputs.hotel;
    delete transformedInputs.hotel;
  }

  return {
    type: UPDATE_CART,
    data: transformedInputs,
  };
};

export const checkCoupon = (couponCode: string) => {
  logger.debug("[actions]", "checkCoupon", couponCode);

  return {
    type: CHECK_COUPON,
    couponCode,
  };
};

export const applyCoupon = (coupon: TypeCoupon) => {
  logger.debug("[actions]", "applyCoupon", coupon);

  const data = {
    data: { ...coupon },
    status: "resolved",
    error: "",
  };

  return {
    type: APPLY_COUPON,
    data,
  };
};

export const applyCouponFailed = (error: string) => {
  logger.debug("[actions]", "applyCouponFailed");

  return {
    type: CHECK_COUPON_FAILED,
    error,
  };
};

export const newReservation = (
  cart: TypeCartDetails["cart"],
  hotelsDetails: TypeHotelDetails[],
  inputs: TypeInputs
) => {
  logger.debug("[actions]", "newReservation", cart);

  const roomDetails = getRoomDetails(cart, hotelsDetails);
  const totals = getTotals(cart, hotelsDetails);

  const data: TypeNewReservation = {
    hotel_id: cart.hotelId ? +cart.hotelId : 0,
    start_date: cart.checkin ? cart.checkin : "",
    end_date: cart.checkout ? cart.checkout : "",
    adult: cart.adults ? +cart.adults : 1,
    child: typeof cart.children !== "undefined" ? +cart.children : 0,
    room_type: roomDetails ? roomDetails.type.id : 0,
    room_scenic: roomDetails ? roomDetails.view.id : 0,
    price: totals.final,
    coupon_code:
      cart.coupon && cart.coupon.data.code ? cart.coupon.data.code : "",
    card_name: inputs.cardHolder.value,
    card_number: inputs.cardNumber.value,
    card_date_month: inputs.month.value,
    card_date_year: inputs.year.value,
    card_cvv: inputs.cardCvv.value,
  };

  return {
    type: NEW_RESERVATION,
    data,
  };
};

export const setNewReservation = (payload: TypeNewReservation) => {
  logger.debug("[actions]", "setNewReservation", payload);

  const data = {
    data: payload,
    status: "resolved",
    error: "",
  };

  // Save reservationId
  if (payload.id) {
    localStorage.setItem("reservationId", payload.id.toString());
  }

  return {
    type: NEW_RESERVATION_FINISH,
    data,
  };
};

export const newReservationFailed = (error: string) => {
  logger.debug("[actions]", "newReservationFailed");

  return {
    type: NEW_RESERVATION_FAILED,
    error,
  };
};

export const deleteReservation = () => {
  const reservationId = getStoredValue<string>("reservationId");
  logger.debug("[actions]", "deleteReservation", reservationId);

  if (!reservationId) {
    return {
      type: DELETE_RESERVATION_FAILED,
      error: "Cannot find reservation ID.",
    };
  }

  return {
    type: DELETE_RESERVATION,
    reservationId,
  };
};

export const finishDeleteReservation = (payload: TypeNewReservation) => {
  logger.debug("[actions]", "finishDeleteReservation", payload);

  const data = {
    data: payload,
    status: "resolved",
    error: "",
  };

  clearStoredValues();

  return {
    type: DELETE_RESERVATION_FINISH,
    data,
  };
};

export const deleteReservationFailed = (error: string) => {
  logger.debug("[actions]", "deleteReservationFailed");

  return {
    type: DELETE_RESERVATION_FAILED,
    error,
  };
};
