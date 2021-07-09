import { connect } from 'react-redux';

import * as actions from 'stores/hotels/actions';

const mapState = (state: TypeAppProps) => ({
    data: state.hotels.data,
    status: state.hotels.status,
    error: state.hotels.error
});

const mapDispatch = {
    onInitReservationForm: () => actions.getHotels()
};

const connector = connect(mapState, mapDispatch);

export default connector;
