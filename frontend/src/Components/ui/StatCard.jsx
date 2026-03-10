import { motion } from "framer-motion";

export default function StatCard({ title, value, subtitle }) {

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#020617] border border-gray-800 p-6 rounded-xl shadow-lg"
    >

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {subtitle}
      </p>

    </motion.div>
  );
}