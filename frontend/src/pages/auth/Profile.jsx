import { useState, useEffect } from "react";
import Layout from "../../Components/layout/Layout";
import API from "../../services/api";
import { User, Mail, Bike, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile/");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <User className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">User Profile</h1>
              <p className="text-gray-400">Manage your personal information and preferences.</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f172a] border border-gray-800 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-blue-400" size={24} />
              Personal Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Username</p>
                    <p className="font-bold text-lg">{profile?.username}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-700" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email Address</p>
                    <p className="font-bold text-lg">{profile?.email}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-700" />
              </div>
            </div>
          </motion.div>

          {/* Bike Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f172a] border border-gray-800 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bike className="text-blue-400" size={24} />
              Motorcycle Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <Bike size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Current Bike</p>
                    <p className="font-bold text-lg">
                      {profile?.bike_name || "Not set"} {profile?.bike_model}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/garage")}
                  className="text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors"
                >
                  Edit in Garage
                </button>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-gray-400">
                  You can update your bike's detailed specifications, service history, and mileage in the <strong>Garage</strong> section.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}