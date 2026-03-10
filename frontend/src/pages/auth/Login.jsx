import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/users/login/", {
        username,
        password
      });

      localStorage.setItem("token", res.data.access);

      navigate("/");

    } catch (err) {
      alert("Invalid login");
    }

  };

  return (



    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] p-10 rounded-xl w-96 border border-gray-800"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          ApexOps Login
        </h1>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-[#020617] border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#020617] border border-gray-700"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 p-3 rounded font-semibold hover:bg-blue-600"
          >
            Sign In
          </button>

        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">

          Don't have an account?{" "}

          <Link to="/register" className="text-blue-400">
            Register
          </Link>

        </p>

      </motion.div>

    </div>

  );
}