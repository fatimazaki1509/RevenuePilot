interface HeroSectionProps {
  metrics: any;
}

export default function HeroSection({
  metrics,
}: HeroSectionProps) {
  return (
    <div className="bg-[#0B1F5B] text-white rounded-3xl p-8 mb-6 shadow-lg">
      <p className="text-blue-300 font-medium">
        Autonomous AI Revenue Recovery Platform
      </p>

      <h1 className="text-5xl font-bold mt-2">
        RevenuePilot
      </h1>

      <p className="text-blue-200 mt-2">
        Recover failed payments automatically using AI-driven decisioning and recovery workflows.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-blue-200 text-sm">
            Revenue At Risk
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{metrics?.revenue_at_risk || 0}
          </h2>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-blue-200 text-sm">
            Recovered Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {metrics?.recovered_transactions || 0}
          </h2>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-blue-200 text-sm">
            Recovery Rate
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {metrics?.recovery_rate || 0}%
          </h2>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

        <span className="text-sm text-green-200">
          AI Recovery Engine Active
        </span>
      </div>
    </div>
  );
}