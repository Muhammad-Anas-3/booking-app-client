import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/map.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const { loading, dispatch, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      setTimeout(() => {
        dispatch({ type: "CLEAR_FAILURE_MESSAGE" });
      }, 3000);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center flex-col m-2"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white p-8 rounded shadow-xl sm:w-96">
        <h2 className="text-[20px] mb-4 font-semibold">Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              onChange={handleChange}
              required
              type="email"
              id="email"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <input
              onChange={handleChange}
              required
              type="password"
              id="password"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your password"
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
            Log in
          </button>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-gray-600">New to Tripma?</p>
          <Link to="/register" className="ml-2 text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
      <div className="error flex justify-end items-center h-10">
        {error && (
          <span className="p-1 rounded text-red-600 bg-gray-300">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
