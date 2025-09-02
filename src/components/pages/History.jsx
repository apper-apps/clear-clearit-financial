import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const History = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
        <p className="text-slate-600 mt-1">
          View historical payments, settlements, and financial activity
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-96">
        <Empty
          title="History View Coming Soon"
          description="Comprehensive historical reporting and transaction tracking will be available soon. Access detailed payment histories, settlement records, and financial audit trails."
          icon="History"
          actionLabel="View Recent Activity"
          action={() => console.log("View recent activity")}
        />
      </div>
    </motion.div>
  );
};

export default History;