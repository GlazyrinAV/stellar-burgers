import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slice/ingredients/ingredients-slice';
import { constructorItemsSlice } from './slice/burger-constructor/burger-constructor-slice';
import { feedsSlice } from './slice/feeds/feeds-slice';
import { orderBurgerSlice } from './slice/order-burger/order-burger-slice';
import { userSlice } from './slice/auth/auth-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorItemsSlice,
  feedsSlice,
  orderBurgerSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
