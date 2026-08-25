"use client";

import { useState } from "react";
import {
  Mic,
  Phone,
  PhoneCall,
  CheckCircle,
  Volume2,
} from "lucide-react";

export default function VoiceAgentPage() {
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Ready");
  const [callCompleted, setCallCompleted] =
    useState(false);

  const startCall = () => {
    setCallCompleted(false);
    setTranscript("");

    setStatus("Calling Customer...");

    const message =
      "Hello. This is RevenuePilot AI Recovery Agent. We noticed your recent payment failed. Would you like to complete your payment now or schedule a promise to pay?";

    const speech =
      new SpeechSynthesisUtterance(message);

    speech.rate = 1;
    speech.pitch = 1;

    speech.onend = () => {
      setStatus("Listening...");
      startListening();
    };

    speechSynthesis.speak(speech);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported in this browser"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = async (event: any) => {

      const text =
        event.results[0][0].transcript.toLowerCase();

      setTranscript(text);

      let outcome = "";

      if (
        text.includes("pay now") ||
        text.includes("complete payment") ||
        text.includes("pay today") ||
        text.includes("i would like to pay")
      ) {

        outcome = "Payment Recovery Success";
        setStatus(outcome);

      } else if (
        text.includes("tomorrow") ||
        text.includes("next week") ||
        text.includes("later") ||
        text.includes("promise")
      ) {

        outcome = "Promise To Pay Captured";
        setStatus(outcome);

      } else {

        outcome = "Manual Review Required";
        setStatus(outcome);

      }

      try {

        await fetch(
          "https://revenuepilot-y2li.onrender.com/voice-result",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              transcript: text,
              outcome: outcome,
            }),
          }
        );

      } catch (error) {

        console.error(
          "Voice Result Save Error:",
          error
        );

      }

      setCallCompleted(true);
    };

    recognition.onerror = () => {
      setStatus("Voice Recognition Failed");
    };
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#0C2451]">
          RevenuePilot Voice Agent
        </h1>

        <p className="text-gray-600 mt-2">
          AI-Powered Recovery Calling Assistant
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex items-center gap-3 mb-6">
          <PhoneCall
            className="text-blue-600"
            size={28}
          />

          <h2 className="text-2xl font-bold">
            Recovery Voice Agent
          </h2>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6">

          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="text-green-600" />

            <span className="font-medium">
              Status:
            </span>

            <span className="text-blue-700 font-semibold">
              {status}
            </span>
          </div>

          <button
            onClick={startCall}
            className="mt-4 bg-[#0C2451] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90"
          >
            <Phone size={18} />
            Start Recovery Call
          </button>
        </div>

        <div className="mt-8 bg-white border rounded-2xl p-6">

          <div className="flex items-center gap-2 mb-4">
            <Mic className="text-red-500" />

            <h3 className="font-bold text-lg">
              Live Transcript
            </h3>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 min-h-[120px]">
            {transcript ||
              "Waiting for customer response..."}
          </div>
        </div>

        {callCompleted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">

            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-green-600" />

              <h3 className="font-bold text-green-700">
                Call Analysis Complete
              </h3>
            </div>

            <p>
              Customer Response:
            </p>

            <p className="font-medium mt-2">
              "{transcript}"
            </p>

            <div className="mt-4 bg-white rounded-xl p-4 border">
              <p>
                AI Outcome:
              </p>

              <p className="font-semibold text-green-700 mt-2">
                {status}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}