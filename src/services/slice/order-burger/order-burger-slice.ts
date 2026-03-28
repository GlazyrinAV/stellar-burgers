import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'order/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const orderInitialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState: orderInitialState,
  reducers: {
    resetOrder(state) {
      state.order = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  selectors: {
    getNewOrder(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = { ...action.payload.order, ingredients: [] };
      })
      .addCase(makeOrder.rejected, (state, action) => {
        (state.error = action.error.message as string),
          (state.isLoading = false);
      })
      .addCase(makeOrder.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      });
  }
});

export default orderBurgerSlice.reducer;
export const { getNewOrder } = orderBurgerSlice.selectors;
export const { resetOrder } = orderBurgerSlice.actions;
