import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TConstructorItemsState = {
  constructorItems: TConstructorItems;
  counter: string;
};

const constructorItemsInitialState: TConstructorItemsState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  counter: '0'
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState: constructorItemsInitialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient: TConstructorIngredient = {
        ...action.payload,
        id: state.counter
      };
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else if (ingredient.type === 'sauce' || ingredient.type === 'main') {
        state.constructorItems.ingredients.push(ingredient);
      }
      state.counter = String(parseInt(state.counter) + 1);
    },
    moveDown(state, action: PayloadAction<number>) {
      const currentIndex = action.payload;
      const targetIndex = action.payload + 1;
      console.log(currentIndex);
      console.log(targetIndex);
      if (
        currentIndex >= 0 &&
        currentIndex < state.constructorItems.ingredients.length
      ) {
        const currentIngredient =
          state.constructorItems.ingredients[currentIndex];
        const targetIngredient =
          state.constructorItems.ingredients[targetIndex];
        state.constructorItems.ingredients.splice(
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
      if (
        currentIndex >= 0 &&
        currentIndex < state.constructorItems.ingredients.length - 1
      ) {
        const currentIngredient =
          state.constructorItems.ingredients[currentIndex];
        const targetIngredient =
          state.constructorItems.ingredients[targetIndex];
        state.constructorItems.ingredients.splice(
          currentIndex,
          2,
          targetIngredient,
          currentIngredient
        );
      }
    },
    removeIngredient(state, action: PayloadAction<String>) {
      if (state.constructorItems.bun?.id === action.payload) {
        state.constructorItems.bun = null;
      } else {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
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
      return state.constructorItems;
    }
  }
});

export default constructorItemsSlice.reducer;
export const { addIngredient, removeIngredient, moveDown, moveUp } =
  constructorItemsSlice.actions;
export const { getConstructorItems } = constructorItemsSlice.selectors;
