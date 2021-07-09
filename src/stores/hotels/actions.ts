import { logger } from 'lib/scripts/utils';
import { SET_HOTELS, FETCH_HOTELS, FETCH_HOTELS_FAILED } from './constants';

export const setHotels = (resData: { names: TypeHotel[]; details: TypeHotelDetails[] }) => {
    logger.debug('[actions]', 'setHotels', resData);

    return {
        type: SET_HOTELS,
        data: resData
    };
};

export const getHotels = () => {
    logger.debug('[actions]', 'getHotels');

    return {
        type: FETCH_HOTELS
    };
};

export const fetchHotelsFailed = (error: string) => {
    logger.debug('[actions]', 'fetchHotelsFailed');

    return {
        type: FETCH_HOTELS_FAILED,
        error
    };
};
