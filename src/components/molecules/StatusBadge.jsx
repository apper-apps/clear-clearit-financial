import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatusBadge = ({ status, showIcon = true, className }) => {
  const statusConfig = {
    paid: {
      variant: "paid",
      label: "Paid",
      icon: "CheckCircle"
    },
    overdue: {
      variant: "overdue", 
      label: "Overdue",
      icon: "AlertCircle"
    },
    clearing: {
      variant: "clearing",
      label: "Set to Clear",
      icon: "Clock"
    },
    unpaid: {
      variant: "unpaid",
      label: "Unpaid", 
      icon: "Circle"
    },
    mismatch: {
      variant: "mismatch",
      label: "Mismatch",
      icon: "AlertTriangle"
    },
    scheduled: {
      variant: "info",
      label: "Scheduled",
      icon: "Calendar"
    }
  };

  const config = statusConfig[status] || statusConfig.unpaid;

  return (
    <Badge variant={config.variant} className={cn("flex items-center gap-1", className)}>
      {showIcon && <ApperIcon name={config.icon} size={12} />}
      {config.label}
    </Badge>
  );
};

export default StatusBadge;