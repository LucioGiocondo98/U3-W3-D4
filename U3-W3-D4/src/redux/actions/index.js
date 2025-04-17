export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const FETCH_JOBS = "FETCH_JOBS";
export const FETCH_JOBS_ERROR = "FETCH_JOBS_ERROR";

export const addtoFavourite = (companyName) => ({
  type: ADD_TO_FAVOURITE,
  payload: companyName,
});

export const removeFromFavourite = (companyName) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: companyName,
});

export const fetchJobs = (query) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}&limit=20`
      );
      if (resp.ok) {
        const { data } = await resp.json();
        dispatch({
          type: FETCH_JOBS,
          payload: data,
        });
      } else {
        throw new Error("Errore nella fetch");
      }
    } catch (error) {
      dispatch({
        type: FETCH_JOBS_ERROR,
        payload: error.message,
      });
    }
  };
};
