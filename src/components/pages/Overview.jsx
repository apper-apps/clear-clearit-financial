import React from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/molecules/MetricCard";
import SettlementBanner from "@/components/molecules/SettlementBanner";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useInvoiceSummary } from "@/hooks/useInvoices";
import { formatCurrency } from "@/utils/currency";
import { getNextFridayDate, formatDate } from "@/utils/dates";

const Overview = () => {
  const { summary, loading, error, loadSummary } = useInvoiceSummary();

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse settlement-banner h-20"></div>
        <Loading type="metrics" />
      </div>
    );
  }

  if (error) {
    return <Error message="Failed to load dashboard data." onRetry={loadSummary} />;
  }

  const nextSettlementDate = getNextFridayDate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Page Header */}
<div>
<h1 className="text-3xl font-bold text-text-primary mb-2">Overview Dashboard</h1>
        <p className="text-text-secondary">
          Monitor your receivables, payables, and upcoming settlements
        </p>
      </div>

      {/* Settlement Banner */}
      <SettlementBanner />

      {/* Key Metrics */}

      {/* Settlement Summary */}
{/* Friday Net Settlement Section */}
        <div className="bg-surface rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">Friday net settlement</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Summary Cards */}
            <div className="space-y-4">
              {/* Receivables Card */}
              <div className="bg-success rounded-lg text-white p-4">
                <div className="text-lg font-semibold mb-3">Receivables</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Clearing:</span>
                    <span>{formatCurrency(88234.63)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Paid:</span>
                    <span className="underline">{formatCurrency(205880.80)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(294115.43)}</span>
                  </div>
                </div>
              </div>

              {/* Payables Card */}
              <div className="bg-warning rounded-lg text-white p-4">
                <div className="text-lg font-semibold mb-3">Payables</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Clearing:</span>
                    <span>{formatCurrency(56740.65)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Unpaid:</span>
                    <span className="underline">{formatCurrency(132394.84)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(189135.49)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Horizontal Bar Charts */}
            <div className="space-y-6">
              {/* Receivables Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">Receivables | {formatCurrency(294115.43)} | 62 invoices</span>
                </div>
                <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success rounded-full transition-all duration-1000"
                    style={{ width: '60.8%' }} // 294115.43 / (294115.43 + 189135.49) * 100
                  ></div>
                </div>
              </div>

              {/* Payables Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">Payables | {formatCurrency(189135.49)} | 15 invoices</span>
                </div>
                <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning rounded-full transition-all duration-1000"
                    style={{ width: '39.2%' }} // 189135.49 / (294115.43 + 189135.49) * 100
                  ></div>
                </div>
              </div>

              {/* Net Receivable Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">Net receivable</span>
                  <span className="text-text-primary font-semibold">{formatCurrency(104979.94)}</span>
                </div>
                <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: '21.7%' }} // Net as percentage of total receivables
                  ></div>
                </div>
              </div>

              {/* Timeline Indicator */}
              <div className="pt-4">
                <div className="h-1 bg-info rounded-full relative">
                  <div className="absolute left-1/3 top-1/2 w-3 h-3 bg-info rounded-full transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Quick Stats */}
{/* Bottom Statistics - 4 Metric Row */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-text-primary mb-1">62</div>
            <div className="text-sm text-text-secondary">Total Receivable Invoices</div>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-text-primary mb-1">15</div>
            <div className="text-sm text-text-secondary">Total Payable Invoices</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-error mb-1">
              {formatCurrency(75298.08)}
            </div>
            <div className="text-sm text-text-secondary">Total Overdue</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-success mb-1">
              {formatCurrency(205880.80)}
            </div>
            <div className="text-sm text-text-secondary">Paid This Month</div>
          </div>
      </div>
    </motion.div>
  );
};

export default Overview;