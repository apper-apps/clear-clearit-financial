import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInvoices } from "@/hooks/useInvoices";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import TabNavigation from "@/components/molecules/TabNavigation";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Payables = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  const { invoices, loading, error, loadInvoices, updateInvoiceStatus } = useInvoices("payable");

  const tabs = [
    { id: "all", label: "All invoices", count: invoices?.length || 0 },
    { id: "unpaid", label: "Unpaid", count: invoices?.filter(inv => inv.status === "unpaid")?.length || 0 },
    { id: "scheduled", label: "Scheduled", count: invoices?.filter(inv => inv.status === "scheduled")?.length || 0 },
    { id: "clearing", label: "Clearing", count: invoices?.filter(inv => inv.status === "clearing")?.length || 0 },
    { id: "overdue", label: "Overdue", count: invoices?.filter(inv => inv.status === "overdue")?.length || 0 },
    { id: "paid", label: "Paid", count: invoices?.filter(inv => inv.status === "paid")?.length || 0 }
  ];

  const filteredInvoices = React.useMemo(() => {
    if (!invoices) return [];
    
    let filtered = invoices;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(invoice => invoice.status === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.companyName?.toLowerCase().includes(searchLower) ||
        invoice.invoiceNumber?.toLowerCase().includes(searchLower) ||
        invoice.contactName?.toLowerCase().includes(searchLower) ||
        invoice.email?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [invoices, activeTab, searchTerm]);

  const handleBulkAction = (action) => {
    if (selectedInvoices.length === 0) {
      toast.warning("Please select invoices first");
      return;
    }

    console.log(`Bulk ${action} for invoices:`, selectedInvoices);
    
    if (action === "schedule") {
      toast.success(`Scheduled ${selectedInvoices.length} invoices for payment`);
    } else if (action === "approve") {
      toast.success(`Approved ${selectedInvoices.length} invoices for payment`);
    } else {
      toast.info(`${action} applied to ${selectedInvoices.length} invoices`);
    }
  };

  const handleExportCSV = () => {
    const dataToExport = selectedInvoices.length > 0 
      ? filteredInvoices.filter(inv => selectedInvoices.includes(inv.Id))
      : filteredInvoices;
    
    console.log("Exporting CSV for:", dataToExport);
    toast.success(`Exported ${dataToExport.length} payable invoices to CSV`);
  };

  return (
    <motion.div
    initial={{
        opacity: 0
    }}
    animate={{
        opacity: 1
    }}
    className="space-y-6">
    {/* Header */}
    <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-text-primary">Money Going Out</h1>
            <p className="text-text-secondary mt-1">Manage bills you need to pay and outgoing payments
                          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button
                variant="secondary"
                onClick={() => toast.info("Fetching latest bills...")}>
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />Fetch
                          </Button>
            <Button variant="secondary" onClick={() => toast.info("Upload dialog opened")}>
                <ApperIcon name="Upload" size={16} className="mr-2" />Upload
                          </Button>
            <Button variant="primary" onClick={() => toast.info("Create bill dialog opened")}>
                <ApperIcon name="Plus" size={16} className="mr-2" />Create
                          </Button>
        </div>
    </div>
    {/* Filters & Search */}
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchBar
                placeholder="Search bills by company, invoice number, contact..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="sm:max-w-md" />
            <div className="flex items-center gap-2">
                {selectedInvoices.length > 0 && <>
                    <Button
                        size="small"
                        variant="secondary"
                        onClick={() => handleBulkAction("approve")}>
                        <ApperIcon name="CheckCircle" size={14} className="mr-1" />Approve ({selectedInvoices.length})
                                        </Button>
                    <Button
                        size="small"
                        variant="secondary"
                        onClick={() => handleBulkAction("schedule")}>
                        <ApperIcon name="Calendar" size={14} className="mr-1" />Schedule
                                        </Button>
                    <Button
                        size="small"
                        variant="secondary"
                        onClick={() => handleBulkAction("priority")}>
                        <ApperIcon name="ArrowUp" size={14} className="mr-1" />Priority
                                        </Button>
                </>}
                <Button size="small" variant="secondary" onClick={handleExportCSV}>
                    <ApperIcon name="Download" size={14} className="mr-1" />CSV
                                </Button>
            </div>
        </div>
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
    {/* Invoice Table */}
    <InvoiceTable
        invoices={filteredInvoices}
        loading={loading}
        error={error}
        onRetry={loadInvoices}
        onStatusUpdate={updateInvoiceStatus}
        selectedInvoices={selectedInvoices}
        onSelectionChange={setSelectedInvoices}
        type="payable" />
    {/* Payment Summary */}
    {filteredInvoices.length > 0 && <div className="bg-surface rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Your Payment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-error/5 rounded-lg border border-error/20">
                <div className="text-xl font-bold text-error mb-1">${invoices?.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0).toLocaleString() || "0"}
                </div>
                <div className="text-sm text-text-secondary">Past Due</div>
            </div>
            <div
                className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="text-xl font-bold text-warning mb-1">${invoices?.filter(inv => inv.status === "unpaid").reduce((sum, inv) => sum + inv.amount, 0).toLocaleString() || "0"}
                </div>
                <div className="text-sm text-text-secondary">Still to Pay</div>
            </div>
            <div className="text-center p-4 bg-info/5 rounded-lg border border-info/20">
                <div className="text-xl font-bold text-info mb-1">${invoices?.filter(inv => inv.status === "scheduled").reduce((sum, inv) => sum + inv.amount, 0).toLocaleString() || "0"}
                </div>
                <div className="text-sm text-text-secondary">Scheduled</div>
                <div className="text-sm text-text-secondary">Scheduled Amount</div>
            </div>
            <div
                className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="text-xl font-bold text-success mb-1">${invoices?.filter(inv => inv.status === "clearing").reduce((sum, inv) => sum + inv.amount, 0).toLocaleString() || "0"}
                </div>
                <div className="text-sm text-text-secondary">Processing</div>
            </div>
            <div className="text-sm text-text-secondary">Clearing Amount</div>
        </div>
    </div>}
</motion.div>
  );
};

export default Payables;