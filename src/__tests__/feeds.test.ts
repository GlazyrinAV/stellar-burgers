import feedsSlice, {
  fetchFeeds,
  fetchOrders
} from '../services/slice/feeds/feeds-slice';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const orders = [
  {
    _id: '1',
    status: 'status 1',
    name: 'name 1',
    createdAt: 'now',
    updatedAt: 'now',
    number: 1,
    ingredients: ['ingr1', 'ingr2']
  },
  {
    _id: '2',
    status: 'status 2',
    name: 'name 2',
    createdAt: 'now',
    updatedAt: 'now',
    number: 2,
    ingredients: ['ingr3', 'ingr4']
  }
];

describe('Проверка слайса Feeds', () => {
  describe('Проверка получения общих Feeds c Fullfiled', () => {
    test('Проверка fetchFeeds.fulfilled', () => {
      const actualState = feedsSlice(
        { ...initialState, isLoading: true },
        fetchFeeds.fulfilled(
          { orders: orders, total: 2, totalToday: 2, success: true },
          ''
        )
      );
      const expectedState = {
        orders: orders,
        total: 2,
        totalToday: 2,
        isLoading: false,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения общих Feeds c Pending', () => {
    test('Проверка fetchFeeds.pending', () => {
      const actualState = feedsSlice(
        { ...initialState },
        fetchFeeds.pending('')
      );
      const expectedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения общих Feeds c Rejected', () => {
    test('Проверка fetchFeeds.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = feedsSlice(
        { ...initialState, isLoading: true },
        fetchFeeds.rejected(error, '')
      );

      const expectedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'Ошибка'
      };
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Проверка получения Orders c Fullfiled', () => {
    test('Проверка fetchOrders.fulfilled', () => {
      const actualState = feedsSlice(
        { ...initialState, isLoading: true },
        fetchOrders.fulfilled(orders, '')
      );
      const expectedState = {
        orders: orders,
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения Orders c Pending', () => {
    test('Проверка fetchOrders.pending', () => {
      const actualState = feedsSlice(
        { ...initialState },
        fetchOrders.pending('')
      );
      const expectedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения Orders c Rejected', () => {
    test('Проверка fetchOrders.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = feedsSlice(
        { ...initialState, isLoading: true },
        fetchFeeds.rejected(error, '')
      );

      const expectedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'Ошибка'
      };
      expect(actualState).toEqual(expectedState);
    });
  });
});
