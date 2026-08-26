"use client";

import { useState } from "react";

export default function AddFailedEvent() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    amount: "",
    failure_reason: "UPI Timeout",
  });

  const createEvent = async () => {
    try {
      await fetch("https://revenuepilot-y2li.onrender.com/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Event Created");

      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow mt-6">

      <h2 className="font-bold text-lg mb-4">
        Add Failed Payment
      </h2>

      <input
        placeholder="Customer Name"
        className="border p-2 rounded w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            customer_name: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone"
        className="border p-2 rounded w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />

      <input
        placeholder="Amount"
        className="border p-2 rounded w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value,
          })
        }
      />

      <select
        className="border p-2 rounded w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            failure_reason: e.target.value,
          })
        }
      >
        <option>UPI Timeout</option>
        <option>Bank Timeout</option>
        <option>Insufficient Balance</option>
        <option>OTP Verification Failed</option>
        <option>Session Expired</option>
      </select>

      <button
        onClick={createEvent}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Event
      </button>

    </div>
  );
}