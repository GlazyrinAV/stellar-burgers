import authSlice, {
  getUser,
  loginUser,
  logout,
  registerUser,
  updateUser
} from '../services/slice/auth/auth-slice';
import store from '../services/store';
import { register } from 'module';

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  authError: null,
  authRequest: false
};

describe('Проверка слайса Auth', () => {
  describe('Проверка Login c Fullfiled', () => {
    test('Проверка loginUser.fulfilled', () => {
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        loginUser.fulfilled(
          {
            refreshToken: 'abc',
            accessToken: 'def',
            user: { name: 'AVG', email: 'AVG@mail.ru' },
            success: true
          },
          '',
          { email: '', password: '' }
        )
      );
      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: true,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: null,
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Login c Pending', () => {
    test('Проверка loginUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState
        },
        loginUser.pending('', { email: '', password: '' })
      );
      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        authError: null,
        authRequest: true
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Login c Rejected', () => {
    test('Проверка loginUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        loginUser.rejected(error, '', { email: '', password: '' })
      );

      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: false,
        data: null,
        authError: 'Ошибка',
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Проверка Register User c Fullfiled', () => {
    test('Проверка registerUser.fulfilled', () => {
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        registerUser.fulfilled(
          {
            refreshToken: 'abc',
            accessToken: 'def',
            user: { name: 'AVG', email: 'AVG@mail.ru' },
            success: true
          },
          '',
          { email: 'AVG@mail.ru', password: 'AVG@mail.ru', name: 'AVG' }
        )
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: null,
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Register User c Pending', () => {
    test('Проверка registerUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState
        },
        registerUser.pending('', { email: '', password: '', name: '' })
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        authError: null,
        authRequest: true
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Register User c Rejected', () => {
    test('Проверка registerUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        registerUser.rejected(error, '', { name: '', email: '', password: '' })
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        authError: 'Ошибка',
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Проверка Update User c Fullfiled', () => {
    test('Проверка updateUser.fulfilled', () => {
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true,
          data: { name: 'GVA', email: 'GVA@mail.ru' }
        },
        updateUser.fulfilled(
          {
            user: { name: 'AVG', email: 'AVG@mail.ru' },
            success: true
          },
          '',
          { email: '', password: '' }
        )
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: null,
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Update User c Pending', () => {
    test('Проверка updateUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState,
          data: { name: 'GVA', email: 'GVA@mail.ru' }
        },
        updateUser.pending('', { email: '', password: '' })
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: { name: 'GVA', email: 'GVA@mail.ru' },
        authError: null,
        authRequest: true
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Update User c Rejected', () => {
    test('Проверка updateUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true,
          data: { name: 'GVA', email: 'GVA@mail.ru' }
        },
        updateUser.rejected(error, '', { name: '', email: '', password: '' })
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: { name: 'GVA', email: 'GVA@mail.ru' },
        authError: 'Ошибка',
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Проверка Logout User c Fullfiled', () => {
    test('Проверка logoutUser.fulfilled', () => {
      let arg;
      const actualState = authSlice(
        {
          isAuthChecked: true,
          isAuthenticated: true,
          data: { name: 'AVG', email: 'AVG@mail.ru' },
          authError: null,
          authRequest: true
        },
        logout.fulfilled(arg, '')
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        authError: null,
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Logout User c Pending', () => {
    test('Проверка logoutUser.pending', () => {
      const actualState = authSlice(
        {
          isAuthChecked: true,
          isAuthenticated: true,
          data: { name: 'AVG', email: 'AVG@mail.ru' },
          authError: null,
          authRequest: false
        },
        logout.pending('')
      );

      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: true,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: null,
        authRequest: true
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка Logout User c Rejected', () => {
    test('Проверка logoutUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          isAuthChecked: true,
          isAuthenticated: true,
          data: { name: 'AVG', email: 'AVG@mail.ru' },
          authError: null,
          authRequest: true
        },
        logout.rejected(error, '')
      );

      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: true,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: 'Ошибка',
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Проверка получения User c Fullfiled', () => {
    test('Проверка getUser.fulfilled', () => {
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        getUser.fulfilled(
          {
            user: { name: 'AVG', email: 'AVG@mail.ru' },
            success: true
          },
          ''
        )
      );

      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: true,
        data: { name: 'AVG', email: 'AVG@mail.ru' },
        authError: null,
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения User c Pending', () => {
    test('Проверка getUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState
        },
        getUser.pending('')
      );

      const expectedState = {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        authError: null,
        authRequest: true
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка получения User c Rejected', () => {
    test('Проверка getUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        getUser.rejected(error, '')
      );

      const expectedState = {
        isAuthChecked: true,
        isAuthenticated: false,
        data: null,
        authError: 'Ошибка',
        authRequest: false
      };
      expect(actualState).toEqual(expectedState);
    });
  });
});
