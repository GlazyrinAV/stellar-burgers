import store from '../services/store';
import * as api from '../utils/burger-api';
import ingredientsSlice, {
  fetchIngredients
} from '../services/slice/ingredients/ingredients-slice';

const ingredientsInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

const ingredients = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '3',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

describe('Проверка слайса Ingredients', () => {
  describe('Проверка получения Ingredients c Fullfiled', () => {
    test('Проверка fetchIngredients.fulfilled', () => {
      const actualState = ingredientsSlice(
        { ...ingredientsInitialState, isIngredientsLoading: true },
        fetchIngredients.fulfilled(ingredients, '')
      );
      const expectedState = {
        ingredients: ingredients,
        isIngredientsLoading: false,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения Ingredients c Pending', () => {
    test('Проверка fetchIngredients.pending', () => {
      const actualState = ingredientsSlice(
        { ...ingredientsInitialState, isIngredientsLoading: false },
        fetchIngredients.pending('')
      );
      const expectedState = {
        ingredients: [],
        isIngredientsLoading: true,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения Ingredients c Rejected', () => {
    test('Проверка fetchIngredients.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = ingredientsSlice(
        { ...ingredientsInitialState, isIngredientsLoading: true },
        fetchIngredients.rejected(error, '')
      );
      const expectedState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: 'Ошибка'
      };
      expect(actualState).toEqual(expectedState);
    });
  });
});
