import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../constant/index.js';
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';



const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFocus = (event) => {
    const { id } = event.target;
    if (id === 'username') setUsernameFocus(true);
    if (id === 'password') setPasswordFocus(true);
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    if (id === 'username' && !value) setUsernameFocus(false);
    if (id === 'password' && !value) setPasswordFocus(false);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'username') setUserID(value);
    if (id === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate authentication
    const BaseUrl = import.meta.env.VITE_API_BASEURL
    const endPoint = "user/login";

    // const headers = { "Content-Type": "application/json" };
    const postdata = {
      "email": userID,
      "password": password
    }

    setLoading(true)
    const response = await fetch(`${BaseUrl}/${endPoint}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(postdata) // body data type must match "Content-Type" header
    });
    const data = await response.json()
    if (!data.success) {
      setLoading(false)
      toast.error("Error in Registration", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (data.success) {
      Cookies.set('userToken', JSON.stringify(data.authtoken), { expires: 7 });
      setLoading(false)
      if (!data.flag) {
        toast.success("Welcome for first time Please change your password", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/ChangePassword');
        }, 1500);
      } else {
        toast.success("Welcome to DGX Community", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }

  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    loading ? <h1>loading...</h1> :
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative">
        <ToastContainer />
        {/* Background image for large screens */}
        <div className="lg:w-3/4 hidden lg:flex justify-start items-center p-4 lg:pl-40">
          <img
            src={images.secure}
            alt="Background"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        {/* Sign in form container */}
        <div className="w-full lg:w-1/2 h-screen flex lg:rounded-l-full justify-center items-center bg-DGXblue">
          <div className="w-full max-w-sm lg:max-w-lg lg:flex pb-16 top-16 lg:top-auto left-1/2 transform -translate-x">
            <div className="w-full max-w-100 p-4 rounded-lg shadow-md bg-DGXwhite border-2 border-DGXgreen drop-shadow-2xl">
              <div className='text-center text-6xl mb-2 text-DGXgreen font-black p-4 pb-10'>Sign In</div>
              <div className="flex justify-center items-center mb-4">
                <img src={images.robot} alt="Logo" className="logo-image" />
              </div>
              <h1 className="text-center text-2xl mb-2 pb-10">Welcome to <span className="text-DGXgreen font-black">DGX Community</span></h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <label
                    htmlFor="username"
                    className={`absolute opacity-60 left-4 transition-all duration-300 ${usernameFocus ? 'top-0 text-xs text-DGXgreen' : 'top-1/2 transform -translate-y-1/2'}`}
                  >
                    Username or email address
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="w-full px-4 py-2 border border-DGXgreen rounded-md focus:outline-none focus:border-DGXgreen"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    value={userID}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`absolute opacity-60 left-4 transition-all duration-300 ${passwordFocus ? 'top-0 text-xs text-DGXgreen' : 'top-1/2 transform -translate-y-1/2'}`}
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    className="w-full px-4 py-2 border border-DGXgreen rounded-md focus:outline-none focus:border-DGXgreen"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    value={password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-DGXgreen focus:outline-none"
                  >
                    {passwordVisible ? <FaEye />
                      : <FaEyeLowVision />}

                  </button>
                </div>
                <div className="text-right mb-4">
                  <Link to="/ForgotPassword" className="text-DGXgreen font-bold">Forgot Password?</Link>
                </div>
                <button type="submit" className="w-full py-2 bg-DGXgreen text-DGXwhite text-white rounded-md text-lg focus:outline-none hover:bg-DGXblue">Sign in</button>
              </form>
              <div className="text-center mt-4 py-4">
                Signing in for the first time? <Link to="/VerifyEmail" className="text-DGXgreen font-semibold">Verify here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
