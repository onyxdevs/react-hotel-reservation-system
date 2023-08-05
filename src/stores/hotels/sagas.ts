import { put } from "redux-saga/effects";

import { setHotels, fetchHotelsFailed } from "./actions";
import { handleCatchedError, logger } from "../../lib/scripts/utils";
import apis from "../../apis";
// import api from 'apis';
// import { logger, handleCatchedError } from 'lib/scripts/utils';

export function* getHotelsSaga(): any {
  logger.debug("[saga]", "getHotelsSaga");

  try {
    const names = yield apis.getHotels();
    const details = yield apis.getHotelsDetails();
    yield put(setHotels({ names, details }));
  } catch (error) {
    yield put(handleCatchedError(fetchHotelsFailed)(error));
  }
}
