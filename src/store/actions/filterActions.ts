import ACTION_TYPES from "~store/actionTypes";

export const setFilterValue = ({
  filter,
  value,
}: {
  filter: string;
  value: any;
}) => {
  return {
    type: ACTION_TYPES.SET_FILTER_VALUE,
    payload: { filter, value },
  };
};

export const setFilterProps = (filterValuePairs: { [x: string]: any }) => {
  return {
    type: ACTION_TYPES.SET_FILTER_PROPS,
    payload: filterValuePairs,
  };
};

export const clearAllFilterProps = () => {
  return {
    type: ACTION_TYPES.CLEAR_ALL_FILTER_PROPS,
    payload: null,
  };
};
