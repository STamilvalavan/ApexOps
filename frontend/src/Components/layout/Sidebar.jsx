import { motion } from "framer-motion";
import { Home, Wrench, Map, Wallet, FileText, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Garage", icon: Wrench, path: "/garage" },
    { name: "Trips", icon: Map, path: "/trips" },
    { name: "Expenses", icon: Wallet, path: "/expenses" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-[#020617] flex flex-col p-6 border-r border-gray-800 min-h-screen"
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-blue-400">ApexOps</h1>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={i} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button — pinned to the bottom */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 mt-6 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white cursor-pointer transition"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </motion.div>
    </motion.div>
  );
}