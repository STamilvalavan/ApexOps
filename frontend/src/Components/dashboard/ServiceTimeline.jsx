import { motion } from "framer-motion";
import { Wrench, Calendar } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

export default function ServiceTimeline({ profile }) {
  const services = [
    {
      title: "Major Service",
      km: profile?.major_service_kms ? `${profile.major_service_kms} km` : "N/A",
      date: profile?.major_service ? formatDate(profile.major_service) : null,
      desc: profile?.major_service_desc
    },
    {
      title: "Tyre Change",
      km: profile?.tyre_change_kms ? `${profile.tyre_change_kms} km` : "N/A",
      date: profile?.tyre_change ? formatDate(profile.tyre_change) : null,
      desc: profile?.tyre_change_desc
    },
    {
      title: "Oil Change",
      km: profile?.last_oil_service_kms ? `${profile.last_oil_service_kms} km` : "N/A",
      date: profile?.last_oil_service ? formatDate(profile.last_oil_service) : null,
      desc: profile?.last_oil_service_desc
    },
    {
      title: "Chain Lube",
      km: profile?.chain_lube_kms ? `${profile.chain_lube_kms} km` : "N/A",
      date: profile?.chain_lube ? formatDate(profile.chain_lube) : null,
      desc: profile?.chain_lube_desc
    },
  ].filter(s => s.date !== null).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (

    <div className="bg-[#020617] border border-gray-800 rounded-xl p-6">

      <h3 className="text-lg mb-6 flex items-center gap-2">
        <Calendar className="text-blue-400" size={20} />
        Service History
      </h3>

      <div className="relative">

        {/* vertical line */}

        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-700" />

        <div className="space-y-8">

          {services.length === 0 ? (
            <p className="text-sm text-gray-500 pl-10">No service records yet.</p>
          ) : (
            services.map((service, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="flex items-start gap-4"
              >

                {/* icon */}

                <div className="bg-blue-500 p-2 rounded-full relative z-10">

                  <Wrench size={16} />

                </div>

                {/* content */}

                <div>

                  <p className="font-semibold">
                    {service.title}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{service.km}</span>
                    <span>•</span>
                    <span>{service.date}</span>
                  </div>

                  {service.desc && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      {service.desc}
                    </p>
                  )}

                </div>

              </motion.div>

            ))
          )}

        </div>

      </div>

    </div>

  );
}