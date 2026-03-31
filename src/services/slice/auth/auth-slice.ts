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
import { deleteCookie, setCookie } from '../../../../src/utils/cookie';

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
  async (data: { email: string; password: string }) => {
    const response = loginUserApi(data).then((response) => {
      if (response.accessToken && response.refreshToken) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    });
    return response;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('user/logout', async () => {
  logoutApi().then((response) => {
    if (response.success) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  });
});

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
  reducers: {},
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
      })
      .addCase(logout.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.authRequest = false;
      })
      .addCase(logout.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.authRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.isAuthChecked = true;
        state.authRequest = false;
      })
      .addCase(getUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
        state.isAuthChecked = false;
      });
  }
});

export default userSlice.reducer;
export const { getUserData, getIsAuthChecked, getAuthStatus } =
  userSlice.selectors;
