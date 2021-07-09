import React from 'react';

import styleClasses from './ReservationDetailsItem.module.scss';

type TypeReservationDetailsItemProps = {
    title: string;
    value: string;
};

const ReservationDetailsItem: React.FC<TypeReservationDetailsItemProps> = (props: TypeReservationDetailsItemProps) => (
    <li className={styleClasses['reservation-details__item']}>
        <span className={styleClasses['reservation-details__item__title']}>{props.title}</span>
        <span className={styleClasses['reservation-details__item__value']}>{props.value}</span>
    </li>
);

export default ReservationDetailsItem;
