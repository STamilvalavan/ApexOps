import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", km: 400 },
  { month: "Feb", km: 620 },
  { month: "Mar", km: 520 },
  { month: "Apr", km: 780 },
  { month: "May", km: 640 }
];

export default function RideAnalytics() {

  return (
    <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">

      <h3 className="text-lg mb-4">
        Ride Analytics
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="km"
            stroke="#3B82F6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}