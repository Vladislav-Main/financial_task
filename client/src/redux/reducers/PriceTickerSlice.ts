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
      if (!!Object.values(JSON.parse(JSON.stringify(state.entities)))) {
        let previousState = Object.values(
          JSON.parse(JSON.stringify(state.entities))
        ) as PriceTicker[];
        let resultingPayload = action.payload.map((value: PriceTicker) => {
          if (previousState) {
            value.changeArrow = 0;
            value.changePercentArrow = 0;
            let before = previousState.find(
              (state: PriceTicker) => state.ticker === value.ticker
            );
            if (before) {
              value.changeArrow = before.change < value.change ? -1 : 1;
              value.changePercentArrow =
                before.change_percent < value.change_percent ? -1 : 1;
            }
          }
          return value;
        });
        priceTickerAdapter.setAll(state, resultingPayload);
      } else {
        priceTickerAdapter.setAll(state, action.payload);
      }
    },
  },
});

export const { fetchData } = priceTickerSlice.actions;
export default priceTickerSlice.reducer;
