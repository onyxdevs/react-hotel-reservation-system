import React from 'react';

import styleClasses from './ReservationTotals.module.scss';
import { useCart } from '../../../hooks';

type TypeReservationTotalsProps = {};

const ReservationTotals: React.FC<TypeReservationTotalsProps> = (props: TypeReservationTotalsProps) => {
    const { cart, coupon, totals } = useCart();

    let discountAmount = 0;
    if (coupon.id) {
        const discountPercentage = coupon.discountAmmount ? coupon.discountAmmount : 0;
        discountAmount = (discountPercentage / 100) * totals.final;
    }

    return (
        <li className={styleClasses['reservation-details__totals']}>
            <div className={styleClasses['reservation-details__totals__item']}>
                <span className={styleClasses['reservation-details__totals__title']}>Room price</span>
                <span className={styleClasses['reservation-details__totals__value']}>{totals.room} TL</span>
            </div>
            <div className={styleClasses['reservation-details__totals__item']}>
                <span className={styleClasses['reservation-details__totals__title']}>Price impact ratio</span>
                <span className={styleClasses['reservation-details__totals__value']}>{totals.ratio}%</span>
            </div>
            <div className={styleClasses['reservation-details__totals__item']}>
                <span className={styleClasses['reservation-details__totals__title']}>
                    Accomodation{' '}
                    <span>
                        {cart.days} {cart.days && +cart.days > 1 ? 'Days' : 'Day'}
                    </span>
                </span>
                <span className={styleClasses['reservation-details__totals__value']}>{totals.total.toFixed(2)} TL</span>
            </div>
            {coupon.code && (
                <div className={styleClasses['reservation-details__totals__item']}>
                    <span className={styleClasses['reservation-details__totals__title']}>
                        Discount <span>({coupon.code})</span>
                    </span>
                    <span className={styleClasses['reservation-details__totals__value']}>
                        -{discountAmount.toFixed(2)} TL
                    </span>
                </div>
            )}
            <div className={styleClasses['reservation-details__totals__total']}>
                <span className={styleClasses['reservation-details__totals__title']}>Total amount</span>
                <span className={styleClasses['reservation-details__totals__value']}>
                    {(totals.final - discountAmount).toFixed(2)} TL
                </span>
            </div>
        </li>
    );
};

export default ReservationTotals;
