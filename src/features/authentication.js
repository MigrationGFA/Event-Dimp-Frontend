import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/authApis";
import axios from "axios";

// Initial state for authentication
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

// creator login
export const creatorLogin = createAsyncThunk(
  "auth/creatorLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.creatorLogin({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// creator register
export const creatorRegister = createAsyncThunk(
  "auth/creatorRegister",
  async (
    {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      role,
      refCode,
      organizationName,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.creatorRegister({
        fullName,
        email,
        password,
        phoneNumber,
        gender,
        dateOfBirth,
        role,
        refCode,
        organizationName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//affliate login
export const affiliateLogin = createAsyncThunk(
  "afiliate/login",
  async ({ email, password }, { rejectWithValue }) => {
    // Make an API request to login the user with Axios
    try {
      const response = await api.affiliateLogin({
        email,
        password,
      });
      if (response.status === 200) {
        const user = response.data;
        return user;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);



export const emailLogin = createAsyncThunk(
  "auth/emailLogin",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.emailLogin({
        email,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // creator auth
      .addCase(creatorLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(creatorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(emailLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emailLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(creatorRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatorRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(creatorRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // handle afiliate login
      .addCase(affiliateLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(affiliateLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(affiliateLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
