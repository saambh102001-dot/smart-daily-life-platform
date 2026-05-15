import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const API_URL = ENV.SERVER_URL;

const initialState = {
  user: {},
  value:[],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//Thunk for Register a new user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    const response = await axios.post(`${API_URL}/registerUser`, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  }
);

//  Thunk for Login
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  } catch (error) {
    alert("Invalid credentials");
    throw new Error("Invalid credentials");
  }
});

//  Thunk for logout
export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post(`${API_URL}/logout`);
});


// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.value.find((u) => u.email === action.payload.email);
      if (user) {
        user.name = action.payload.name;
        user.password = action.payload.password;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {};
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
