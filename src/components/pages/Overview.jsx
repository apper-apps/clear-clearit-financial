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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Overview Dashboard</h1>
        <p className="text-slate-600">
          Monitor your receivables, payables, and upcoming settlements
        </p>
      </div>

      {/* Settlement Banner */}
      <SettlementBanner />

      {/* Key Metrics */}
{/* Main Metrics - 3 Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Receivables"
          value={499987.46}
          icon="TrendingUp"
          color="success"
          className="hover:shadow-lg transition-shadow"
        />
        
        <MetricCard
          title="Total Payables"
          value={191300.42}
          icon="TrendingDown" 
          color="warning"
          className="hover:shadow-lg transition-shadow"
        />

        <MetricCard
          title="Net Receivable"
          value={308687.04}
          icon="DollarSign"
          color="primary"
          change={8.2}
          className="hover:shadow-lg transition-shadow"
        />
      </div>

      {/* Settlement Summary */}
{/* Next Settlement Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Next Settlement</h2>
          <div className="text-sm text-slate-600 font-medium">
            {formatDate(nextSettlementDate, "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">
              {formatCurrency(181904.99)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Receivables Clearing</div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-700 mb-1">
              {formatCurrency(23456.78)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Payables Clearing</div>
          </div>

          <div className="text-center p-6 bg-teal-50 rounded-lg border border-teal-200">
            <div className="text-2xl font-bold text-teal-700 mb-1">
              {formatCurrency(158448.21)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Net Settlement</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
{/* Bottom Statistics - 4 Metric Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-slate-900 mb-1">7</div>
          <div className="text-sm text-slate-600">Total Receivable Invoices</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-slate-900 mb-1">4</div>
          <div className="text-sm text-slate-600">Total Payable Invoices</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-error mb-1">
            {formatCurrency(75298.08)}
          </div>
          <div className="text-sm text-slate-600">Total Overdue</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-success mb-1">
            {formatCurrency(139710.67)}
          </div>
          <div className="text-sm text-slate-600">Paid This Month</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;