import { motion } from "framer-motion";
import { Bike } from "lucide-react";

export default function Navbar() {
  const username = localStorage.getItem("username") || "Rider";

  return (

    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 flex items-center justify-between px-8 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40 bg-[#0F172A]/80"
    >

      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Bike className="text-blue-400" size={24} />
        <span>Rider Dashboard</span>
      </h2>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <span>Welcome,</span>
          <span className="text-blue-400 font-bold uppercase tracking-wider">{username}</span>
          <div className="flex gap-1">
            <Bike size={16} className="text-gray-500" />
            <Bike size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

    </motion.div>
  );
}