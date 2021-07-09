import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkCoupon, newReservation, deleteReservation } from 'stores/cart/actions';
import { getTotals } from 'lib/scripts/utils';

const useCart = () => {
    const cart = useSelector((state: TypeCartDetails) => state.cart);
    const hotelsDetails = useSelector((state: TypeAppProps) => state.hotels.data.details);
    const dispatch = useDispatch();

    const coupon = {
        status: cart.coupon?.status,
        error: cart.coupon?.error,
        id: cart.coupon?.data.id,
        code: cart.coupon?.data.code,
        discountAmmount: cart.coupon?.data.discount_ammount,
        expiration: cart.coupon?.data.expiration_at
    };

    const dispatchCheckCoupon = useCallback(
        (inputValue: string) => {
            dispatch(checkCoupon(inputValue));
        },
        [dispatch]
    );

    const dispatchNewReservation = useCallback(
        (inputs: TypeInputs) => {
            dispatch(newReservation(cart, hotelsDetails, inputs));
        },
        [dispatch, cart, hotelsDetails]
    );

    const dispatchDeleteReservation = useCallback(() => {
        dispatch(deleteReservation());
    }, [dispatch]);

    return {
        cart,
        coupon,
        totals: getTotals(cart, hotelsDetails),
        dispatchCheckCoupon,
        dispatchNewReservation,
        dispatchDeleteReservation
    };
};

export default useCart;
