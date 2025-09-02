import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const MyBusiness = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Business</h1>
        <p className="text-slate-600 mt-1">
          Manage your business profile and company information
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-96">
        <Empty
          title="Business Profile Coming Soon"
          description="Comprehensive business profile management, company settings, and organizational tools will be available in the next release."
          icon="Building2"
          actionLabel="Setup Business Profile"
          action={() => console.log("Setup business profile")}
        />
      </div>
    </motion.div>
  );
};

export default MyBusiness;