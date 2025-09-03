import React from "react";
import { motion } from "framer-motion";

const LoadingSkeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

const Loading = ({ type = "default" }) => {
  if (type === "table") {
    return (
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <LoadingSkeleton className="h-5 w-32" />
        </div>
        <div className="divide-y divide-slate-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center space-x-4">
              <LoadingSkeleton className="h-4 w-4 rounded-full" />
              <LoadingSkeleton className="h-4 w-20" />
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-4 w-32" />
              <LoadingSkeleton className="h-4 w-16" />
              <LoadingSkeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "metrics") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-8 w-8 rounded-full" />
            </div>
            <LoadingSkeleton className="h-8 w-32 mb-2" />
            <LoadingSkeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;