import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const TFeedsInitialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feed',
  initialState: TFeedsInitialState,
  reducers: {},
  selectors: {
    getFeeds(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default feedsSlice.reducer;
export const { getFeeds } = feedsSlice.selectors;
