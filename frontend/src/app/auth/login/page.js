// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
// } from "@/store/slices/authSlice";
// import { useRouter } from "next/navigation";
// import { login } from "@/services/authService";
// import AuthPoster from "@/app/components/authPoster";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Bounce } from "react-toastify";
// import Google from "../../../utils/oAuthGoogle";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Portal from "@/utils/portal";
// import PasswordRecovery from "@/app/components/passwordRecovery";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isOpenPasswordRecovery, setIsOpenPasswordRecovery] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // For button loading state
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
//   const theme = useSelector((state) => state.theme.mode);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     dispatch(loginStart());

//     try {
//       const userData = await login({ email, password });
//       dispatch(loginSuccess(userData));
//       localStorage.setItem("token", userData.token);
//       localStorage.setItem("userData", JSON.stringify(userData.user));

//       const message = userData?.message || "Welcome Again!";
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });

//       router.push("/home");
//     } catch (error) {
//       dispatch(loginFailure());
//       const message =
//         error?.response?.data?.message || error?.message || "Internal Error!";
//       toast.error(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     } finally {
//       setIsLoading(false); // Reset loading state after API call is complete
//     }
//   };

//   const handleNavigationRegister = () => {
//     router.push("/auth/register");
//   };

//   const openPasswordRecovery = () => {
//     setIsOpenPasswordRecovery(!isOpenPasswordRecovery);
//   };

//   const handleUserLogin = (userData) => {
//     console.log(userData);
//     localStorage.setItem("token", userData.token);
//     localStorage.setItem("userData", JSON.stringify(userData.user));
//   };

//   return (
//     <div
//       className="flex flex-col md:flex-row h-full"
//       style={{ overflow: "hidden", maxHeight: "100vh" }}
//     >
//       <div className="hidden md:flex w-full md:w-1/2 h-full">
//         <AuthPoster />
//       </div>

//       <div
//         className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-8"
//         style={{ overflowY: "auto", maxHeight: "100vh" }}
//       >
//         <div className="mb-8">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1Tt9_33HyVMm_ZakYQy-UgsLjE00biEArg&s"
//             alt="Logo"
//             className="w-16 h-auto mx-auto rounded-full"
//           />
//         </div>

//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Login</h1>
//           <p className="text-gray-600 mt-2">
//             Automate tasks and boost efficiency.
//           </p>
//         </div>

//         <form onSubmit={handleLogin} className="w-full max-w-md">
//           <div className="mb-6 relative">
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-6">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 px-4 bg-loginBtn-800 text-white  hover:bg-loginBtn-900 text-white font-semibold rounded-md  focus:outline-none disabled:bg-gray-300 transition-all"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="flex flex-col items-center justify-center w-full max-w-md mt-4 text-sm text-gray-500">
//           {isOpenPasswordRecovery && (
//             <Portal
//               close={openPasswordRecovery}
//               component={<PasswordRecovery />}
//             />
//           )}
//           <div
//             className="cursor-pointer hover:underline mb-2"
//             onClick={openPasswordRecovery}
//           >
//             Recover Password
//           </div>
//           <div className="cursor-pointer underline text-blue-600 hover:text-gray-500">
//             <div onClick={handleNavigationRegister}>Have no account yet?</div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <GoogleOAuthProvider clientId={clientId}>
//             <Google />
//           </GoogleOAuthProvider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import AuthPoster from "@/app/components/authPoster";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import Google from "../../../utils/oAuthGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GitHubLoginButton from "@/utils/oAuthgithub";
import Portal from "@/utils/portal";
import PasswordRecovery from "@/app/components/passwordRecovery";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenPasswordRecovery, setIsOpenPasswordRecovery] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For button loading state
  const dispatch = useDispatch();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const theme = useSelector((state) => state.theme.mode); // Dark/Light mode from Redux

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());

    try {
      const userData = await login({ email, password });
      dispatch(loginSuccess({token:userData.token, user:userData.user}));
      const message = userData?.message || "Welcome Again!";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        transition: Bounce,
      });

      router.push("/home");
    } catch (error) {
      dispatch(loginFailure());
      const message =
        error?.response?.data?.message || error?.message || "Internal Error!";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        transition: Bounce,
      });
    } finally {
      setIsLoading(false); // Reset loading state after API call is complete
    }
  };

  const handleNavigationRegister = () => {
    router.push("/auth/register");
  };

  const openPasswordRecovery = () => {
    setIsOpenPasswordRecovery(!isOpenPasswordRecovery);
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-full ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
      style={{ overflow: "hidden", maxHeight: "100vh" }}
    >
      <div className="hidden md:flex w-full md:w-1/2 h-full">
        <AuthPoster />
      </div>

      <div
        className={`w-full md:w-1/2 flex flex-col items-center justify-center ${
          theme === "dark" ? "bg-gray-50" : "bg-gray-50"
        } p-8`}
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1Tt9_33HyVMm_ZakYQy-UgsLjE00biEArg&s"
            alt="Logo"
            className="w-16 h-auto mx-auto rounded-full"
          />
        </div>

        <div className="text-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-gray-800" : "text-gray-800"
            }`}
          >
            Login
          </h1>
          <p className={`mt-2 ${theme === "dark" ? "text-gray-600" : "text-gray-600"}`}>
            Automate tasks and boost efficiency.
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-6 relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={`w-full p-3 rounded-lg border ${
                theme === "dark"
                  ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
                  : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
              } focus:outline-none focus:ring-1`}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`w-full p-3 rounded-lg border ${
                theme === "dark"
                  ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
                  : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
              } focus:outline-none focus:ring-1`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 ${
              isLoading
                ? "bg-gray-300"
                : theme === "dark"
                ? "bg-loginBtn-800 hover:bg-loginBtn-900"
                : "bg-loginBtn-800 hover:bg-loginBtn-900"
            } text-white font-semibold rounded-md transition-all focus:outline-none`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col items-center justify-center w-full max-w-md mt-4 text-sm">
          {isOpenPasswordRecovery && (
            <Portal
              close={openPasswordRecovery}
              component={<PasswordRecovery />}
            />
          )}
          <div
            className={`cursor-pointer hover:underline mb-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
            onClick={openPasswordRecovery}
          >
            Recover Password
          </div>
          <div className="cursor-pointer underline text-blue-600 hover:text-gray-500">
            <div onClick={handleNavigationRegister}>Have no account yet?</div>
          </div>
        </div>

        <div className="mt-6">
          <GoogleOAuthProvider clientId={clientId}>
            <Google />
          </GoogleOAuthProvider>
        </div>
        <div className="mt-6">
          <GitHubLoginButton/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
