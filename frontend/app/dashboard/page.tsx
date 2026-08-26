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
import PromiseToPayTable from "../components/PromiseToPayTable";
import AddFailedEvent from "../components/AddFailedEvent";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [failedEvents, setFailedEvents] = useState<any[]>([]);
  const [aiDecision, setAiDecision] = useState<any>(null);
  const [agentActivity, setAgentActivity] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [promises, setPromises] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dashboard Metrics
        const metricsRes = await fetch(
          "https://revenuepilot-y2li.onrender.com/dashboard-metrics"
        );
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);

        // Failed Events
        const eventsRes = await fetch(
          "https://revenuepilot-y2li.onrender.com/failed-events"
        );
        const eventsData = await eventsRes.json();
        setFailedEvents(eventsData);

        // Dynamic AI Decision
        if (eventsData.length > 0) {
          const pendingEvent =
            eventsData.find(
              (e: any) => e.status === "pending"
            ) || eventsData[0];

          const decisionRes = await fetch(
            `https://revenuepilot-y2li.onrender.com/ai-decision/${pendingEvent.id}`
          );

          const decisionData =
            await decisionRes.json();

          setAiDecision(decisionData);
        }

        // Recovery Chart
        const chartRes = await fetch(
          "https://revenuepilot-y2li.onrender.com/recovery-chart"
        );
        const chartData = await chartRes.json();
        setChartData(chartData);

        // Agent Activity
        const activityRes = await fetch(
          "https://revenuepilot-y2li.onrender.com/agent-activity"
        );
        const activityData = await activityRes.json();
        setAgentActivity(activityData);

        // Promise To Pay
        const promiseRes = await fetch(
          "https://revenuepilot-y2li.onrender.com/promises"
        );
        const promiseData = await promiseRes.json();
        setPromises(promiseData);

      } catch (error) {
        console.error(
          "Dashboard Fetch Error:",
          error
        );
      }
    };

    // Initial Load
    fetchData();

    // Auto Refresh Every 5 Seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

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

      <Navbar />

      <HeroSection metrics={metrics} />

      <StatsCards
        metrics={{
          ...metrics,
          promise_to_pay_count: promises.length,
        }}
      />

      <div className="mt-8 space-y-6">

        <AgentActivity
          activities={agentActivity}
        />

        <AITimeline
          aiDecision={aiDecision}
        />

        <RecoveryChart
          data={chartData}
        />
        <AddFailedEvent />

        <FailedTransactions
          transactions={failedEvents}
        />

        <AIReasoning
          aiDecision={aiDecision}
        />

        <PromiseToPayTable
          promises={promises}
        />

      </div>
    </div>
  );
}