import authSlice, {
  getUser,
  loginUser,
  logout,
  registerUser,
  updateUser
} from 'src/services/slice/auth/auth-slice';
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
    });
  });

  describe('Проверка Update User c Fullfiled', () => {
    test('Проверка updateUser.fulfilled', () => {
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
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
    });
  });
  describe('Проверка Update User c Pending', () => {
    test('Проверка updateUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState
        },
        updateUser.pending('', { email: '', password: '' })
      );
    });
  });
  describe('Проверка Update User c Rejected', () => {
    test('Проверка updateUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        updateUser.rejected(error, '', { name: '', email: '', password: '' })
      );
    });
  });

  describe('Проверка Logout User c Fullfiled', () => {
    test('Проверка logoutUser.fulfilled', () => {
      let arg;
      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        logout.fulfilled(arg, '')
      );
    });
  });
  describe('Проверка Logout User c Pending', () => {
    test('Проверка logoutUser.pending', () => {
      const actualState = authSlice(
        {
          ...initialState
        },
        logout.pending('')
      );
    });
  });
  describe('Проверка Logout User c Rejected', () => {
    test('Проверка logoutUser.rejected', () => {
      const error = new Error('Ошибка');

      const actualState = authSlice(
        {
          ...initialState,
          authRequest: true
        },
        logout.rejected(error, '')
      );
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
    });
  });
});
