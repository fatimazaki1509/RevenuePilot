import {
  Brain,
  MessageSquare,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface AgentActivityProps {
  activities: any[];
}

export default function AgentActivity({
  activities,
}: AgentActivityProps) {

  const defaultActivities = [
    {
      icon: Brain,
      text: "AI analyzing failed payment",
      time: "Live",
    },
    {
      icon: MessageSquare,
      text: "Recovery channel selected",
      time: "Live",
    },
    {
      icon: CreditCard,
      text: "Recovery link generated",
      time: "Live",
    },
    {
      icon: CheckCircle2,
      text: "Awaiting recovery action",
      time: "Live",
    },
  ];

  const data =
    activities?.length > 0
      ? activities
      : defaultActivities;

  return (
    <div className="bg-[#0C2451] text-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold">
            Autonomous Agent Activity
          </h2>

          <p className="text-blue-200 text-sm">
            Real-time AI Recovery Actions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs">
            LIVE
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((activity: any, index: number) => (
          <div
            key={index}
            className="flex justify-between border-b border-white/10 pb-3"
          >
            <span>
              {activity.text}
            </span>

            <span className="text-xs text-gray-300">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}