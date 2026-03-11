import { motion } from "framer-motion";
import Layout from "../Components/layout/Layout";
import StatCard from "../Components/ui/StatCard";
import RideAnalytics from "../Components/dashboard/RideAnalytics";
import { pageTransition } from "../animations/pageTransition";
import ServiceTimeline from "../Components/dashboard/ServiceTimeline";
import GarageHealth from "../Components/dashboard/GarageHealth";
import { useEffect, useState } from "react";
import API from "../services/api";
import { formatDate } from "../utils/dateUtils";
import { LayoutDashboard, Calendar } from "lucide-react";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile/");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="space-y-10"
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <LayoutDashboard className="text-blue-400" size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">ApexOps Dashboard</h1>

              <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                <Calendar size={14} className="text-blue-400/50" />
                {formatDate(new Date())} • Monitor your motorcycle health
              </p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatCard
            title="Last Oil Change"
            value={
              profile?.last_oil_service
                ? formatDate(profile.last_oil_service)
                : "No record"
            }
            subtitle={
              profile?.last_oil_service_kms
                ? `${profile.last_oil_service_kms} km`
                : "N/A"
            }
          />

          <StatCard
            title="Chain Lube"
            value={
              profile?.chain_lube
                ? formatDate(profile.chain_lube)
                : "No record"
            }
            subtitle={
              profile?.chain_lube_kms ? `${profile.chain_lube_kms} km` : "N/A"
            }
          />

          <StatCard
            title="Major Service"
            value={
              profile?.major_service
                ? formatDate(profile.major_service)
                : "No record"
            }
            subtitle={
              profile?.major_service_kms
                ? `${profile.major_service_kms} km`
                : "N/A"
            }
          />
        </div>

        {/* Garage Health */}

        <GarageHealth profile={profile} />

        {/* Analytics + Timeline */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RideAnalytics />
          <ServiceTimeline profile={profile} />
        </div>

        {/* Motorcycle Details */}

        <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">
          <h3 className="text-lg mb-4">Motorcycle Details</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Bike Name</p>
              <p className="font-bold text-blue-400">
                {profile?.bike_name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Model</p>
              <p className="font-bold text-blue-400">
                {profile?.bike_model || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Engine CC</p>
              <p className="font-bold text-blue-400">
                {profile?.engine_cc || "0"} CC
              </p>
            </div>

            <div>
              <p className="text-gray-400">Average Mileage</p>
              <p className="font-bold text-blue-400">
                {profile?.average_mileage || "0"} kmpl
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}