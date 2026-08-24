"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface RecoveryChartProps {
  data: any[];
}

export default function RecoveryChart({
  data = [],
}: RecoveryChartProps) {

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border mt-6">
        <h2 className="text-xl font-bold mb-4">
          Revenue Recovery Trend
        </h2>

        <p>No chart data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border mt-6">
      <h2 className="text-xl font-bold mb-4">
        Revenue Recovery Trend
      </h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#2563eb"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}