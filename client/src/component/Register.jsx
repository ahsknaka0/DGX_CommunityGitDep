/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { images } from "../constant/index.js";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword } from "../utils/formValidation.js";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import ApiContext from '../context/ApiContext.jsx';
import { decrypt } from "../utils/decrypt.js";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const { fetchData } = useContext(ApiContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [referCode, setReferCode] = useState('');



  const urlExtract = async () => {
    const params = new URLSearchParams(location.search);
    const encryptedEmail = params.get('email');
    const encryptedReferCode = params.get('refercode');

    if (encryptedEmail && encryptedReferCode) {
      const decryptedEmail = await decrypt(encryptedEmail);
      const decryptedReferCode = await decrypt(encryptedReferCode);

      if (decryptedEmail && decryptedReferCode) {
        setEmail(decryptedEmail);
        // console.log(email)
        // console.log(decryptedEmail)
        setReferCode(decryptedReferCode);
        // console.log(referCode)
        // console.log(decryptedReferCode)
      } else {
        navigate('/404');
      }
    } else {
      navigate('/404');
    }
  }
  useEffect(() => {
    urlExtract()
  }, [location, navigate])

  const [formData, setFormData] = useState({
    username: "",
    collegeName: "",
    contactNumber: "",
    designation: "",
    category: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [messages, setMessages] = useState({
    number: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    length: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);

  }

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "newPassword") {
      const inputValue = value;
      const passwordInput = document.getElementById(id);
      validatePassword(passwordInput, inputValue);
    }
    // if (name === "email") {
    //   const emailInput = document.getElementById(id);
    //   validateEmail(emailInput, value);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword,
      confirmPassword,
      username,
      collegeName,
      contactNumber,
      designation,
      category,
    } = formData;


    if (Object.values(messages).some((message) => message)) {
      toast.error("Password does not meet the required criteria.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Add further form submission logic here (e.g., API call)

    const endpoint = "user/registration";
    const method = "POST"
    const body = {
      "inviteCode": referCode,
      "name": username,
      "email": email,
      "collegeName": collegeName,
      "password": newPassword,
      "phoneNumber": contactNumber,
      "category": category,
      "designation": designation
    }

    setLoading(true)

    try {

      const data = await fetchData(endpoint, method, body);

      if (!data.success) {
        setLoading(false)
        toast.error("Error in Registration", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return
      } else if (data.success) {
        setLoading(false)
        toast.success("Registration done successfully go login", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/SignInn');
        }, 3500);
      }
    } catch (error) {
      setLoading(false)
      toast.error(`Something went wrong try again`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }

  };

  return (
    loading ? <h1>loading ....</h1> : <div className="my-8">
      <ToastContainer />
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-2xl border border-DGXgreen dark:bg-gray-800">
        <h1 className="text-xl font-bold text-white capitalize text-center dark:text-white">
          Welcome to the <span className="text-DGXgreen">DGX Community</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 sm:grid-cols-2">
            <div className="">
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="collegeName"
                >
                  College Name
                </label>
                <input
                  id="collegeName"
                  name="collegeName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.collegeName}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="flex justify-center items-center order-first md:order-none">
              <img src={images.robo} className="w-28" alt="robot" />
            </div>

            <div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="designation"
                >
                  Designation
                </label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 relative">
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="newPassword"
                >
                  Create Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"

                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={passwordVisible ? "text" : "password"}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-DGXgreen focus:outline-none mt-8">
                  {passwordVisible ? <FaEye />
                    : <FaEyeLowVision />}

                </button>


              </div>
              <div id="passwordVerify"></div>
            </div>

            <div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Id
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={email}
                  readOnly
                // onChange={handleChange}
                />
                <div id="emailVerify"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row mb-4 space-x-2">
                  <div className="w-1/2">
                    <label className="text-white dark:text-gray-200" htmlFor="category">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="category1">Select a category</option>
                      <option value="S">Student</option>
                      <option value="F">Faculty</option>
                      =
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="text-white dark:text-gray-200" htmlFor="refralCode">
                      Refral Code
                    </label>
                    <input
                      id="refralCode"
                      name="refralCode"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={referCode}
                      // onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-DGXgray bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-DGXgreen focus:outline-none mt-8">
                  {confirmPasswordVisible ? <FaEye />
                    : <FaEyeLowVision />}

                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none bg-DGXgreen focus:bg-gray-600"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register