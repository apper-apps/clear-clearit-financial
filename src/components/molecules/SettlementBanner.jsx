import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { getNextFridayDate, getDaysUntilFriday, formatDate, isFridayToday } from "@/utils/dates";

const SettlementBanner = ({ className }) => {
  const daysUntilFriday = getDaysUntilFriday();
  const nextFridayDate = getNextFridayDate();
  const isToday = isFridayToday();

  const getMessage = () => {
    if (isToday) {
      return "Settlement processing today";
    } else if (daysUntilFriday === 1) {
      return "Settlement tomorrow";
    } else {
      return `Settlement in ${daysUntilFriday} days`;
    }
  };

  return (
    <motion.div
initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`settlement-banner flex items-center justify-between p-4 rounded-lg ${className}`}
      style={{ background: 'linear-gradient(135deg, #0F766E, #10B981)' }}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white/20 rounded-full">
          <ApperIcon name={isToday ? "Zap" : "Calendar"} size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-white">{getMessage()}</p>
          <p className="text-sm text-white/90">
            Next settlement: {formatDate(nextFridayDate, "EEEE, dd MMM yyyy")}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-white/90">Weekly Settlement</p>
        <p className="font-semibold text-white">Every Friday</p>
      </div>
    </motion.div>
  );
};

export default SettlementBanner;