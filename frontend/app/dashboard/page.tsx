"use client";

import { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import AgentActivity from "../components/AgentActivity";
import AITimeline from "../components/AITimeline";
import RecoveryChart from "../components/RecoveryChart";
import FailedTransactions from "../components/FailedTransactions";
import AIReasoning from "../components/AIReasoning";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [failedEvents, setFailedEvents] = useState<any[]>([]);
  const [aiDecision, setAiDecision] = useState<any>(null);

  const [agentActivity, setAgentActivity] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      // Metrics
      const metricsRes = await fetch(
        "http://127.0.0.1:8000/dashboard-metrics"
      );
      const metricsData = await metricsRes.json();
      setMetrics(metricsData);

      // Failed Events
      const eventsRes = await fetch(
        "http://127.0.0.1:8000/failed-events"
      );
      const eventsData = await eventsRes.json();
      setFailedEvents(eventsData);

      // AI Decision
      const decisionRes = await fetch(
        "http://127.0.0.1:8000/ai-decision/1"
      );
      const decisionData = await decisionRes.json();
      setAiDecision(decisionData);

      // Recovery Chart
      const chartRes = await fetch(
        "http://127.0.0.1:8000/recovery-chart"
      );
      const chartData = await chartRes.json();
      setChartData(chartData);

      // Agent Activity
      const activityRes = await fetch(
        "http://127.0.0.1:8000/agent-activity"
      );
      const activityData = await activityRes.json();
      setAgentActivity(activityData);

    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    }
  };

  // Initial Load
  fetchData();

  // Auto Refresh Every 5 Seconds
  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  // Cleanup
  return () => clearInterval(interval);

}, []);

  if (!metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading RevenuePilot...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#0C2451]">
          RevenuePilot Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Autonomous AI-Powered Revenue Recovery Platform
        </p>
      </div>

      <Navbar />

      <HeroSection metrics={metrics} />

      <StatsCards metrics={metrics} />

      <div className="mt-8 space-y-6">
        <AgentActivity
          activities={agentActivity}
        />

        <AITimeline aiDecision={aiDecision} />

        <RecoveryChart
          data={chartData}
        />

        <FailedTransactions
          transactions={failedEvents}
        />

        <AIReasoning
          aiDecision={aiDecision}
        />
      </div>
    </div>
  );
}