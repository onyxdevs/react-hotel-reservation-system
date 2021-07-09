import { put } from 'redux-saga/effects';
import validatorjs from 'validator';

import {
    applyCoupon,
    applyCouponFailed,
    setNewReservation,
    newReservationFailed,
    finishDeleteReservation,
    deleteReservationFailed
} from './actions';
import api from 'lib/scripts/apis';
import { logger, getStoredValue } from 'lib/scripts/utils';

export function* checkCouponSaga(payload: any): any {
    logger.debug('[saga]', 'checkCouponSaga', payload);

    try {
        const resData = yield api.checkCoupon(payload.couponCode);
        if (!resData.length) {
            throw new Error('Coupon code is not valid.');
        }
        // Validate expiration date
        if (!validatorjs.isAfter(resData[0].expiration_at)) {
            throw new Error('Coupon code is not valid.');
        }
        yield put(applyCoupon(resData[0]));
    } catch (error) {
        yield put(applyCouponFailed(error.message));
    }
}

export function* newReservationSaga(payload: any): any {
    logger.debug('[saga]', 'newReservationSaga', payload);

    const reservationId = getStoredValue<string>('reservationId');

    try {
        let resData: TypeNewReservation;
        if (!reservationId) {
            resData = yield api.newReservation(payload.data);
        } else {
            resData = yield api.updateReservation(payload.data, reservationId);
        }
        yield put(setNewReservation(resData));
    } catch (error) {
        yield put(newReservationFailed(error.message));
    }
}

export function* deleteReservationSaga(payload: any): any {
    logger.debug('[saga]', 'newReservationSaga', payload);

    try {
        const resData: TypeNewReservation = yield api.deleteReservation(payload.reservationId);
        yield put(finishDeleteReservation(resData));
    } catch (error) {
        yield put(deleteReservationFailed(error.message));
    }
}
