import { combineReducers, configureStore } from "@reduxjs/toolkit";
import priceTickerReducer from "./reducers/PriceTickerSlice";

const rootReducer = combineReducers({ priceTickerReducer });

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore;
