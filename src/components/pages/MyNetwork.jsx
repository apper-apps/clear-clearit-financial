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
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Network</h1>
        <p className="text-slate-600 mt-1">
          Manage your business contacts and network connections
        </p>
      </div>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Contacts"
          value="156"
          change={15.2}
          icon="Users"
          color="info"
        />
        <MetricCard
          title="Active Connections"
          value="89"
          change={8.7}
          icon="UserCheck"
          color="success"
        />
        <MetricCard
          title="Pending Invites"
          value="12"
          change={-2.1}
          icon="UserPlus"
          color="warning"
        />
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Connections</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">AC</span>
                </div>
                <div>
                  <div className="font-medium">ABC Corporation</div>
                  <div className="text-sm text-slate-600">Financial Partner</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">2 days ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-info rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">XY</span>
                </div>
                <div>
                  <div className="font-medium">XYZ Industries</div>
                  <div className="text-sm text-slate-600">Client</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">1 week ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">PS</span>
                </div>
                <div>
                  <div className="font-medium">Prime Services</div>
                  <div className="text-sm text-slate-600">Vendor</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">2 weeks ago</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Network Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="UserPlus" size={16} className="text-primary" />
                </div>
                <span className="font-medium">Add New Contact</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="Upload" size={16} className="text-info" />
                </div>
                <span className="font-medium">Import Contacts</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="Send" size={16} className="text-success" />
                </div>
                <span className="font-medium">Send Invitations</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mr-3">
                  <ApperIcon name="Settings" size={16} className="text-warning" />
                </div>
                <span className="font-medium">Manage Groups</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-64">
        <Empty
          title="Advanced Network Tools Coming Soon"
          description="Connect and manage your business network, client relationships, and partner integrations with advanced collaboration tools."
          icon="Users"
          actionLabel="Import Contacts"
          action={() => console.log("Import contacts")}
        />
      </div>
    </motion.div>
  );
};
export default MyNetwork;