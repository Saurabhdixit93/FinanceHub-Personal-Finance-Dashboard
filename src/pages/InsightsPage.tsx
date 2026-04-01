import React from "react";
import InsightsPanel from "../components/Insights/InsightsPanel";

const InsightsPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">
        Financial insights based on your transaction history
      </p>
      <InsightsPanel />
    </div>
  );
};

export default InsightsPage;
