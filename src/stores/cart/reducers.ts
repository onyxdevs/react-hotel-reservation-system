import { logger, getStoredValue, getTwoDatesDiff } from 'lib/scripts/utils';
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
    DELETE_RESERVATION_FAILED
} from './constants';

type TypeCartReducerAction = {
    type: string;
    data: TypeCartDetails['cart'];
    error?: string;
};

type TypeCartInitialState = {
    hotelId: string;
    checkin: string;
    checkout: string;
    days: number;
    adults: string;
    children: string;
    roomType: string;
    viewType: string;
    coupon: {
        data: TypeCoupon;
        status: string;
        error: string;
    };
    newReservation: {
        data: TypeNewReservation;
        status: string;
        error: string;
    };
};

// Get initial state from saved values
const getCartInitialState = (): TypeCartInitialState => {
    const step0 = getStoredValue<TypeStep>('step-0');
    const step1 = getStoredValue<TypeStep>('step-1');
    const reservationId = getStoredValue<string>('reservationId');

    return {
        hotelId: step0 ? step0.inputs.hotel.value : '',
        checkin: step0 ? step0.inputs.checkin.value : '',
        checkout: step0 ? step0.inputs.checkout.value : '',
        days: step0 ? getTwoDatesDiff(step0.inputs.checkin.value, step0.inputs.checkout.value) : 0,
        adults: step0 ? step0.inputs.adults.value : '',
        children: step0 ? step0.inputs.children.value : '',
        roomType: step1 ? step1.inputs.roomType.value : '',
        viewType: step1 ? step1.inputs.viewType.value : '',
        coupon: {
            data: {},
            status: 'idle',
            error: ''
        },
        newReservation: {
            data: {
                id: reservationId
            },
            status: 'idle',
            error: ''
        }
    };
};

const cartReducer = (state: TypeCartInitialState = getCartInitialState(), action: TypeCartReducerAction) => {
    logger.debug('[reducer]', 'cartReducer', action);

    switch (action.type) {
        case UPDATE_CART:
            // Check if we have inputs, if not, start fresh, but keep the newReservation ID
            if (!Object.keys(action.data).length) {
                return getCartInitialState();
            }

            return {
                ...state,
                ...action.data
            };

        case CHECK_COUPON:
            return {
                ...state,
                coupon: {
                    data: {},
                    status: 'pending',
                    error: ''
                }
            };

        case APPLY_COUPON:
            return {
                ...state,
                coupon: { ...action.data }
            };

        case CHECK_COUPON_FAILED:
            return {
                ...state,
                coupon: {
                    data: {},
                    status: 'rejected',
                    error: action.error ? action.error : 'Something went wrong.'
                }
            };

        case NEW_RESERVATION:
            return {
                ...state,
                newReservation: {
                    data: {},
                    status: 'pending',
                    error: ''
                }
            };

        case NEW_RESERVATION_FINISH:
            return {
                ...state,
                newReservation: { ...action.data }
            };

        case NEW_RESERVATION_FAILED:
            return {
                ...state,
                newReservation: {
                    data: {},
                    status: 'rejected',
                    error: action.error ? action.error : 'Something went wrong.'
                }
            };

        case DELETE_RESERVATION:
            return {
                ...state,
                newReservation: {
                    data: {},
                    status: 'pending',
                    error: ''
                }
            };

        case DELETE_RESERVATION_FINISH:
            return getCartInitialState();

        case DELETE_RESERVATION_FAILED:
            return {
                ...state,
                newReservation: {
                    data: {},
                    status: 'rejected',
                    error: action.error ? action.error : 'Something went wrong.'
                }
            };

        default:
            return state;
    }
};

export default cartReducer;
