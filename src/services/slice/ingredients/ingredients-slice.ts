import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  error: string | null;
};

const ingredientsInitialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  reducers: {},
  selectors: {
    getIngredients(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isIngredientsLoading = false;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      });
  }
});

export default ingredientsSlice.reducer;
export const { getIngredients } = ingredientsSlice.selectors;
