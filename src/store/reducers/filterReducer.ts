import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "~store/initialStates";

const FilterReducer = (
  state = INITIAL_STATE.filters,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_FILTER_VALUE:
      return {
        ...state,
        [payload.filter]: payload.value,
      };
    case ACTION_TYPES.SET_FILTER_PROPS:
      return {
        ...state,
        ...payload,
      };
    case ACTION_TYPES.CLEAR_ALL_FILTER_PROPS: //will come back to this later
      return {
        ...state,
        //clear all filter props here...
      };
  }
};

export default FilterReducer;
