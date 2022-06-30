import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// If user exists, grab from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// register function in global state
export const register = createAsyncThunk('auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log(error)
      console.log(error.config.data)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  })

// login function in global state
export const login = createAsyncThunk('auth/login',
  async (user, thunkAPI) => {
    console.log(user);
  })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer;