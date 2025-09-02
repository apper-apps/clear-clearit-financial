import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/currency";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = "primary", 
  breakdown,
  className,
  loading = false 
}) => {
  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
      </Card>
    );
  }

  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    error: "text-error bg-error/10",
    info: "text-info bg-info/10"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("p-6 hover:shadow-lg transition-all duration-200", className)}>
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            {icon && (
              <div className={cn(
                "p-2 rounded-full",
                colorClasses[color]
              )}>
                <ApperIcon name={icon} size={20} />
              </div>
            )}
          </div>
          
<div className="space-y-2">
            <motion.div 
              className="text-3xl font-bold text-slate-900"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {typeof value === "number" ? formatCurrency(value) : value}
            </motion.div>
            
            {change && (
              <div className={cn(
                "flex items-center text-sm",
                change > 0 ? "text-success" : change < 0 ? "text-error" : "text-slate-500"
              )}>
                <ApperIcon 
                  name={change > 0 ? "TrendingUp" : change < 0 ? "TrendingDown" : "Minus"} 
                  size={16} 
                  className="mr-1" 
                />
                {Math.abs(change)}% from last month
              </div>
            )}
            
            {breakdown && (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;