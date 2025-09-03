import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const TabNavigation = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("border-b border-slate-200", className)}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-all duration-200",
              activeTab === tab.id
? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <Badge variant={activeTab === tab.id ? "primary" : "default"}>
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;