import {
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Activity,
} from "lucide-react";

interface StatsCardsProps {
  metrics: {
    revenue_at_risk: number;
    total_failed_transactions: number;
    recovered_transactions: number;
    recovery_rate: number;
  };
}

export default function StatsCards({
  metrics,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Revenue At Risk",
      value: `₹${metrics.revenue_at_risk}`,
      icon: AlertTriangle,
    },
    {
      title: "Recovered Revenue",
      value: `₹${metrics.recovered_transactions}`,
      icon: IndianRupee,
    },
    {
      title: "Recovery Rate",
      value: `${metrics.recovery_rate}%`,
      icon: TrendingUp,
    },
    {
      title: "Failed Transactions",
      value: metrics.total_failed_transactions,
      icon: Activity,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border hover:scale-105 transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 text-sm">
                {item.title}
              </h3>

              <Icon className="text-blue-700" />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-[#0C2451]">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}