import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ className }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Overview",
      path: "/",
      icon: "BarChart3",
      priority: "high"
    },
    {
      name: "Receivables", 
      path: "/receivables",
      icon: "TrendingUp",
      priority: "high"
    },
    {
      name: "Payables",
      path: "/payables", 
      icon: "TrendingDown",
      priority: "high"
    },
    {
      name: "Forecast",
      path: "/forecast",
      icon: "LineChart",
      priority: "medium"
    },
    {
      name: "History",
      path: "/history",
      icon: "History",
      priority: "medium"
    },
    {
      name: "My Business",
      path: "/business",
      icon: "Building2",
      priority: "low"
    },
    {
      name: "My Network",
      path: "/network",
      icon: "Users",
      priority: "low"
    }
  ];

  const apiIntegrations = [
    { name: "Xero", status: "connected", icon: "CheckCircle" },
    { name: "MYOB", status: "connected", icon: "CheckCircle" },
    { name: "HelloClever", status: "active", icon: "Zap" }
  ];

  const groupedNavigation = {
    high: navigationItems.filter(item => item.priority === "high"),
    medium: navigationItems.filter(item => item.priority === "medium"), 
    low: navigationItems.filter(item => item.priority === "low")
  };

  const NavItem = ({ item, index }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <NavLink
          to={item.path}
          className={cn(
"flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
            isActive
              ? "bg-green-500 text-white shadow-lg"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <ApperIcon
            name={item.icon}
            size={18}
            className={cn(
              "mr-3 transition-colors duration-200",
              isActive 
                ? "text-white" 
                : "text-slate-500 group-hover:text-slate-700"
            )}
          />
          {item.name}
        </NavLink>
      </motion.div>
    );
  };

  return (
<div className={cn("bg-white border-r border-slate-200 h-full flex flex-col", className)}>
      {/* Navigation - No logo needed as header has it */}
      <nav className="flex-1 px-4 py-6 space-y-6">
        {/* CORE Section */}
        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            CORE
          </h3>
          {groupedNavigation.high.map((item, index) => (
            <NavItem key={item.path} item={item} index={index} />
          ))}
        </div>

        {/* ANALYTICS Section */}
        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            ANALYTICS
          </h3>
          {groupedNavigation.medium.map((item, index) => (
            <NavItem key={item.path} item={item} index={index + 3} />
          ))}
        </div>

        {/* SETTINGS Section */}
        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            SETTINGS
          </h3>
          {groupedNavigation.low.map((item, index) => (
            <NavItem key={item.path} item={item} index={index + 5} />
          ))}
        </div>
      </nav>

      {/* API STATUS Section */}
      <div className="p-4 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
          API STATUS
        </h4>
        <div className="space-y-2">
          {apiIntegrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-50"
            >
              <span className="text-sm text-slate-600 font-medium">{integration.name}</span>
              <ApperIcon
                name={integration.icon}
                size={16}
                className={cn(
                  integration.status === "connected" 
                    ? "text-green-600" 
                    : integration.status === "active" 
                    ? "text-yellow-500" 
                    : "text-slate-400"
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;