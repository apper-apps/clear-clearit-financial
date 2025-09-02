import React from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

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

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-slate-200 min-h-96">
        <Empty
          title="Network Management Coming Soon"
          description="Connect and manage your business network, client relationships, and partner integrations. Coming in a future update."
          icon="Users"
          actionLabel="Import Contacts"
          action={() => console.log("Import contacts")}
        />
      </div>
    </motion.div>
  );
};

export default MyNetwork;