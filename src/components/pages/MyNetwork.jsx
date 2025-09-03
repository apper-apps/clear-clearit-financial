import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import MetricCard from "@/components/molecules/MetricCard";
import ApperIcon from "@/components/ApperIcon";
const MyNetwork = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-64"
    >
      <Empty
        title="View coming soon"
        description="Network management and business contact tools will be available in an upcoming release."
        icon="Users"
      />
    </motion.div>
  );
};
export default MyNetwork;