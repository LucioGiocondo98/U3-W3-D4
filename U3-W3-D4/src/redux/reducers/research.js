import { FETCH_JOBS, FETCH_JOBS_ERROR } from "../actions";

const initialState = {
  results: [],
  isLoading: true,
  error: null,
};

export const researchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_JOBS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
