import { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import API from "../services/api";

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

        <h1 className="text-2xl font-bold">
          Expense Analytics
        </h1>

        {/* Expense Form */}

        <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">

          <h3 className="mb-4 text-lg">
            Add Expense
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-4"
          >

            <input
              name="category"
              placeholder="Category (Fuel, Service)"
              value={formData.category}
              onChange={handleChange}
              className="p-3 rounded bg-[#0f172a] border border-gray-700"
            />

            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="p-3 rounded bg-[#0f172a] border border-gray-700"
            />

            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded bg-[#0f172a] border border-gray-700"
            />

            <button
              className="col-span-3 bg-blue-500 p-3 rounded font-semibold hover:bg-blue-600"
            >
              Add Expense
            </button>

          </form>

        </div>


        {/* Expense Chart */}

        <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">

          <h3 className="mb-4 text-lg">
            Expense Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={120}
                label
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* Expense List */}

        <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">

          <h3 className="mb-4 text-lg">
            Expense History
          </h3>

          <div className="space-y-3">

            {expenses.map((expense) => (

              <div
                key={expense.id}
                className="flex justify-between bg-[#0f172a] p-3 rounded"
              >

                <div>

                  <p className="font-semibold">
                    {expense.category}
                  </p>

                  <p className="text-sm text-gray-400">
                    {expense.description}
                  </p>

                </div>

                <p className="font-bold text-green-400">
                  ₹{expense.amount}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </Layout>

  );

}