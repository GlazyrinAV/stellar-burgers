import store from '../services/store';

describe('Проверка правильной инициализации rootReducer', () => {
  test('rootReducer должен быть инициилизирован', () => {
    const expectedState = {
      auth: {
        authError: null,
        authRequest: false,
        data: null,
        isAuthChecked: false,
        isAuthenticated: false
      },
      constructorItems: {
        bun: null,
        ingredients: []
      },
      feed: {
        error: null,
        isLoading: false,
        orders: [],
        total: 0,
        totalToday: 0
      },
      ingredients: {
        error: null,
        ingredients: [],
        isIngredientsLoading: false
      },
      orderBurger: {
        error: null,
        isLoading: false,
        order: null
      },
      orderInfo: {
        error: null,
        isLoading: false,
        order: null
      }
    };

    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(expectedState);
  });
});
