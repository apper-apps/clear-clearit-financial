import React, { useState } from "react";
import { motion } from "framer-motion";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import TabNavigation from "@/components/molecules/TabNavigation";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useInvoices } from "@/hooks/useInvoices";
import { toast } from "react-toastify";

const Receivables = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  const { invoices, loading, error, loadInvoices, updateInvoiceStatus } = useInvoices("receivable");

  const tabs = [
    { id: "all", label: "All invoices", count: invoices?.length || 0 },
    { id: "paid", label: "Paid", count: invoices?.filter(inv => inv.status === "paid")?.length || 0 },
    { id: "clearing", label: "Set to clear", count: invoices?.filter(inv => inv.status === "clearing")?.length || 0 },
    { id: "overdue", label: "Overdue", count: invoices?.filter(inv => inv.status === "overdue")?.length || 0 },
    { id: "mismatch", label: "Mismatch", count: invoices?.filter(inv => inv.status === "mismatch")?.length || 0 },
    { id: "unpaid", label: "Unpaid", count: invoices?.filter(inv => inv.status === "unpaid")?.length || 0 }
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
    toast.info(`${action} applied to ${selectedInvoices.length} invoices`);
  };

  const handleExportCSV = () => {
    const dataToExport = selectedInvoices.length > 0 
      ? filteredInvoices.filter(inv => selectedInvoices.includes(inv.Id))
      : filteredInvoices;
    
    console.log("Exporting CSV for:", dataToExport);
    toast.success(`Exported ${dataToExport.length} invoices to CSV`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Receivables</h1>
          <p className="text-slate-600 mt-1">
            Manage your incoming payments and invoice collection
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => toast.info("Fetching latest data...")}>
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Fetch
          </Button>
          <Button variant="secondary" onClick={() => toast.info("Upload dialog opened")}>
            <ApperIcon name="Upload" size={16} className="mr-2" />
            Upload
          </Button>
          <Button variant="primary" onClick={() => toast.info("Create invoice dialog opened")}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SearchBar
            placeholder="Search invoices by company, invoice number, contact..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="sm:max-w-md"
          />
          
          <div className="flex items-center gap-2">
            {selectedInvoices.length > 0 && (
              <>
                <Button 
                  size="small" 
                  variant="secondary"
                  onClick={() => handleBulkAction("approve")}
                >
                  <ApperIcon name="CheckCircle" size={14} className="mr-1" />
                  Approve ({selectedInvoices.length})
                </Button>
                <Button 
                  size="small" 
                  variant="secondary"
                  onClick={() => handleBulkAction("remind")}
                >
                  <ApperIcon name="Bell" size={14} className="mr-1" />
                  Remind
                </Button>
              </>
            )}
            <Button 
              size="small" 
              variant="secondary"
              onClick={handleExportCSV}
            >
              <ApperIcon name="Download" size={14} className="mr-1" />
              CSV
            </Button>
          </div>
        </div>

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
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
        type="receivable"
      />
    </motion.div>
  );
};

export default Receivables;