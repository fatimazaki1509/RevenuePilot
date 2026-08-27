"use client";

import { useState } from "react";

interface FailedTransactionsProps {
  transactions: any[];
}

export default function FailedTransactions({
  transactions,
}: FailedTransactionsProps) {

  const [loadingId, setLoadingId] =
    useState<number | null>(null);

  const recoverPayment = async (
    eventId: number
  ) => {

    setLoadingId(eventId);

    try {

      const response = await fetch(
        `https://revenuepilot-y2li.onrender.com/recover/${eventId}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      alert(
`✅ Recovery Workflow Executed

Event ID: ${data.event_id}

Recovery Link Generated

WhatsApp Triggered

Status: ${data.status}`
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {

      console.error(error);

      alert(
        "❌ Recovery workflow failed"
      );

    } finally {

      setLoadingId(null);

    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border mt-6">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-bold text-[#0C2451]">
            Failed Payment Events
          </h2>

          <p className="text-sm text-gray-500">
            AI-ranked transactions with highest recovery potential
          </p>
        </div>

        <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
          {transactions.length} Active Cases
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-500 text-sm">

              <th className="text-left py-3">
                Event ID
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Failure Reason
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Recovery Score
              </th>

              <th className="text-left py-3">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {transactions.map((t) => (

              <tr
                key={t.id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="py-4 font-medium">
                  #{t.id}
                </td>

                <td className="font-semibold text-[#0C2451]">
                  ₹{t.amount}
                </td>

                <td>
                  {t.failure_reason}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === "recovered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                <td>
                  <span className="font-semibold text-green-600">
                    {t.recovery_probability}%
                  </span>
                </td>

                <td>

                  {t.status !== "recovered" ? (

                    <button
                      disabled={
                        loadingId === t.id
                      }
                      onClick={() =>
                        recoverPayment(t.id)
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        disabled:bg-gray-400
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        transition
                      "
                    >
                      {loadingId === t.id
                        ? "Processing..."
                        : "Recover"}
                    </button>

                  ) : (

                    <span className="text-green-600 font-medium">
                      Completed
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}