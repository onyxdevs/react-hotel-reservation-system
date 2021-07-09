import { useCallback, useState } from 'react';

import { getCCNumberMaskType } from 'lib/scripts/utils';

import amexSingle from 'lib/media/payment/amex-single.svg';
import amex from 'lib/media/payment/amex.svg';
import dinersSingle from 'lib/media/payment/diners-single.svg';
import diners from 'lib/media/payment/diners.svg';
import discoverSingle from 'lib/media/payment/discover-single.svg';
import discover from 'lib/media/payment/discover.svg';
import jcbSingle from 'lib/media/payment/jcb-single.svg';
import jcb from 'lib/media/payment/jcb.svg';
import maestroSingle from 'lib/media/payment/maestro-single.svg';
import maestro from 'lib/media/payment/maestro.svg';
import mastercardSingle from 'lib/media/payment/mastercard-single.svg';
import mastercard from 'lib/media/payment/mastercard.svg';
import troySingle from 'lib/media/payment/troy-single.svg';
import troy from 'lib/media/payment/troy.svg';
import unionpaySingle from 'lib/media/payment/unionpay-single.svg';
import unionpay from 'lib/media/payment/unionpay.svg';
import visaSingle from 'lib/media/payment/visa-single.svg';
import visa from 'lib/media/payment/visa.svg';

const cardsDetails: TypeCardDetails = {
    'american-express': {
        icon: amex,
        single: amexSingle,
        color: 'green'
    },
    visa: {
        icon: visa,
        single: visaSingle,
        color: 'lime'
    },
    diners: {
        icon: diners,
        single: dinersSingle,
        color: 'orange'
    },
    discover: {
        icon: discover,
        single: discoverSingle,
        color: 'purple'
    },
    jcb: {
        icon: jcb,
        single: jcbSingle,
        color: 'red'
    },
    jcb15: {
        icon: jcb,
        single: jcbSingle,
        color: 'red'
    },
    maestro: {
        icon: maestro,
        single: maestroSingle,
        color: 'yellow'
    },
    mastercard: {
        icon: mastercard,
        single: mastercardSingle,
        color: 'lightblue'
    },
    unionpay: {
        icon: unionpay,
        single: unionpaySingle,
        color: 'cyan'
    },
    troy: {
        icon: troy,
        single: troySingle,
        color: 'cyan'
    }
};

const useCreditCard = () => {
    const [cardDetails, setCardDetails] = useState<TypeCardDetails[0]>({ icon: '', single: '', color: 'grey' });
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const updateCardDetails = useCallback((value: string) => {
        const cardObj = getCCNumberMaskType(value);

        if (cardObj && typeof cardsDetails[cardObj.cardType] !== 'undefined') {
            setCardDetails(cardsDetails[cardObj.cardType]);
        } else {
            setCardDetails({
                icon: '',
                single: '',
                color: 'grey'
            });
        }
    }, []);

    const turnCardHandler = useCallback(
        (node) => {
            if (node instanceof HTMLInputElement) {
                node.addEventListener('focus', () => {
                    setIsCardFlipped(true);
                });
                node.addEventListener('blur', () => {
                    setIsCardFlipped(false);
                });
            } else {
                setIsCardFlipped(!isCardFlipped);
            }
        },
        [isCardFlipped]
    );

    return { cardDetails, updateCardDetails, isCardFlipped, turnCardHandler };
};

export default useCreditCard;
