import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { PriceTicker } from "../../types/types";
import { RootState } from "../store";

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

const priceTickerSlice = createSlice({
  name: "priceTicker",
  initialState: priceTickerAdapter.getInitialState(),
  reducers: {
    fetchData(state, action: PayloadAction<PriceTicker[]>) {
      priceTickerAdapter.setAll(state, action.payload);
    },
  },
});

export const { fetchData } = priceTickerSlice.actions;
export default priceTickerSlice.reducer;
