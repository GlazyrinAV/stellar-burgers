import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorItemsState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const constructorItemsInitialState: TConstructorItemsState = {
  bun: null,
  ingredients: []
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState: constructorItemsInitialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else if (
          action.payload.type === 'sauce' ||
          action.payload.type === 'main'
        ) {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    moveDown(state, action: PayloadAction<number>) {
      const currentIndex = action.payload;
      const targetIndex = action.payload + 1;
      console.log(currentIndex);
      console.log(targetIndex);
      if (currentIndex >= 0 && currentIndex < state.ingredients.length) {
        const currentIngredient = state.ingredients[currentIndex];
        const targetIngredient = state.ingredients[targetIndex];
        state.ingredients.splice(
          currentIndex,
          2,
          targetIngredient,
          currentIngredient
        );
      }
    },
    moveUp(state, action: PayloadAction<number>) {
      const currentIndex = action.payload - 1;
      const targetIndex = action.payload;
      if (currentIndex >= 0 && currentIndex < state.ingredients.length - 1) {
        const currentIngredient = state.ingredients[currentIndex];
        const targetIngredient = state.ingredients[targetIndex];
        state.ingredients.splice(
          currentIndex,
          2,
          targetIngredient,
          currentIngredient
        );
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
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems(state) {
      return state;
    }
  }
});

export default constructorItemsSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveDown,
  moveUp,
  clearConstructor
} = constructorItemsSlice.actions;
export const { getConstructorItems } = constructorItemsSlice.selectors;
