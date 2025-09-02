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
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Business</h1>
        <p className="text-slate-600 mt-1">
          Manage your business profile and company information
        </p>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={245000}
          change={12.5}
          icon="DollarSign"
          color="success"
        />
        <MetricCard
          title="Active Clients"
          value="24"
          change={8.2}
          icon="Users"
          color="info"
        />
        <MetricCard
          title="Business Growth"
          value="18.5%"
          change={4.1}
          icon="TrendingUp"
          color="success"
        />
      </div>

      {/* Business Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Company Profile</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-600">Business Name</span>
              <span className="font-medium">ClearITT Financial</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Industry</span>
              <span className="font-medium">Financial Services</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">ABN</span>
              <span className="font-medium abn-format">12 345 678 901</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Established</span>
              <span className="font-medium">2020</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="FileText" size={16} className="text-primary" />
                </div>
                <span className="font-medium">Update Business Details</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="Settings" size={16} className="text-info" />
                </div>
                <span className="font-medium">Configure Preferences</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="Shield" size={16} className="text-warning" />
                </div>
                <span className="font-medium">Security Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-64">
        <Empty
          title="Advanced Business Tools Coming Soon"
          description="Comprehensive business profile management, advanced reporting, and organizational tools will be available in the next release."
          icon="Building2"
          actionLabel="Setup Business Profile"
          action={() => console.log("Setup business profile")}
        />
      </div>
    </motion.div>
  );
};
export default MyBusiness;