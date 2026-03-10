import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const services = [
  {
    title: "Oil Change",
    km: "15000 km",
    date: "Feb 2026"
  },
  {
    title: "Chain Lubed",
    km: "14500 km",
    date: "Jan 2026"
  },
  {
    title: "Brake Pads Replaced",
    km: "12000 km",
    date: "Nov 2025"
  },
  {
    title: "New Tyres Installed",
    km: "10000 km",
    date: "Sep 2025"
  }
];

export default function ServiceTimeline() {

  return (

    <div className="bg-[#020617] border border-gray-800 rounded-xl p-6">

      <h3 className="text-lg mb-6">
        Service History
      </h3>

      <div className="relative">

        {/* vertical line */}

        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-700" />

        <div className="space-y-8">

          {services.map((service, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="flex items-start gap-4"
            >

              {/* icon */}

              <div className="bg-blue-500 p-2 rounded-full">

                <Wrench size={16} />

              </div>

              {/* content */}

              <div>

                <p className="font-semibold">
                  {service.title}
                </p>

                <p className="text-sm text-gray-400">
                  {service.km}
                </p>

                <p className="text-xs text-gray-500">
                  {service.date}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );
}