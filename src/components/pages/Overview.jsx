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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Overview</h1>
        <p className="text-slate-600">
          Monitor your receivables, payables, and upcoming settlements
        </p>
      </div>

      {/* Settlement Banner */}
      <SettlementBanner />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Receivables"
          value={summary?.receivables?.total || 0}
          icon="TrendingUp"
          color="success"
          breakdown={[
            { label: "Clearing", value: summary?.receivables?.clearing || 0 },
            { label: "Paid", value: summary?.receivables?.paid || 0 },
            { label: "Overdue", value: summary?.receivables?.overdue || 0 }
          ]}
        />
        
        <MetricCard
          title="Total Payables"
          value={summary?.payables?.total || 0}
          icon="TrendingDown" 
          color="warning"
          breakdown={[
            { label: "Clearing", value: summary?.payables?.clearing || 0 },
            { label: "Unpaid", value: summary?.payables?.unpaid || 0 },
            { label: "Overdue", value: summary?.payables?.overdue || 0 }
          ]}
        />

        <MetricCard
          title="Net Receivable"
          value={summary?.netReceivable || 0}
          icon="DollarSign"
          color="primary"
          change={8.2}
        />
      </div>

      {/* Settlement Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Next Settlement</h2>
          <div className="text-sm text-slate-600">
            {formatDate(nextSettlementDate, "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success mb-1">
              {formatCurrency(summary?.receivables?.clearing || 0)}
            </div>
            <div className="text-sm text-slate-600">Receivables Clearing</div>
          </div>

          <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning mb-1">
              {formatCurrency(summary?.payables?.clearing || 0)}
            </div>
            <div className="text-sm text-slate-600">Payables Clearing</div>
          </div>

          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">
              {formatCurrency((summary?.receivables?.clearing || 0) - (summary?.payables?.clearing || 0))}
            </div>
            <div className="text-sm text-slate-600">Net Settlement</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <div className="text-xl font-bold text-slate-900 mb-1">
            {summary?.receivables?.count || 0}
          </div>
          <div className="text-sm text-slate-600">Total Receivable Invoices</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <div className="text-xl font-bold text-slate-900 mb-1">
            {summary?.payables?.count || 0}
          </div>
          <div className="text-sm text-slate-600">Total Payable Invoices</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <div className="text-xl font-bold text-error mb-1">
            {formatCurrency(summary?.receivables?.overdue + summary?.payables?.overdue || 0)}
          </div>
          <div className="text-sm text-slate-600">Total Overdue</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <div className="text-xl font-bold text-success mb-1">
            {formatCurrency(summary?.receivables?.paid || 0)}
          </div>
          <div className="text-sm text-slate-600">Paid This Month</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;