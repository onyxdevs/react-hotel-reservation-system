import React, { useEffect } from 'react';

import { useCart } from 'hooks';
import { Portlet, Button, ReservationDetails } from 'components';
import { clearStoredValues } from 'lib/scripts/utils';

import styleClasses from './Finish.module.scss';

import fireworks from 'lib/media/icons/fireworks.svg';

const Finish: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const { cart, dispatchDeleteReservation } = useCart();

    const { stepChangeHandler } = props;

    // Go to the first step after delete
    useEffect(() => {
        if (cart.newReservation.status === 'idle' && !cart.newReservation.data.id) {
            stepChangeHandler(0, { isValid: false, inputs: {}, hasChanged: false }, 0);
            clearStoredValues();
        }
    }, [cart.newReservation.data.id, cart.newReservation.status, stepChangeHandler]);

    return (
        <Portlet>
            <div className={styleClasses['finish']}>
                <div className={styleClasses['finish__content']}>
                    <div className={styleClasses['finish__img-wrapper']}>
                        <img src={fireworks} alt="Your reservation record has been received." />
                    </div>
                    <h1 className={styleClasses['finish__title']}>Your reservation record has been received.</h1>
                    <p className={styleClasses['finish__text']}>
                        Your reservation summary is as shown below. You can use the links below to update your
                        reservation record or make a new reservation.
                    </p>
                    <div className={styleClasses['finish__actions']}>
                        <Button
                            type="button"
                            onClick={() => {
                                stepChangeHandler(0, { isValid: false, inputs: {}, hasChanged: false }, 0);
                                clearStoredValues();
                            }}
                        >
                            Make a new reservation
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                stepChangeHandler(0, { isValid: true, inputs: {}, hasChanged: true }, 0);
                            }}
                        >
                            Update reservation
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete your reservation?')) {
                                    dispatchDeleteReservation();
                                }
                            }}
                            loading={cart.newReservation.status === 'pending'}
                        >
                            Cancel reservation
                        </Button>
                    </div>
                </div>

                <ReservationDetails
                    type="boxes"
                    show={['checkin', 'checkout', 'adults', 'children', 'room', 'view', 'totals']}
                />
            </div>
        </Portlet>
    );
};

export default Finish;
