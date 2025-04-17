import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "../reducers";
import { researchReducer } from "../reducers/research";

const store = configureStore({
  reducer: {
    favourites: favouriteReducer,
    research: researchReducer,
  },
});

export default store;
