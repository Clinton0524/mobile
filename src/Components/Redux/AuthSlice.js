// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://newback-aold.onrender.com/api"; // Update if needed

// // ✅ Register User
// export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
//     try {
//         const { data } = await axios.post(`${API_URL}/auth/register`, userData);
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Registration failed");
//     }
// });

// // ✅ Login User
// export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
//     try {
//         const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
//         console.log("Login Response:", data); // 🔍 Debugging step
//         localStorage.setItem("token", data.token); // Store token
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
// });

// // ✅ Logout User
// export const logoutUser = createAsyncThunk("auth/logout", async () => {
//     localStorage.removeItem("token");
//     return null;
// });

// // ✅ Fetch Current User
// export const fetchCurrentUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
//     try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No token found");

//         const { data } = await axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
//         return data.user;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
//     }
// });

// const authSlice = createSlice({
//     name: "auth",
//     initialState: { user: null, token: localStorage.getItem("token") || null, status: "idle", error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.user = null;
//                 state.token = null;
//             })
//             .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//                 state.user = action.payload;
//             });
//     },
// });

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://newback-aold.onrender.com/api";

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Registration failed");
    }

    return data;
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk("auth/login",async (credentials, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Login failed");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

// ✅ Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue(console.log("No token found"));

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch user");
    }

    return data;
  }
);

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
