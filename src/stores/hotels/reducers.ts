import { logger } from "../../lib/scripts/utils";
import { SET_HOTELS, FETCH_HOTELS_FAILED } from "./constants";

type TypeHotelsReducerAction = {
  type: string;
  data: {
    names: TypeHotel[];
    details: TypeHotelDetails[];
  };
  error: string;
};

const hotelsInitialState = {
  data: {
    names: [],
    details: [],
  },
  status: "pending",
  error: "",
};

const hotelsReducer = (
  state: object = hotelsInitialState,
  action: TypeHotelsReducerAction
) => {
  logger.debug("[reducer]", "reducer", "hotelsReducer", action);

  switch (action.type) {
    case SET_HOTELS:
      return {
        ...state,
        data: {
          names: action.data.names,
          details: action.data.details,
        },
        status: "resolved",
        error: "",
      };

    case FETCH_HOTELS_FAILED:
      return {
        ...state,
        data: {
          names: [],
          details: [],
        },
        status: "rejected",
        error: action.error,
      };

    default:
      return state;
  }
};

export default hotelsReducer;
