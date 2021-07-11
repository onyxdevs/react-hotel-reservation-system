import _ from 'lodash';
import IMask from 'imask/esm/imask';
import 'imask/esm/masked/dynamic';
import 'imask/esm/masked/pipe';
import validatorjs from 'validator';

class Logger {
    private logs: object[];

    constructor() {
        this.logs = [];
    }

    /**
     * Runs only on development environment
     * @returns {void}
     */
    debug(...args: any[]) {
        if (process.env.NODE_ENV !== 'development') return;

        // Convert arguments to cleaned array
        const newArgs = [...args];

        const filePath = newArgs[0];
        // const fileName = filePath.replace(/^.*[\\/]/, '');
        const fileName = filePath;

        newArgs[0] = '%c' + fileName;
        newArgs.splice(1, 0, 'color: #1c6ef7; font-weight: bold;');

        this.logs.push({
            type: 'DEBUG',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.log(...newArgs);
    }

    /**
     * Runs only on production environment
     * @returns {void}
     */
    silly(...args: any[]) {
        if (process.env.NODE_ENV !== 'production') return;

        // Convert arguments to cleaned array
        const newArgs = [...args];

        const filePath = newArgs[0];
        // const fileName = filePath.replace(/^.*[\\/]/, '');
        const fileName = filePath;

        newArgs[0] = '%c' + fileName;
        newArgs.splice(1, 0, 'color: #1c6ef7; font-weight: bold;');

        this.logs.push({
            type: 'DEBUG',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.log(...newArgs);
    }

    /**
     * Runs anywhere
     * @returns {void}
     */
    error(...args: any[]) {
        // Convert arguments to cleaned array
        const newArgs = [...args];

        newArgs[0] = '%c' + newArgs[0];
        newArgs.splice(1, 0, 'color: red; font-weight: bold;');

        this.logs.push({
            type: 'ERROR',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.error(...newArgs);
    }
}
export const logger = new Logger();

type TypeValidatorPayload = any;
declare global {
    type TypeValidator = [(val: string, ...payload: TypeValidatorPayload[]) => boolean, any?];
}
export const validator = (value: string, validators?: TypeValidator[]) => {
    let isValid = true;

    if (!(typeof validators !== 'undefined' && validators.length)) return isValid;

    const validatorsLen = validators.length;

    for (let i = 0; i < validatorsLen; i += 1) {
        const validatorArr = validators[i];
        let func = validatorArr[0];
        const args = validatorArr.slice(1);

        if (!func || typeof func !== 'function') continue;

        const result = func(value, ...args);
        isValid = isValid && result;
        if (!isValid) break;
    }

    return isValid;
};

export const isValidName = (str: string) => {
    let isValid = true;
    const strArr = str.split(' ');
    const strArrLen = strArr.length;

    if (strArr.length < 2) {
        return false;
    }

    for (let i = 0; i < strArrLen; i += 1) {
        isValid = isValid && validatorjs.isAlpha(strArr[i], 'en-US');
    }

    return isValid;
};

export const getCreditCardYears = (): number[] => {
    const targetYear = new Date().getFullYear() + 10;
    const currentYear = new Date().getFullYear();
    const yearsArr = [];

    for (let i = currentYear; i <= targetYear; i += 1) {
        yearsArr.push(i);
    }

    return yearsArr;
};

export const getCreditCardMonths = (year: string): string[] => {
    let currentMonthIndex = 1;
    const monthsArr = [];

    if (year === new Date().getFullYear().toString()) {
        currentMonthIndex = new Date().getMonth() + 1;
    }

    for (let i = currentMonthIndex; i <= 12; i += 1) {
        monthsArr.push(i.toString().padStart(2, '0'));
    }

    return monthsArr;
};

export const getStoredValue = <T>(key: string): T | undefined => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : '';
    } catch (error) {
        console.log('🔥', error);
    }
};

export const clearStoredValues = (): void => {
    localStorage.removeItem('step-0');
    localStorage.removeItem('step-1');
    localStorage.removeItem('step-2');
    localStorage.removeItem('steps');
    localStorage.removeItem('reservationId');
};

export const getTwoDatesDiff = (checkin: string | number, checkout: string | number): number => {
    if (typeof checkin === 'string' && typeof checkout === 'string') {
        const timeDiff = new Date(checkout).getTime() - new Date(checkin).getTime();
        return timeDiff / (1000 * 3600 * 24);
    }
    return 0;
};

export const getTotalPrice = (price: number, days: number, visitors: number): number => {
    if (typeof days === 'undefined' || typeof visitors === 'undefined') {
        return price;
    }
    return visitors * days * price;
};

export const getRoomDetails = (cart: TypeCartDetails['cart'], hotelsDetails: TypeHotelDetails[]) => {
    const activeHotelId = cart.hotelId;
    let activeHotelDetails;
    if (hotelsDetails && activeHotelId) {
        activeHotelDetails = hotelsDetails.find((item) => item.id === activeHotelId);
    }

    if (activeHotelDetails) {
        const roomTypeId = cart.roomType ? cart.roomType.split('-')[1] : '0';
        const roomTypeIndex = activeHotelDetails.room_type.findIndex(
            (type) => type.id.toString() === roomTypeId.toString()
        );

        const viewTypeId = cart.viewType ? cart.viewType.split('-')[1] : '0';
        const viewTypeIndex = activeHotelDetails.room_scenic.findIndex(
            (type) => type.id.toString() === viewTypeId.toString()
        );

        return {
            type: activeHotelDetails.room_type[roomTypeIndex],
            view: activeHotelDetails.room_scenic[viewTypeIndex]
        };
    }
};

export const getTotals = (cart: TypeCartDetails['cart'], hotelsDetails: TypeHotelDetails[]) => {
    const roomDetails = getRoomDetails(cart, hotelsDetails);

    let roomPrice = 0;
    let roomRatio = 0;
    let totalPrice = 0;
    if (roomDetails?.type && roomDetails?.view) {
        roomPrice = roomDetails.type.price;
        roomRatio = roomDetails.view.price_rate;
        if (cart.days && cart.adults) {
            totalPrice = getTotalPrice(roomPrice, +cart.days, +cart.adults);
        }
    }

    const finalPrice = (roomRatio / 100) * totalPrice + totalPrice;

    return {
        room: roomPrice,
        total: totalPrice,
        ratio: roomRatio,
        final: finalPrice
    };
};

export const compareProps = <T>(a: object, b: T, keys: string[]): boolean =>
    _.isMatch(
        // check deep equality
        a, // get properties from a
        _.pick(b, keys) // get properties from b
    );

type TypeMaskOption = {
    mask: string;
    regex?: string;
    cardType: string;
};
const ccNumberMaskOptions: TypeMaskOption[] = [
    {
        mask: '0000 0000 0000 0000',
        regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
        cardType: 'discover'
    },
    {
        mask: '0000 000000 0000',
        regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
        cardType: 'diners'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
        cardType: 'mastercard'
    },
    {
        mask: '0000-0000-0000-0000',
        regex: '^(5019|4175|4571)\\d{0,12}',
        cardType: 'dankort'
    },
    {
        mask: '0000-0000-0000-0000',
        regex: '^63[7-9]\\d{0,13}',
        cardType: 'instapayment'
    },
    {
        mask: '0000 000000 00000',
        regex: '^(?:2131|1800)\\d{0,11}',
        cardType: 'jcb15'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^(?:35\\d{0,2})\\d{0,12}',
        cardType: 'jcb'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
        cardType: 'maestro'
    },
    {
        mask: '0000-0000-0000-0000',
        regex: '^220[0-4]\\d{0,12}',
        cardType: 'mir'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^4\\d{0,15}',
        cardType: 'visa'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^62\\d{0,14}',
        cardType: 'unionpay'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^9792\\d{0,14}',
        cardType: 'troy'
    },
    {
        mask: '0000 000000 00000',
        regex: '^3[47]\\d{0,13}',
        cardType: 'american-express'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '',
        cardType: 'unknown'
    }
];
export const ccNumberMaskPipe = IMask.createPipe(
    {
        mask: ccNumberMaskOptions
    },
    IMask.PIPE_TYPE.UNMASKED,
    IMask.PIPE_TYPE.MASKED
);

export const getCCNumberMaskType = (value: string): TypeMaskOption | undefined => {
    const len = ccNumberMaskOptions.length;

    for (let i = 0; i < len; i += 1) {
        const pattern = ccNumberMaskOptions[i].regex;
        // @ts-ignore
        const re = new RegExp(pattern);
        if (value.match(re) != null) {
            return ccNumberMaskOptions[i];
        }
    }
};
