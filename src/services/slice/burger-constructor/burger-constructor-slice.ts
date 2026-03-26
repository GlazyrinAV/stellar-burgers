import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const constructorItemsInitialState: TConstructorItems = {
  bun: null,
  ingredients: []
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState: constructorItemsInitialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else if (
        action.payload.type === 'sauce' ||
        action.payload.type === 'main'
      ) {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<String>) {
      if (state.bun?.id === action.payload) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    clearConstructor(state) {
      state = constructorItemsInitialState;
    }
  },
  selectors: {
    getConstructorItems(state) {
      return state;
    }
  }
});

export default constructorItemsSlice.reducer;
export const { getConstructorItems } = constructorItemsSlice.selectors;
