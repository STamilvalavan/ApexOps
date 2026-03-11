import { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import API from "../services/api";
import { formatDate } from "../utils/dateUtils";
import { Calendar, Wallet, TrendingUp, History } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];

export default function Expenses() {

  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: ""
  });

  // Fetch expenses from backend
  const fetchExpenses = async () => {

    try {

      const res = await API.get("/expenses/");

      setExpenses(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // Handle form input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Add new expense
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/expenses/create/", formData);

      setFormData({
        category: "",
        amount: "",
        description: ""
      });

      fetchExpenses();

    } catch (err) {

      console.error(err);

    }

  };

  // Convert data for chart
  const chartData = expenses.reduce((acc, expense) => {

    const existing = acc.find(
      (item) => item.name === expense.category
    );

    if (existing) {

      existing.value += Number(expense.amount);

    } else {

      acc.push({
        name: expense.category,
        value: Number(expense.amount)
      });

    }

    return acc;

  }, []);

  return (

    <Layout>

      <div className="space-y-10">

        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Wallet className="text-blue-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Expense Analytics</h1>
            <p className="text-gray-400">Track and analyze your motorcycle maintenance costs.</p>
          </div>
        </div>

        {/* Expense Form */}

        <div className="bg-[#020617] border border-gray-800 p-8 rounded-2xl shadow-xl">

          <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={20} />
            Add Expense
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <input
                name="category"
                placeholder="Fuel, Service, etc."
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Amount</label>
              <input
                name="amount"
                type="number"
                placeholder="₹"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Description</label>
              <input
                name="description"
                placeholder="Details"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              Add Expense
            </button>

          </form>

        </div>


        {/* Expense Chart */}

        <div className="bg-[#020617] border border-gray-800 p-8 rounded-2xl shadow-xl">

          <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={20} />
            Expense Distribution
          </h3>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f2937', borderRadius: '8px' }} />

              </PieChart>

            </ResponsiveContainer>
          </div>

        </div>


        {/* Expense List */}

        <div className="bg-[#020617] border border-gray-800 p-8 rounded-2xl shadow-xl">

          <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
            <History className="text-blue-400" size={20} />
            Expense History
          </h3>

          <div className="space-y-4">

            {expenses.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No expenses added yet.</p>
            ) : (
              expenses.map((expense) => (

                <div
                  key={expense.id}
                  className="flex justify-between items-center bg-[#0f172a] p-5 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all group"
                >

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/5 rounded-lg">
                      <Wallet className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-lg group-hover:text-blue-400 transition-colors">
                        {expense.category}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={14} />
                        <span>{formatDate(expense.date)}</span>
                        <span className="mx-1">•</span>
                        <span>{expense.description}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-bold text-xl text-green-400">
                    ₹{expense.amount}
                  </p>

                </div>

              ))
            )}

          </div>

        </div>

      </div>

    </Layout>

  );

}