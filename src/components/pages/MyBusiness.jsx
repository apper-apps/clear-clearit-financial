import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import MetricCard from "@/components/molecules/MetricCard";
import ApperIcon from "@/components/ApperIcon";
const MyBusiness = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-64"
    >
      <Empty
        title="View coming soon"
        description="Business profile management and company information tools will be available in an upcoming release."
        icon="Building2"
      />
    </motion.div>
  );
};

export default MyBusiness;