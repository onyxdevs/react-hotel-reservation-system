import React from 'react';

// import { useHotels, useCart } from '../../../vite/src/hooks';
import ReservationDetailsItem from './ReservationDetailsItem';
import ReservationCoupon from './ReservationCoupon';
import ReservationTotals from './ReservationTotals';

import styleClasses from './ReservationDetails.module.scss';
import itemStyleClasses from './ReservationDetailsItem/ReservationDetailsItem.module.scss';
import { useCart, useHotels } from '../../hooks';

type TypeDetail = 'checkin' | 'checkout' | 'adults' | 'children' | 'room' | 'view' | 'coupon' | 'totals';
type TypeReservationDetailsProps = {
    show: TypeDetail[];
    type?: 'boxes';
};

const ReservationDetails: React.FC<TypeReservationDetailsProps> = (props: TypeReservationDetailsProps) => {
    const { roomDetails, selectedHotel } = useHotels();
    const { cart } = useCart();

    if (!cart.hotelId) return null;

    const renderDetailsItem = (key: TypeDetail) => {
        if (!cart.checkin || !cart.checkout || !cart.adults || !cart.children) return null;

        const items: any = {
            checkin: <ReservationDetailsItem title="Check-in date" value={cart.checkin} />,
            checkout: <ReservationDetailsItem title="Check-out date" value={cart.checkout} />,
            adults: <ReservationDetailsItem title="Adults" value={cart.adults} />,
            children: <ReservationDetailsItem title="Children" value={cart.children} />,
            room:
                !!roomDetails && roomDetails.type ? (
                    <ReservationDetailsItem title="Room" value={roomDetails.type.title} />
                ) : null,
            view:
                !!roomDetails && roomDetails.view ? (
                    <ReservationDetailsItem title="View" value={roomDetails.view.title} />
                ) : null,
            coupon: <ReservationCoupon />,
            totals: <ReservationTotals />
        };

        if (props.show.includes(key)) {
            return items[key];
        }

        return null;
    };

    const elClasses = [styleClasses['reservation-details']];
    if (props.type) {
        elClasses.push(itemStyleClasses['reservation-details--boxes']);
    }

    return (
        <div className={elClasses.join(' ')}>
            <h2 className={styleClasses['reservation-details__title']}>
                {!!selectedHotel ? selectedHotel.name : ''}{' '}
                {selectedHotel?.details?.city && <span>{`(${selectedHotel.details.city})`}</span>}
            </h2>
            <ul className={styleClasses['reservation-details__list']}>
                {renderDetailsItem('checkin')}
                {renderDetailsItem('checkout')}
                {renderDetailsItem('adults')}
                {renderDetailsItem('children')}
                {renderDetailsItem('room')}
                {renderDetailsItem('view')}
                {renderDetailsItem('coupon')}
                {renderDetailsItem('totals')}
            </ul>
        </div>
    );
};

export default ReservationDetails;
