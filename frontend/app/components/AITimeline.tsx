import {
  AlertTriangle,
  Brain,
  MessageSquare,
  Link2,
  CheckCircle2,
} from "lucide-react";

interface AITimelineProps {
  aiDecision: any;
}

export default function AITimeline({
  aiDecision,
}: AITimelineProps) {

  const steps = [
    {
      title: "Payment Failure Detected",
      description: aiDecision?.failure_reason || "Unknown Error",
      icon: AlertTriangle,
    },
    {
      title: "AI Recovery Analysis",
      description: `${aiDecision?.recovery_score || 0}% recovery probability`,
      icon: Brain,
    },
    {
      title: "Channel Recommendation",
      description:
        aiDecision?.recommended_channel || "WhatsApp",
      icon: MessageSquare,
    },
    {
      title: "Recovery Link Generated",
      description: "Secure payment recovery link created",
      icon: Link2,
    },
    {
      title: "Recovery Campaign Ready",
      description:
        aiDecision?.status === "recovered"
          ? "Revenue Successfully Recovered"
          : "Awaiting Launch Recovery",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border">
      <h2 className="text-xl font-bold mb-5">
        AI Decision Timeline
      </h2>

      <div className="space-y-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-50 p-2 rounded-lg">
                <Icon
                  size={18}
                  className="text-blue-700"
                />
              </div>

              <div>
                <p className="font-semibold text-[#0C2451]">
                  {step.title}
                </p>

                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}