import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const Forecast = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Forecast</h1>
        <p className="text-slate-600 mt-1">
          Predict future cash flows and financial trends
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-96">
        <Empty
          title="Forecasting Coming Soon"
          description="Advanced financial forecasting and predictive analytics will be available in the next update. Stay tuned for powerful cash flow projections and trend analysis."
          icon="LineChart"
          actionLabel="Request Early Access"
          action={() => console.log("Request forecast early access")}
        />
      </div>
    </motion.div>
  );
};

export default Forecast;