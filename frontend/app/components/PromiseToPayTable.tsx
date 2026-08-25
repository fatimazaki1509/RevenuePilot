interface PromiseProps {
  promises: any[];
}

export default function PromiseToPayTable({
  promises,
}: PromiseProps) {
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
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}