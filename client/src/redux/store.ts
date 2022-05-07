import { combineReducers, configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import priceTickerReducer from './reducers/PriceTickerSlice';

const rootReducer = combineReducers({ priceTickerReducer });
const socket = io.bind('http://localhost:4000/');

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
