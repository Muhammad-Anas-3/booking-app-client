import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/map.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { dispatch, loading, error } = useContext(AuthContext);

  console.log(loading)

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch({ type: "SIGNUP_START" });
    try {
      const res = await axios.post(
        "https://booking-app-backend-khaki.vercel.app/api/v1/auth/register",
        credentials
      );
      dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", payload: error.message });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white p-8 rounded shadow-xl sm:w-96 m-2">
        <h2 className="text-[20px] mb-4 font-semibold">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="userName"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 flex items-center">
          <p className="text-gray-600 text-center">Already have an account?</p>
          <Link
            to="/login"
            className="sm:ml-2 text-center text-blue-500 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default Signup;
