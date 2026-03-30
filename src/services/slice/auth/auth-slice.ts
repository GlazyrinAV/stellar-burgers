import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  deleteCookie,
  getCookie,
  setCookie
} from '../../../../src/utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  authError: string | null;
  authRequest: boolean;
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { email: string; name: string; password: string }) =>
    registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { email: string; password: string }) => loginUserApi(data)
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  authError: null,
  authRequest: false
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authChecked(state) {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserData(state) {
      return state.data;
    },
    getIsAuthChecked(state) {
      return state.isAuthChecked;
    },
    getAuthStatus(state) {
      return {
        authError: state.authError,
        authRequest: state.authRequest,
        isAuthChecked: state.isAuthChecked,
        IsAuthenticated: state.isAuthenticated
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.authRequest = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.authRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.authRequest = false;
        state.authError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.authRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.authRequest = false;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.authRequest = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.authRequest = false;
        state.authError = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.authRequest = false;
      })
      .addCase(logout.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      });
  }
});

export default userSlice.reducer;
export const { getUserData, getIsAuthChecked, getAuthStatus } =
  userSlice.selectors;
export const { authChecked } = userSlice.actions;
