import {
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Activity,
  CalendarCheck,
} from "lucide-react";

interface StatsCardsProps {
  metrics: {
    revenue_at_risk: number;
    total_failed_transactions: number;
    recovered_revenue: number;
    recovery_rate: number;
    promise_to_pay_count: number;
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
      iconColor: "text-red-600",
      bg: "bg-red-50",
    },
    {
  title: "Recovered Revenue",
  value: `₹${metrics.recovered_revenue}`,
  icon: IndianRupee,
  iconColor: "text-green-600",
  bg: "bg-green-50",
},
    {
      title: "Recovery Rate",
      value: `${metrics.recovery_rate}%`,
      icon: TrendingUp,
      iconColor: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Failed Transactions",
      value: metrics.total_failed_transactions,
      icon: Activity,
      iconColor: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Promise To Pay",
      value: metrics.promise_to_pay_count,
      icon: CalendarCheck,
      iconColor: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              border
              hover:scale-105
              transition
              duration-300
            "
          >
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 text-sm font-medium">
                {item.title}
              </h3>

              <div className={`${item.bg} p-2 rounded-xl`}>
                <Icon
                  className={item.iconColor}
                  size={20}
                />
              </div>
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