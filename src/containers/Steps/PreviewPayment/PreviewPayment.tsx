import React, { useEffect, useState } from 'react';
import validatorjs from 'validator';

import { useForm, useLocalStorage, useCart, useCreditCard } from 'hooks';
import { Portlet, Button, CreditCard, ReservationDetails, Select, TextField } from 'components';
import { getCreditCardYears, getCreditCardMonths, isValidName, ccNumberMaskPipe } from 'lib/scripts/utils';

import formClasses from 'components/Form/Form.module.scss';
import styleClasses from './PreviewPayment.module.scss';

declare global {
    type TypeCardDetails = {
        [stepIndex: string]: {
            icon: string;
            single: string;
            color: string;
        };
    };
}

const step: TypeStep = {
    index: 2,
    isValid: false,
    inputs: {
        cardHolder: {
            value: '',
            isTouched: false,
            isValid: false
        },
        cardNumber: {
            value: '',
            isTouched: false,
            isValid: false
        },
        month: {
            value: '',
            isTouched: false,
            isValid: false
        },
        year: {
            value: '',
            isTouched: false,
            isValid: false
        },
        cardCvv: {
            value: '',
            isTouched: false,
            isValid: false
        }
    }
};

const PreviewPayment: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    const { cart, dispatchNewReservation } = useCart();
    const { cardDetails, updateCardDetails, isCardFlipped, turnCardHandler } = useCreditCard();

    const [monthOptions, setMonthOptions] = useState<TypeOption[]>([]);

    // Re-set months select options, if the selected year is the current year, months options should not be 12.
    useEffect(() => {
        if (!monthOptions.length) {
            setMonthOptions(
                getCreditCardMonths(formState.inputs.year.value).map((month) => ({
                    label: month,
                    value: month
                }))
            );
        }
    }, [formState.inputs.year.value, monthOptions.length]);

    // Go to next step if the newReservation is resolved
    useEffect(() => {
        if (cart.newReservation.status === 'resolved') {
            props.stepChangeHandler(step.index, formState, step.index + 1);
            setLocalStorageValue({
                ...step,
                isValid: formState.isValid,
                inputs: { ...formState.inputs }
            });
        }
    }, [cart.newReservation.status, formState, props, setLocalStorageValue]);

    return monthOptions.length && Object.keys(formState.inputs).length ? (
        <Portlet>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styleClasses['preview-payment']}>
                    <div className={styleClasses['preview-payment__card']} onClick={turnCardHandler}>
                        <CreditCard inputs={formState.inputs} isCardFlipped={isCardFlipped} details={cardDetails} />
                    </div>
                    <div className={styleClasses['preview-payment__details']}>
                        <ReservationDetails
                            type="boxes"
                            show={['checkin', 'checkout', 'adults', 'children', 'room', 'view', 'coupon', 'totals']}
                        />
                    </div>
                    <div className={styleClasses['preview-payment__form']}>
                        <div className={formClasses['form__wide-row']}>
                            <TextField
                                id="cardHolder"
                                type="text"
                                label="Card holder name"
                                value={formState.inputs.cardHolder.value}
                                validity={formState.inputs.cardHolder.isValid}
                                isTouched={formState.inputs.cardHolder.isTouched}
                                validators={[[isValidName]]}
                                validationMessage="Please enter a valid card holder name"
                                onChange={inputHandler}
                            />
                        </div>
                        <div className={formClasses['form__wide-row']}>
                            {cardDetails.icon && (
                                <img
                                    className={styleClasses['credit-card-icon']}
                                    src={cardDetails.icon}
                                    alt="Bank logo"
                                />
                            )}
                            <TextField
                                id="cardNumber"
                                type="text"
                                label="Card number"
                                value={formState.inputs.cardNumber.value}
                                validity={formState.inputs.cardNumber.isValid}
                                isTouched={formState.inputs.cardNumber.isTouched}
                                validators={[[validatorjs.isCreditCard]]}
                                validationMessage="Please enter a valid card number"
                                onChange={(id, value, validity) => {
                                    inputHandler(id, ccNumberMaskPipe(value), validity);
                                    updateCardDetails(value);
                                }}
                            />
                        </div>
                        <div className={formClasses['form__wide-row']}>
                            <div className={formClasses['form__have-two']}>
                                <span className={formClasses['form__label']}>Card expiration date</span>
                                <Select
                                    id="month"
                                    options={monthOptions}
                                    onChange={inputHandler}
                                    value={formState.inputs.month.value}
                                    validity={formState.inputs.month.isValid}
                                    isTouched={formState.inputs.month.isTouched}
                                    validators={[[validatorjs.isLength, { min: 1, max: undefined }]]}
                                    validationMessage="Please select a valid expiration month"
                                />
                                <Select
                                    id="year"
                                    options={getCreditCardYears().map((year) => ({
                                        label: year.toString(),
                                        value: year.toString()
                                    }))}
                                    onChange={(id, value, validity) => {
                                        inputHandler(id, value, validity);
                                        setMonthOptions(
                                            getCreditCardMonths(value).map((month) => ({
                                                label: month,
                                                value: month
                                            }))
                                        );

                                        const month = formState.inputs.month.value;
                                        const isCurrentYear = +value === new Date().getFullYear();
                                        const isPassedMonth = month && +month < new Date().getMonth() + 1;

                                        if (isCurrentYear && isPassedMonth) {
                                            inputHandler('month', '', false);
                                        }
                                    }}
                                    value={formState.inputs.year.value}
                                    validity={formState.inputs.year.isValid}
                                    isTouched={formState.inputs.year.isTouched}
                                    validators={[[validatorjs.isLength, { min: 1, max: undefined }]]}
                                    validationMessage="Please select a valid expiration year"
                                />
                            </div>
                            <TextField
                                id="cardCvv"
                                type="text"
                                label="CVV"
                                value={formState.inputs.cardCvv.value}
                                validity={formState.inputs.cardCvv.isValid}
                                isTouched={formState.inputs.cardCvv.isTouched}
                                validators={[[validatorjs.isNumeric], [validatorjs.isLength, { min: 3, max: 4 }]]}
                                validationMessage="Please enter a valid CVV"
                                onChange={inputHandler}
                                ref={turnCardHandler}
                            />
                        </div>

                        {cart.newReservation && cart.newReservation.status === 'rejected' && cart.newReservation.error && (
                            <div className={formClasses['form__wide-row']}>
                                <p className={formClasses['form__error']}>{cart.newReservation.error}</p>
                            </div>
                        )}
                    </div>
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
                            // Updates/Creates a reservation, the check is done in newReservationSaga
                            dispatchNewReservation(formState.inputs);
                        }}
                        disabled={!formState.isValid}
                        loading={cart.newReservation.status === 'pending'}
                    >
                        Pay and finish
                    </Button>
                </div>
            </form>
        </Portlet>
    ) : null;
};

export default PreviewPayment;
