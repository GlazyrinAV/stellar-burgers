import orderBurgerSlice, {
  makeOrder
} from '../services/slice/order-burger/order-burger-slice';

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
  ingredients: [],
  owner: {
    name: 'avg',
    email: 'avg@avg.ru',
    createdAt: 'now',
    updatedAt: 'now'
  },
  price: 100
};

describe('Проверка слайса Order-Burger', () => {
  describe('Проверка отправки заказа c Fullfiled', () => {
    test('Проверка makeOrder.fulfilled', () => {
      const actualState = orderBurgerSlice(
        { ...initialState, isLoading: true },
        makeOrder.fulfilled(
          { order: { ...order }, name: 'name', success: true },
          '',
          []
        )
      );

      const expectedState = {
        order: order,
        isLoading: false,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка отправки заказа c Pending', () => {
    test('Проверка makeOrder.pending', () => {
      const actualState = orderBurgerSlice(
        { ...initialState },
        makeOrder.pending('', [])
      );

      const expectedState = {
        order: null,
        isLoading: true,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка отправки заказа c Rejected', () => {
    test('Проверка makeOrder.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = orderBurgerSlice(
        { ...initialState, isLoading: true },
        makeOrder.rejected(error, '', [])
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
