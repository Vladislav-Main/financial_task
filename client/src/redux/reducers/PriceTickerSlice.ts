import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PriceTicker } from '../../types/types';
import { RootState } from '../store';
import { fetchPriceTicker } from './AsyncThunk';

const priceTickerAdapter = createEntityAdapter<PriceTicker>({
  selectId: (priceTicker) => priceTicker.ticker,
});

export const {
  selectAll: selectAllEntities,
  selectById: selectEntityById,
  selectIds: selectEntityIds,
} = priceTickerAdapter.getSelectors<RootState>(
  (state) => state.priceTickerReducer
);

export const priceTickerSlice = createSlice({
  name: 'priceTicker',
  initialState: priceTickerAdapter.getInitialState({
    status: '',
    isLoading: false,
    error: '',
    priceTicker: [],
  }),
  reducers: {
    setSearchTerm(state, action: PayloadAction<PriceTicker[]>) {
      //state.priceTicker = action.payload.JSONStringify();
    },
  },
  extraReducers: {
    [fetchPriceTicker.pending.type]: (state) => {
      state.isLoading = true;
      state.status = 'loading';
    },
    [fetchPriceTicker.fulfilled.type]: (
      state,
      action: PayloadAction<PriceTicker[]>
    ) => {
      priceTickerAdapter.setAll(state, action.payload);
      state.isLoading = false;
      state.error = '';
      state.status = 'success';
    },
    [fetchPriceTicker.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default priceTickerSlice.reducer;
