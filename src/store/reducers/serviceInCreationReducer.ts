import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";

const ServiceInCreationReducer = (
  state = INITIAL_STATE.serviceInCreation,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.CLEAR_SERVICE_IN_CREATION_DATA: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default ServiceInCreationReducer;
