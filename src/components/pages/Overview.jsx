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
<div className="bg-surface rounded-lg border border-slate-200 p-6 shadow-sm">
<div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Next Settlement</h2>
          <div className="text-sm text-text-secondary font-medium">
            {formatDate(nextSettlementDate, "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success mb-1">
              {formatCurrency(181904.99)}
            </div>
            <div className="text-sm text-text-secondary font-medium">Receivables Clearing</div>
          </div>

<div className="text-center p-6 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning mb-1">
              {formatCurrency(23456.78)}
            </div>
            <div className="text-sm text-text-secondary font-medium">Payables Clearing</div>
          </div>

<div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">
              {formatCurrency(158448.21)}
            </div>
            <div className="text-sm text-text-secondary font-medium">Net Settlement</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
{/* Bottom Statistics - 4 Metric Row */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-text-primary mb-1">7</div>
          <div className="text-sm text-text-secondary">Total Receivable Invoices</div>
        </div>

<div className="bg-surface p-6 rounded-lg border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-text-primary mb-1">4</div>
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
            {formatCurrency(139710.67)}
          </div>
          <div className="text-sm text-text-secondary">Paid This Month</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;