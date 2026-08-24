export default function Navbar() {
  return (
    <div className="bg-white border rounded-2xl px-6 py-4 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2451]">
            RevenuePilot
          </h1>

          <p className="text-sm text-gray-500">
            Recovering Lost Revenue in Real Time
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-sm font-medium text-green-600">
            System Active
          </span>
        </div>
      </div>
    </div>
  );
}