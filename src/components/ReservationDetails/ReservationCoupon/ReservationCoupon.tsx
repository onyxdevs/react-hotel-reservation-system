import React, { useState } from 'react';

import styleClasses from './ReservationCoupon.module.scss';
import { useCart } from '../../../hooks';
import { Button, TextField } from '../..';

type TypeReservationCouponProps = {};

const ReservationCoupon: React.FC<TypeReservationCouponProps> = (props: TypeReservationCouponProps) => {
    const { coupon, dispatchCheckCoupon } = useCart();
    const [inputValue, setInputValue] = useState<string>('');

    const applyHandler = () => {
        dispatchCheckCoupon(inputValue);
        setInputValue('');
    };

    const renderMessage = () => {
        if (coupon.discountAmmount && !coupon.error) {
            return (
                <p className={styleClasses['reservation-details__coupon__success']}>
                    {coupon.discountAmmount}% discount applied successfully.
                </p>
            );
        }
        if (coupon.status === 'rejected' && coupon.error) {
            return <p className={styleClasses['reservation-details__coupon__error']}>{coupon.error}</p>;
        }
    };

    return (
        <li className={styleClasses['reservation-details__coupon']}>
            <div className={styleClasses['reservation-details__coupon__content']}>
                <TextField
                    id="coupon"
                    type="text"
                    value={inputValue}
                    validity={true}
                    isTouched={true}
                    onChange={(id, value, validity) => {
                        setInputValue(value);
                    }}
                    placeholder="Coupon code..."
                />
                <Button
                    type="button"
                    onClick={applyHandler}
                    disabled={inputValue.length < 3}
                    loading={coupon.status === 'pending'}
                >
                    Apply
                </Button>
            </div>

            {renderMessage()}
        </li>
    );
};

export default ReservationCoupon;
