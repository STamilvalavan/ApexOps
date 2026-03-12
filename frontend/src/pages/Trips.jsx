import { useState, useEffect } from "react";
import Layout from "../Components/layout/Layout";
import API from "../services/api";
import { formatDate, formatDateForBackend } from "../utils/dateUtils";
import { MapPin, Navigation, Gauge, Droplets, Calendar, Save, History, Plus, Wallet } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    start_location: "",
    end_location: "",
    total_kms: "",
    petrol_expense: "",
    liters_consumed: "",
    date: new Date(),
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await API.get("/trips/");
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await API.post("/trips/", {
        ...formData,
        total_kms: parseFloat(formData.total_kms) || 0,
        petrol_expense: parseFloat(formData.petrol_expense) || 0,
        liters_consumed: parseFloat(formData.liters_consumed) || 0,
        date: formatDateForBackend(formData.date),
      });
      setMessage("Trip recorded successfully!");
      setFormData({
        start_location: "",
        end_location: "",
        total_kms: "",
        petrol_expense: "",
        liters_consumed: "",
        date: new Date(),
      });
      fetchTrips();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving trip", err);
      setMessage("Failed to record trip.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Navigation className="text-blue-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Trip Analytics</h1>
            <p className="text-gray-400">Track your rides and monitor fuel efficiency.</p>
          </div>
        </div>

        {/* Trip Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] border border-gray-800 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="text-blue-400" size={20} />
            Record New Trip
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <MapPin size={16} /> Start Location
                </label>
                <input
                  type="text"
                  name="start_location"
                  value={formData.start_location}
                  onChange={handleChange}
                  placeholder="e.g. Home, Office"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <MapPin size={16} /> End Location
                </label>
                <input
                  type="text"
                  name="end_location"
                  value={formData.end_location}
                  onChange={handleChange}
                  placeholder="e.g. Office, Mountain Base"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Gauge size={16} /> Total Distance (km)
                </label>
                <input
                  type="number"
                  name="total_kms"
                  value={formData.total_kms}
                  onChange={handleChange}
                  placeholder="e.g. 45.5"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Wallet size={16} /> Petrol Expense (₹)
                </label>
                <input
                  type="number"
                  name="petrol_expense"
                  value={formData.petrol_expense}
                  onChange={handleChange}
                  placeholder="e.g. 250"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Droplets size={16} /> Fuel Consumed (L)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="liters_consumed"
                  value={formData.liters_consumed}
                  onChange={handleChange}
                  placeholder="e.g. 1.2"
                  className="w-full p-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Calendar size={16} /> Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-colors z-10" size={18} />
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#020617] border border-gray-700 focus:border-blue-500 outline-none transition-all text-white appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
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
                Save Trip
              </button>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-sm font-medium"
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Trip History */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="text-blue-400" size={24} />
            Trip History
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>
          ) : trips.length === 0 ? (
            <div className="bg-[#0f172a] border border-gray-800 p-10 rounded-2xl text-center text-gray-400">
              No trips recorded yet. Start your journey today!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#0f172a] border border-gray-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Navigation size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{trip.start_location}</span>
                            <span className="text-gray-500">→</span>
                            <span className="font-bold text-lg">{trip.end_location}</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar size={14} /> {formatDate(trip.date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Distance</p>
                        <p className="font-bold text-xl">{trip.total_kms} <span className="text-sm text-gray-500">km</span></p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expense</p>
                        <p className="font-bold text-xl text-green-400">₹{trip.petrol_expense}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fuel</p>
                        <p className="font-bold text-xl">{trip.liters_consumed} <span className="text-sm text-gray-500">L</span></p>
                      </div>
                      <div className="text-center p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 group-hover:border-blue-500/30 transition-all">
                        <p className="text-xs text-blue-400 uppercase tracking-wider mb-1 font-bold">Mileage</p>
                        <p className="font-black text-2xl text-blue-400">{trip.mileage} <span className="text-xs">kmpl</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
