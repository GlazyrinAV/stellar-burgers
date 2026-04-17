import store from '../services/store';
import * as api from '../utils/burger-api';
import { fetchIngredients } from '../services/slice/ingredients/ingredients-slice';

describe('Проверка слайса Ingredients', () => {
  describe('Проверка получения Ingredients c Fullfiled', () => {
    test('Проверка fetchIngredients.fulfilled', () => {});
  });
  describe('Проверка получения Ingredients c Pending', () => {
    test('Проверка fetchIngredients.pending', () => {});
  });
  describe('Проверка получения Ingredients c Rejected', () => {
    test('Проверка fetchIngredients.rejected', () => {
      const error = new Error('Ошибка');
    });
  });
});
