"use client";

import { useState } from "react";

interface PromiseProps {
  promises: any[];
}

export default function PromiseToPayTable({
  promises,
}: PromiseProps) {

  const [loadingId, setLoadingId] =
    useState<number | null>(null);

  const updateStatus = async (
    promiseId: number,
    status: string
  ) => {

    setLoadingId(promiseId);

    try {

      const response = await fetch(
        `https://revenuepilot-y2li.onrender.com/promise/${promiseId}/status?status=${status}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      alert(
        `✅ Promise Updated\n\nStatus: ${data.status}`
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {

      console.error(error);

      alert("❌ Status update failed");

    } finally {

      setLoadingId(null);

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-bold text-[#0C2451]">
            Promise To Pay Queue
          </h2>

          <p className="text-sm text-gray-500">
            AI-tracked customer payment commitments
          </p>
        </div>

        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {promises.length} Active Promises
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-500 text-sm">

              <th className="text-left py-3">
                Customer
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Promise Date
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {promises.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="py-4 font-medium">
                  {item.customer_name}
                </td>

                <td className="font-semibold text-[#0C2451]">
                  ₹{item.amount}
                </td>

                <td>
                  {item.promised_date}
                </td>

                <td>

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        item.status === "Promised"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  {item.status === "Pending" && (

                    <button
                      disabled={
                        loadingId === item.id
                      }
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "Promised"
                        )
                      }
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        px-3 py-2
                        rounded-lg
                        text-sm
                      "
                    >
                      Mark Promised
                    </button>

                  )}

                  {item.status === "Promised" && (

                    <button
                      disabled={
                        loadingId === item.id
                      }
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "Paid"
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3 py-2
                        rounded-lg
                        text-sm
                      "
                    >
                      Mark Paid
                    </button>

                  )}

                  {item.status === "Paid" && (

                    <span className="text-green-600 font-medium">
                      ✅ Paid
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