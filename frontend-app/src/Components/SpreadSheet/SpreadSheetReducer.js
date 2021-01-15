import { TYPES } from './Types';

export const initialState = {
  results: [],
  isFetching: false,
  error: null,
  pageNo: 1,
};

export const recordsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.FETCH_RECORDS: {
      return { ...state, isFetching: true, error: null, pageNo: state.pageNo + 1 };
    }
    case TYPES.FETCH_RECORDS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        results: [...state.results, ...action.results],
      };
    }
    case TYPES.FETCH_RECORDS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
