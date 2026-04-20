import orderInfoSlice, {
  findOrderById
} from '../services/slice/order-info/order-info-slice';

const initialState = {
  order: null,
  isLoading: false,
  error: null
};

const order = {
  _id: '1',
  status: 'status 1',
  name: 'name 1',
  createdAt: 'now',
  updatedAt: 'now',
  number: 1,
  ingredients: ['ingr1', 'ingr2']
};

describe('Проверка слайса Order-Info', () => {
  describe('Проверка получения информации о заказе c Fullfiled', () => {
    test('Проверка findOrderById.fulfilled', () => {
      const actualState = orderInfoSlice(
        { ...initialState, isLoading: true },
        findOrderById.fulfilled({ orders: [order], success: true }, '', 1)
      );

      const expectedState = {
        order: order,
        isLoading: false,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения информации о заказе c Pending', () => {
    test('Проверка findOrderById.pending', () => {
      const actualState = orderInfoSlice(
        { ...initialState },
        findOrderById.pending('', 1)
      );

      const expectedState = {
        order: null,
        isLoading: true,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения информации о заказе c Rejected', () => {
    test('Проверка findOrderById.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = orderInfoSlice(
        { ...initialState, isLoading: true },
        findOrderById.rejected(error, '', 1)
      );

      const expectedState = {
        order: null,
        isLoading: false,
        error: 'Ошибка'
      };
      expect(actualState).toEqual(expectedState);
    });
  });
});
