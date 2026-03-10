import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] p-10 rounded-xl w-96 border border-gray-800"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full p-3 rounded bg-[#020617] border border-gray-700"
          />

          <input
            placeholder="Email"
            className="w-full p-3 rounded bg-[#020617] border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-[#020617] border border-gray-700"
          />

          <button className="w-full bg-blue-500 p-3 rounded font-semibold hover:bg-blue-600">

            Register

          </button>

        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">

          Already have an account?{" "}

          <Link to="/login" className="text-blue-400">
            Login
          </Link>

        </p>

      </motion.div>

    </div>

  );
}