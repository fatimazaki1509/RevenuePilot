"use client";

import { useState } from "react";
import {
  Sparkles,
  MessageCircle,
  Brain,
  TrendingUp,
} from "lucide-react";

interface AIReasoningProps {
  aiDecision: any;
}

export default function AIReasoning({
  aiDecision,
}: AIReasoningProps) {

  const [loading, setLoading] = useState(false);

  const [auditTrail, setAuditTrail] =
    useState<any[]>([]);

  const [recoveryLink, setRecoveryLink] =
    useState("");

  const launchRecovery = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://revenuepilot-y2li.onrender.com/recover/${aiDecision.event_id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      setRecoveryLink(
        data.recovery_link || ""
      );

      setAuditTrail(
        data.audit_trail || []
      );

      alert(
        `RevenuePilot AI Agent Completed

Event ID: ${data.event_id}

Recovery Workflow Executed

Recovery Link Generated

Customer Outreach Triggered

Status: ${data.status}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Recovery workflow failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border mt-6">

      <div className="flex items-center gap-3 mb-5">
        <Brain
          className="text-blue-600"
          size={24}
        />

        <div>
          <h2 className="text-xl font-bold text-[#0C2451]">
            AI Decision Engine
          </h2>

          <p className="text-sm text-gray-500">
            Autonomous recovery recommendation
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border">

        <h3 className="font-bold text-lg">
          Event #{aiDecision?.event_id}
        </h3>

        <p className="mt-2">
          Amount: ₹{aiDecision?.amount}
        </p>

        <p>
          Failure Reason: {aiDecision?.failure_reason}
        </p>

        <div className="mt-3 bg-green-100 text-green-700 px-3 py-2 rounded-full inline-block text-sm font-semibold">
          {aiDecision?.recovery_score}% Recovery Score
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">

          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs text-gray-500">
              Priority
            </p>

            <p className="font-semibold text-red-600">
              {aiDecision?.priority}
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs text-gray-500">
              Agent Confidence
            </p>

            <p className="font-semibold text-blue-600">
              {aiDecision?.agent_confidence}%
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs text-gray-500">
              Next Best Action
            </p>

            <p className="font-semibold text-green-600">
              {aiDecision?.next_best_action}
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs text-gray-500">
              Recovery Value
            </p>

            <p className="font-semibold text-[#0C2451]">
              ₹{aiDecision?.estimated_recovery_value}
            </p>
          </div>

        </div>

      </div>

      <div className="bg-blue-50 p-5 rounded-2xl mt-5">

        <div className="flex items-center gap-2 mb-3">
          <Sparkles
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold">
            Recommended Channel
          </h3>
        </div>

        <p>
          {aiDecision?.recommended_channel}
        </p>

      </div>

      <div className="bg-yellow-50 p-5 rounded-2xl mt-5">

        <h3 className="font-semibold">
          Root Cause Analysis
        </h3>

        <p className="mt-2">
          {aiDecision?.root_cause}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          {aiDecision?.impact}
        </p>

      </div>

      <div className="bg-green-50 p-5 rounded-2xl mt-5">

        <div className="flex items-center gap-2 mb-2">
          <TrendingUp
            size={18}
            className="text-green-600"
          />

          <h3 className="font-semibold">
            Recommended Action
          </h3>
        </div>

        <p>
          {aiDecision?.recommended_action}
        </p>

      </div>

      <div className="bg-indigo-50 p-5 rounded-2xl mt-5">

        <h3 className="font-semibold mb-2">
          AI Agent Summary
        </h3>

        <p className="text-sm text-gray-700">
          RevenuePilot predicts a
          <span className="font-semibold text-green-600">
            {" "}{aiDecision?.recovery_score}%{" "}
          </span>
          probability of recovering this revenue through
          <span className="font-semibold">
            {" "}{aiDecision?.recommended_channel}
          </span>
          .
        </p>

      </div>

      <button
        onClick={launchRecovery}
        disabled={loading}
        className="mt-5 flex items-center gap-2 bg-[#0C2451] text-white px-5 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
      >
        <MessageCircle size={18} />

        {
          loading
            ? "AI Agent Executing..."
            : "Launch Autonomous Recovery"
        }
      </button>

      {
        recoveryLink && (

          <div className="mt-5 bg-green-50 border border-green-200 p-4 rounded-xl">

            <h3 className="font-semibold text-green-700">
              Recovery Link Generated
            </h3>

            <p className="text-sm break-all mt-2">
              {recoveryLink}
            </p>

          </div>

        )
      }

      {
        auditTrail.length > 0 && (

          <div className="mt-5 bg-slate-50 border p-4 rounded-xl">

            <h3 className="font-semibold mb-3">
              Recovery Audit Trail
            </h3>

            <div className="space-y-2">

              {
                auditTrail.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >

                      <span className="text-green-600">
                        ✓
                      </span>

                      <span>
                        {item.step}
                      </span>

                    </div>

                  )
                )
              }

            </div>

          </div>

        )
      }

    </div>
  );
}