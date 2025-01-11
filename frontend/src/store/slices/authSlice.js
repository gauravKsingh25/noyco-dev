// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   user: null,
// //   isAuthenticated: false,
// //   loading: false,
// //   error: null,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     // Register actions
// //     registerStart: (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     registerSuccess: (state, action) => {
// //       state.user = action.payload;
// //       state.isAuthenticated = true;
// //       state.loading = false;
// //     },
// //     registerFailure: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },

// //     // Login actions
// //     loginStart: (state) => {
// //       state.loading = true;
// //     },
// //     loginSuccess: (state, action) => {
// //       state.loading = false;
// //       state.isAuthenticated = true;
// //       state.user = action.payload;
// //     },
// //     loginFailure: (state) => {
// //       state.loading = false;
// //       state.isAuthenticated = false;
// //       state.error = "Login failed";
// //     },

// //     // Logout action
// //     logout: (state) => {
// //       state.user = null;
// //       state.isAuthenticated = false;
// //     },
// //   },
// // });

// // export const {
// //   registerStart,
// //   registerSuccess,
// //   registerFailure,
// //   loginStart,
// //   loginSuccess,
// //   loginFailure,
// //   logout,
// // } = authSlice.actions;
// // export default authSlice.reducer;

// "use client";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("userData")) || null,
//   token: localStorage.getItem("token") || null,
//   isAuthenticated: !!localStorage.getItem("token"),
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Register actions
//     registerStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     registerSuccess: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },
//     registerFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // Login actions
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       const { user, token } = action.payload;

//       // Save token and user data to local storage
//       localStorage.setItem("userData", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = user;
//       state.token = token;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.error = action.payload || "Login failed";
//     },

//     // Logout action
//     logout: (state) => {
//       // Clear local storage
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");

//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const {
//   registerStart,
//   registerSuccess,
//   registerFailure,
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
// } = authSlice.actions;

// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    // This code runs only in the browser
    return {
      user: JSON.parse(localStorage.getItem("userData")) || null,
      token: localStorage.getItem("token") || null,
      isAuthenticated: !!localStorage.getItem("token"),
      loading: false,
      error: null,
    };
  }

  // Default state for server-side rendering
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Register actions
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      // Save token and user data to local storage in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("token", token);
      }

      state.loading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Login failed";
    },

    // Logout action
    logout: (state) => {
      // Clear local storage in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
