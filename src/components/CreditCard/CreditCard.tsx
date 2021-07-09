import React from 'react';

import './CreditCard.scss';

type TypeCreditCardProps = {
    inputs: TypeInputs;
    isCardFlipped: boolean;
    details: TypeCardDetails[0];
};

const CreditCard: React.FC<TypeCreditCardProps> = (props: TypeCreditCardProps) => {
    const elClasses = ['credit-card'];

    if (props.isCardFlipped) {
        elClasses.push('credit-card--flipped');
    }

    return (
        <div className={elClasses.join(' ')}>
            <div className="credit-card__front-wrapper">
                {props.details.single && (
                    <div className="credit-card__single">
                        <img src={props.details.single} alt="Bank logo" />
                    </div>
                )}
                <svg className="credit-card__front" viewBox="0 0 750 471">
                    <path className={['lightcolor', props.details.color].join(' ')} d="M0,0h750v471H0V0z" />
                    <path
                        className={['darkcolor', props.details.color + 'dark'].join(' ')}
                        d="M750,471V193.2c-217.6-57.5-556.4-13.5-750,24.9V471H750z"
                    />
                    <text transform="matrix(1 0 0 1 60.106 295.0121)" className="credit-card__number st2 st3 st4">
                        {!!props.inputs.cardNumber.value ? props.inputs.cardNumber.value : '0123 4567 8910 1234'}
                    </text>
                    <text transform="matrix(1 0 0 1 54.1064 428.1723)" className="credit-card__holder st2 st5 st6">
                        {!!props.inputs.cardHolder.value ? props.inputs.cardHolder.value : 'JOHN DOE'}
                    </text>
                    <text transform="matrix(1 0 0 1 54.1074 389.8793)" className="st7 st5 st8">
                        cardholder name
                    </text>
                    <text transform="matrix(1 0 0 1 479.7754 388.8793)" className="st7 st5 st8">
                        expiration
                    </text>
                    <text transform="matrix(1 0 0 1 65.1054 241.5)" className="st7 st5 st8">
                        card number
                    </text>
                    <text transform="matrix(1 0 0 1 574.4219 433.8095)" className="credit-card__expire st2 st5 st9">
                        {!!props.inputs.month.value ? props.inputs.month.value : '00'}/
                        {props.inputs.year.value ? props.inputs.year.value.slice(-2) : '00'}
                    </text>
                    <text transform="matrix(1 0 0 1 479.3848 417.0097)" className="st2 st10 st11">
                        VALID
                    </text>
                    <text transform="matrix(1 0 0 1 479.3848 435.6762)" className="st2 st10 st11">
                        THRU
                    </text>
                    <polygon className="st2" points="554.5,421 540.4,414.2 540.4,427.9" />
                    <g className="credit-card__cchip">
                        <path
                            className="st2"
                            d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                        />
                        <rect x="82" y="70" className="st12" width="1.5" height="60" />
                        <rect x="167.4" y="70" className="st12" width="1.5" height="60" />
                        <path
                            className="st12"
                            d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                        />
                        <rect x="82.8" y="82.1" className="st12" width="25.8" height="1.5" />
                        <rect x="82.8" y="117.9" className="st12" width="26.1" height="1.5" />
                        <rect x="142.4" y="82.1" className="st12" width="25.8" height="1.5" />
                        <rect x="142" y="117.9" className="st12" width="26.2" height="1.5" />
                    </g>
                </svg>
            </div>
            <div className="credit-card__back-wrapper">
                <svg className="credit-card__back" viewBox="0 0 750 471">
                    <line className="st0" x1="35.3" y1="10.4" x2="36.7" y2="11" />
                    <path className={['darkcolor', props.details.color + 'dark'].join(' ')} d="M0,0h750v471H0V0z" />
                    <rect y="61.6" className="st2" width="750" height="78" />
                    <path
                        className="st3"
                        d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5C707.1,246.4,704.4,249.1,701.1,249.1z"
                    />
                    <rect x="42.9" y="198.6" className="st4" width="664.1" height="10.5" />
                    <rect x="42.9" y="224.5" className="st4" width="664.1" height="10.5" />
                    <path
                        className="st5"
                        d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
                    />
                    <text transform="matrix(1 0 0 1 621.999 227.2734)" className="credit-card__cvv st6 st7">
                        {!!props.inputs.cardCvv.value ? props.inputs.cardCvv.value : '000'}
                    </text>
                    <text transform="matrix(1 0 0 1 518.083 280.0879)" className="st9 st6 st10 st8">
                        security code
                    </text>
                    <rect x="58.1" y="378.6" className="st11" width="375.5" height="13.5" />
                    <rect x="58.1" y="405.6" className="st11" width="421.7" height="13.5" />
                    <text transform="matrix(1 0 0 1 59.5073 228.6099)" className="credit-card__holder-back st12 st13">
                        {!!props.inputs.cardHolder.value ? props.inputs.cardHolder.value : 'John Doe'}
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default CreditCard;
