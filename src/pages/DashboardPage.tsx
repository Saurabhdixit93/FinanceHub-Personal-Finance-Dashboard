import React from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import TrendChart from "../components/Dashboard/TrendChart";
import CategoryChart from "../components/Dashboard/CategoryChart";

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <CategoryChart />
      </div>
    </div>
  );
};

export default DashboardPage;
