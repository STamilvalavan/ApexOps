import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function HealthGauge({ label, value }) {

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#020617] border border-gray-800 rounded-xl p-6 flex flex-col items-center"
    >

      <div className="w-24 h-24">

        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: "#3B82F6",
            trailColor: "#1e293b"
          })}
        />

      </div>

      <p className="mt-4 text-sm text-gray-400">
        {label}
      </p>

    </motion.div>

  );
}