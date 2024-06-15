import { useAppDispatch, useAppSelector } from "./useTypedRedux";
import {
  clearAllFilterProps as _clearAllFilterProps,
  setFilterProps as _setFilterProps,
  setFilterValue as _setFilterValue,
} from "../actions/filterActions";
import { Filters } from "~src/@types/types";

export const useFilter = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state: { filters: any }) => state.filters);

  const setFilterValue = (payload: { filter: string; value: any }) => {
    dispatch(_setFilterValue(payload));
  };

  const setFilterProps = (payload: { [key: string]: any }) => {
    dispatch(_setFilterProps(payload));
  };

  const clearAllFilterProps = () => {
    dispatch(_clearAllFilterProps);
  };

  return {
    filters,
    setFilterValue,
    setFilterProps,
    clearAllFilterProps,
  };
};
