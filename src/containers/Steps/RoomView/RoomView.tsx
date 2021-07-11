import React from 'react';
import validatorjs from 'validator';

import { useForm, useLocalStorage, useCart, useHotels } from 'hooks';
import { Portlet, Button, ReservationDetails, ImageCheckbox } from 'components';
import { getTotalPrice } from 'lib/scripts/utils';

import formClasses from 'components/Form/Form.module.scss';

type TypeRoomOptions = {
    id: string;
    label: string;
    meta: JSX.Element;
    imgUrl: string;
};

const step: TypeStep = {
    index: 1,
    isValid: false,
    inputs: {
        roomType: {
            value: '',
            isTouched: false,
            isValid: false
        },
        viewType: {
            value: '',
            isTouched: false,
            isValid: false
        }
    }
};

const RoomView: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    const { cart } = useCart();
    const { selectedHotel } = useHotels();

    const roomTypeOptions: TypeRoomOptions[] = [];
    if (selectedHotel?.details?.room_type.length) {
        selectedHotel.details.room_type.forEach((type) => {
            roomTypeOptions.push({
                id: `roomType-${type.id}`,
                label: type.title,
                meta: (
                    <>
                        <span>
                            {cart.days} {cart.days && +cart.days > 1 ? 'Days' : 'Day'}
                            <br />
                            {cart.adults} {cart.adults && +cart.adults > 1 ? 'Adults' : 'Adult'}
                        </span>
                        <span>
                            {cart.days && cart.adults && getTotalPrice(type.price, +cart.days, +cart.adults).toFixed(2)}{' '}
                            TL
                        </span>
                    </>
                ),
                imgUrl: type.photo
            });
        });
    }

    const viewTypeOptions: TypeRoomOptions[] = [];
    if (selectedHotel?.details?.room_scenic.length) {
        selectedHotel.details.room_scenic.forEach((type) => {
            viewTypeOptions.push({
                id: `viewType-${type.id}`,
                label: type.title,
                meta: (
                    <>
                        <span>Price impact ratio</span>
                        <span>+ {type.price_rate} %</span>
                    </>
                ),
                imgUrl: type.photo
            });
        });
    }

    return (
        <Portlet>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={formClasses['form__wide-row']}>
                    <ReservationDetails show={['checkin', 'checkout', 'adults', 'children']} />
                </div>
                <h4 className={[formClasses['form__label'], formClasses['form__section__title']].join(' ')}>
                    Room selection
                </h4>
                <div className={formClasses['form__wide-row']}>
                    <ImageCheckbox
                        id="roomType"
                        value={formState.inputs.roomType.value}
                        validity={formState.inputs.roomType.isValid}
                        isTouched={formState.inputs.roomType.isTouched}
                        validators={[[validatorjs.isLength, { min: 1, max: undefined }]]}
                        validationMessage="Please select a room type."
                        onChange={inputHandler}
                        options={roomTypeOptions}
                    />
                </div>
                <h4 className={[formClasses['form__label'], formClasses['form__section__title']].join(' ')}>
                    View selection
                </h4>
                <div className={formClasses['form__wide-row']}>
                    <ImageCheckbox
                        id="viewType"
                        value={formState.inputs.viewType.value}
                        validity={formState.inputs.viewType.isValid}
                        isTouched={formState.inputs.viewType.isTouched}
                        validators={[[validatorjs.isLength, { min: 1, max: undefined }]]}
                        validationMessage="Please select a view type."
                        onChange={inputHandler}
                        options={viewTypeOptions}
                    />
                </div>
                <div className={[formClasses['form__normal-row'], formClasses['form__actions']].join(' ')}>
                    <Button
                        type="button"
                        color="none"
                        onClick={() => {
                            props.stepChangeHandler(step.index, formState, step.index - 1);
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            if (!formState.isValid) return;
                            props.stepChangeHandler(step.index, formState, step.index + 1);
                            setLocalStorageValue({
                                ...step,
                                isValid: formState.isValid,
                                inputs: { ...formState.inputs }
                            });
                        }}
                        disabled={!formState.isValid}
                    >
                        Save and continue
                    </Button>
                </div>
            </form>
        </Portlet>
    );
};

export default RoomView;
