import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const findOrderById = createAsyncThunk(
  'order/findById',
  async (id: number) => getOrderByNumberApi(id)
);

type TOrderInfoState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  order: null,
  isLoading: false,
  error: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderById(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOrderById.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(findOrderById.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(findOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default orderInfoSlice.reducer;
export const { getOrderById } = orderInfoSlice.selectors;
