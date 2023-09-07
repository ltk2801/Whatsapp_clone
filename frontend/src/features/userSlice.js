import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    access_token: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values,
      });
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
        ...values,
      });
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        access_token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        // vì ở trên đã trả về message
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        // vì ở trên đã trả về message
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;

export default userSlice.reducer;
