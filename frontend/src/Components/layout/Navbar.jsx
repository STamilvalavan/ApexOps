import { motion } from "framer-motion";

export default function Navbar() {

  return (

    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 flex items-center justify-between px-8 backdrop-blur-lg border-b border-gray-800"
    >

      <h2 className="text-lg font-semibold">
        Rider Dashboard
      </h2>

      <div className="text-sm text-gray-400">
        Welcome Rider
      </div>

    </motion.div>
  );
}