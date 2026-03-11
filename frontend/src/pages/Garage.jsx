import { useState, useEffect } from "react";
import Layout from "../Components/layout/Layout";
import API from "../services/api";
import { Bike, Save, CheckCircle, Gauge, Droplets, Link2, Disc, Wrench, Edit3, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Garage() {
  const [bikeName, setBikeName] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [engineCC, setEngineCC] = useState(0);
  const [averageMileage, setAverageMileage] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  
  const [lastOilService, setLastOilService] = useState("");
  const [lastOilServiceKms, setLastOilServiceKms] = useState(0);
  const [lastOilServiceDesc, setLastOilServiceDesc] = useState("");
  
  const [chainLube, setChainLube] = useState("");
  const [chainLubeKms, setChainLubeKms] = useState(0);
  const [chainLubeDesc, setChainLubeDesc] = useState("");
  
  const [tyreChange, setTyreChange] = useState("");
  const [tyreChangeKms, setTyreChangeKms] = useState(0);
  const [tyreChangeDesc, setTyreChangeDesc] = useState("");
  
  const [majorService, setMajorService] = useState("");
  const [majorServiceKms, setMajorServiceKms] = useState(0);
  const [majorServiceDesc, setMajorServiceDesc] = useState("");
  
  const [isEditingBike, setIsEditingBike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile/");
      setBikeName(res.data.bike_name || "");
      setBikeModel(res.data.bike_model || "");
      setEngineCC(res.data.engine_cc || 0);
      setAverageMileage(res.data.average_mileage || 0);
      setTotalDistance(res.data.total_distance || 0);
      
      setLastOilService(res.data.last_oil_service || "");
      setLastOilServiceKms(res.data.last_oil_service_kms || 0);
      setLastOilServiceDesc(res.data.last_oil_service_desc || "");
      
      setChainLube(res.data.chain_lube || "");
      setChainLubeKms(res.data.chain_lube_kms || 0);
      setChainLubeDesc(res.data.chain_lube_desc || "");
      
      setTyreChange(res.data.tyre_change || "");
      setTyreChangeKms(res.data.tyre_change_kms || 0);
      setTyreChangeDesc(res.data.tyre_change_desc || "");
      
      setMajorService(res.data.major_service || "");
      setMajorServiceKms(res.data.major_service_kms || 0);
      setMajorServiceDesc(res.data.major_service_desc || "");
      
      // If bike name is empty, allow editing by default
      if (!res.data.bike_name) setIsEditingBike(true);
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await API.put("/users/profile/", {
        bike_name: bikeName,
        bike_model: bikeModel,
        engine_cc: parseInt(engineCC, 10),
        average_mileage: parseFloat(averageMileage),
        total_distance: parseInt(totalDistance, 10),
        last_oil_service: lastOilService || null,
        last_oil_service_kms: parseInt(lastOilServiceKms, 10),
        last_oil_service_desc: lastOilServiceDesc,
        chain_lube: chainLube || null,
        chain_lube_kms: parseInt(chainLubeKms, 10),
        chain_lube_desc: chainLubeDesc,
        tyre_change: tyreChange || null,
        tyre_change_kms: parseInt(tyreChangeKms, 10),
        tyre_change_desc: tyreChangeDesc,
        major_service: majorService || null,
        major_service_kms: parseInt(majorServiceKms, 10),
        major_service_desc: majorServiceDesc,
      });
      setMessage("Bike details updated successfully!");
      setIsEditingBike(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating profile", err);
      setMessage("Failed to update bike details.");
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Bike className="text-blue-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Garage</h1>
            <p className="text-gray-400">Manage your bike details and service history.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f172a] border border-gray-800 p-8 rounded-2xl shadow-xl relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bike className="text-blue-400" size={24} />
                Basic Information
              </h2>
              {!isEditingBike && (
                <button
                  type="button"
                  onClick={() => setIsEditingBike(true)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Bike
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Bike Brand / Name</label>
                <input
                  type="text"
                  value={bikeName}
                  onChange={(e) => setBikeName(e.target.value)}
                  disabled={!isEditingBike}
                  placeholder="e.g. Royal Enfield, KTM"
                  className={`w-full p-4 rounded-xl bg-[#020617] border border-gray-700 outline-none transition-all ${
                    isEditingBike ? "focus:border-blue-500" : "opacity-60 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Bike Model</label>
                <input
                  type="text"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  disabled={!isEditingBike}
                  placeholder="e.g. Himalayan 450"
                  className={`w-full p-4 rounded-xl bg-[#020617] border border-gray-700 outline-none transition-all ${
                    isEditingBike ? "focus:border-blue-500" : "opacity-60 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Engine CC</label>
                <input
                  type="number"
                  value={engineCC}
                  onChange={(e) => setEngineCC(e.target.value)}
                  placeholder="e.g. 450"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Average Mileage (kmpl)</label>
                <input
                  type="number"
                  step="0.1"
                  value={averageMileage}
                  onChange={(e) => setAverageMileage(e.target.value)}
                  placeholder="e.g. 30.5"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Gauge size={16} /> Total Distance Driven (km)
                </label>
                <input
                  type="number"
                  value={totalDistance}
                  onChange={(e) => setTotalDistance(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Service History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f172a] border border-gray-800 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="text-blue-400" size={24} />
              Service History
            </h2>
            
            <div className="space-y-8">
              {/* Oil Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Droplets size={16} /> Last Oil Service Date
                    </label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="date"
                        value={lastOilService}
                        onChange={(e) => setLastOilService(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-white appearance-none"
                      />
                    </div>
                  </div>
                  {lastOilService && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Description / Details</label>
                      <textarea
                        value={lastOilServiceDesc}
                        onChange={(e) => setLastOilServiceDesc(e.target.value)}
                        placeholder="Specify details like oil brand, filter change..."
                        className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-sm min-h-[100px]"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Gauge size={16} /> Total Kms Driven at Service
                  </label>
                  <input
                    type="number"
                    value={lastOilServiceKms}
                    onChange={(e) => setLastOilServiceKms(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 my-4" />

              {/* Chain Lube */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Link2 size={16} /> Last Chain Lube Date
                    </label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="date"
                        value={chainLube}
                        onChange={(e) => setChainLube(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-white appearance-none"
                      />
                    </div>
                  </div>
                  {chainLube && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Description / Details</label>
                      <textarea
                        value={chainLubeDesc}
                        onChange={(e) => setChainLubeDesc(e.target.value)}
                        placeholder="Specify lube used or cleaning process..."
                        className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-sm min-h-[100px]"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Gauge size={16} /> Total Kms Driven at Service
                  </label>
                  <input
                    type="number"
                    value={chainLubeKms}
                    onChange={(e) => setChainLubeKms(e.target.value)}
                    placeholder="e.g. 5500"
                    className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 my-4" />

              {/* Tyre Change */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Disc size={16} /> Last Tyre Change Date
                    </label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="date"
                        value={tyreChange}
                        onChange={(e) => setTyreChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-white appearance-none"
                      />
                    </div>
                  </div>
                  {tyreChange && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Description / Details</label>
                      <textarea
                        value={tyreChangeDesc}
                        onChange={(e) => setTyreChangeDesc(e.target.value)}
                        placeholder="Specify tyre brand, front/rear, model..."
                        className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-sm min-h-[100px]"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Gauge size={16} /> Total Kms Driven at Service
                  </label>
                  <input
                    type="number"
                    value={tyreChangeKms}
                    onChange={(e) => setTyreChangeKms(e.target.value)}
                    placeholder="e.g. 12000"
                    className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 my-4" />

              {/* Major Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Wrench size={16} /> Major Service Date (Non-General)
                    </label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="date"
                        value={majorService}
                        onChange={(e) => setMajorService(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-white appearance-none"
                      />
                    </div>
                  </div>
                  {majorService && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Description / Details</label>
                      <textarea
                        value={majorServiceDesc}
                        onChange={(e) => setMajorServiceDesc(e.target.value)}
                        placeholder="Specify details like engine work, suspension service..."
                        className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-sm min-h-[100px]"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Gauge size={16} /> Total Kms Driven at Service
                  </label>
                  <input
                    type="number"
                    value={majorServiceKms}
                    onChange={(e) => setMajorServiceKms(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <Save size={20} />
              )}
              Save All Details
            </button>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    message.includes("Failed") ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {!message.includes("Failed") && <CheckCircle size={18} />}
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
            <h3 className="text-blue-400 font-bold mb-2">Service Reminders</h3>
            <p className="text-sm text-gray-400">Based on your dates, we'll notify you when your next service is due.</p>
          </div>
          <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
            <h3 className="text-purple-400 font-bold mb-2">Performance Tracking</h3>
            <p className="text-sm text-gray-400">Your distance driven helps us calculate fuel efficiency and wear-and-tear analytics.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
