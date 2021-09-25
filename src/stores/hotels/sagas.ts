import { put } from 'redux-saga/effects';

import { setHotels, fetchHotelsFailed } from './actions';
import api from 'lib/scripts/apis';
import { logger, handleCatchedError } from 'lib/scripts/utils';

export function* getHotelsSaga(): any {
    logger.debug('[saga]', 'getHotelsSaga');

    try {
        const names = yield api.getHotels();
        const details = yield api.getHotelsDetails();
        yield put(setHotels({ names, details }));
    } catch (error) {
        yield put(handleCatchedError(fetchHotelsFailed)(error));
    }
}
