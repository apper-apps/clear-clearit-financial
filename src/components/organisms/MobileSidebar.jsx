import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MobileSidebar = ({ isOpen, onClose }) => {
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

  const NavItem = ({ item, onClick }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <NavLink
        to={item.path}
        onClick={onClick}
        className={cn(
          "flex items-center px-4 py-3 text-base font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg rounded-lg mx-4"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:rounded-lg hover:mx-4"
        )}
      >
        <ApperIcon
          name={item.icon}
          size={20}
          className={cn(
            "mr-4 transition-colors duration-200",
            isActive ? "text-white" : "text-slate-500"
          )}
        />
        {item.name}
      </NavLink>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
<div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-900 font-bold text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900">ClearIt</h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-6 overflow-y-auto">
              {/* Core Navigation */}
              <div>
                <h3 className="px-6 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Core
                </h3>
                <div className="space-y-1">
                  {navigationItems
                    .filter(item => item.priority === "high")
                    .map((item) => (
                      <NavItem key={item.path} item={item} onClick={onClose} />
                    ))}
                </div>
              </div>

              {/* Analytics */}
              <div>
                <h3 className="px-6 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Analytics
                </h3>
                <div className="space-y-1">
                  {navigationItems
                    .filter(item => item.priority === "medium")
                    .map((item) => (
                      <NavItem key={item.path} item={item} onClick={onClose} />
                    ))}
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="px-6 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Settings
                </h3>
                <div className="space-y-1">
                  {navigationItems
                    .filter(item => item.priority === "low")
                    .map((item) => (
                      <NavItem key={item.path} item={item} onClick={onClose} />
                    ))}
                </div>
              </div>
            </nav>

            {/* API Status */}
            <div className="p-6 border-t border-slate-200">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                API Status
              </h4>
              <div className="space-y-2">
                {apiIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
                  >
                    <span className="text-sm text-slate-600">{integration.name}</span>
                    <ApperIcon
                      name={integration.icon}
                      size={16}
                      className={cn(
                        integration.status === "connected"
                          ? "text-success"
                          : integration.status === "active"
                          ? "text-primary"
                          : "text-slate-400"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;