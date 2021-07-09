import { combineReducers } from 'redux';

import hotelsReducer from './hotels/reducers';
import cartReducer from './cart/reducers';

const createGlobalReducer = combineReducers({
    hotels: hotelsReducer,
    cart: cartReducer
    // NOTE: other app reducers go here
});

export default createGlobalReducer;
