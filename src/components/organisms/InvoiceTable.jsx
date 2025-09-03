import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatABN, formatCurrency } from "@/utils/currency";
import { formatDate, getDueDateStatus, isOverdue } from "@/utils/dates";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

// Tooltip component for action buttons
const Tooltip = ({ children, text, position = "top" }) => {
  return (
    <div className="relative inline-flex tooltip-container">
      {children}
      <div className={cn(
        "tooltip absolute z-50 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded shadow-lg opacity-0 invisible transition-all duration-200 pointer-events-none whitespace-nowrap",
        position === "top" && "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        position === "bottom" && "top-full left-1/2 transform -translate-x-1/2 mt-2"
      )}>
        {text}
        <div className={cn(
          "absolute w-2 h-2 bg-slate-900 transform rotate-45",
          position === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
          position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 -mb-1"
        )} />
      </div>
    </div>
  );
};

const InvoiceTable = ({ 
  invoices = [],
  loading = false, 
  error = null, 
  onRetry, 
  onStatusUpdate,
  selectedInvoices = [],
  onSelectionChange,
  type = "receivable"
}) => {
const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editValues, setEditValues] = useState({});

  const sortedInvoices = React.useMemo(() => {
    if (!sortConfig.key) return invoices;

    return [...invoices].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle different data types
      if (sortConfig.key === "amount") {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      } else if (sortConfig.key === "dueDate" || sortConfig.key === "paidDate") {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      } else {
        aVal = String(aVal || "").toLowerCase();
        bVal = String(bVal || "").toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [invoices, sortConfig]);

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error 
        message="Failed to load invoices. Please try again." 
        onRetry={onRetry}
      />
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <Empty
        title="No invoices found"
        description={`You don't have any ${type} invoices at the moment.`}
        icon="FileText"
        action={() => console.log("Create invoice")}
        actionLabel="Create Invoice"
      />
    );
  }

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange?.(sortedInvoices.map(invoice => invoice.Id));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectInvoice = (invoiceId, checked) => {
    if (checked) {
      onSelectionChange?.([...selectedInvoices, invoiceId]);
    } else {
      onSelectionChange?.(selectedInvoices.filter(id => id !== invoiceId));
    }
  };

  const startEditing = (invoice) => {
    setEditingInvoice(invoice.Id);
    setEditValues({
      amount: invoice.amount,
      companyName: invoice.companyName,
      contactName: invoice.contactName,
      email: invoice.email,
      mobile: invoice.mobile
    });
  };

  const saveEdit = () => {
    // In a real app, this would call an update service
    console.log("Updating invoice:", editingInvoice, editValues);
    setEditingInvoice(null);
    setEditValues({});
  };

  const cancelEdit = () => {
    setEditingInvoice(null);
    setEditValues({});
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-xs font-semibold text-slate-600 uppercase tracking-wide hover:text-slate-900"
    >
      <span>{children}</span>
      <ApperIcon
        name={
          sortConfig.key === column
            ? sortConfig.direction === "asc"
              ? "ChevronUp"
              : "ChevronDown"
            : "ChevronsUpDown"
        }
        size={12}
      />
    </button>
  );

const EditableCell = ({ value, field, type = "text", invoiceId }) => {
    if (editingInvoice === invoiceId) {
      return (
        <Input
          type={type}
          value={editValues[field] || ""}
          onChange={(e) => setEditValues(prev => ({ 
            ...prev, 
            [field]: e.target.value 
          }))}
          className="text-sm"
        />
      );
    }
    
    if (type === "currency") {
      return <span className="font-semibold currency-aud">{formatCurrency(value)}</span>;
    }
    
    return <span>{value || "-"}</span>;
  };

  const allSelected = selectedInvoices.length === sortedInvoices.length;
  const someSelected = selectedInvoices.length > 0 && selectedInvoices.length < sortedInvoices.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-primary/50"
                />
              </th>
              <th className="px-4 py-3 text-left">
<SortButton column="amount">Amount</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
<SortButton column="dueDate">Due Date</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton column="paidDate">Paid Date</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton column="companyName">Company</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
<SortButton column="invoiceNumber">Invoice #</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
<SortButton column="payId">PayID</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton column="abn">ABN</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton column="status">Status</SortButton>
              </th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <AnimatePresence>
              {sortedInvoices.map((invoice, index) => {
                const isSelected = selectedInvoices.includes(invoice.Id);
                const isEditing = editingInvoice === invoice.Id;
                const dueDateStatus = getDueDateStatus(invoice.dueDate);
                
                return (
                  <motion.tr
                    key={invoice.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={cn(
                      "hover:bg-slate-50 transition-colors duration-150",
                      isSelected && "bg-blue-50",
                      isEditing && "bg-yellow-50"
                    )}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectInvoice(invoice.Id, e.target.checked)}
                        className="rounded border-slate-300 text-primary focus:ring-primary/50"
                      />
                    </td>
<td className="px-4 py-4">
                      <EditableCell 
                        value={invoice.amount} 
                        field="amount" 
                        type="currency" 
                        invoiceId={invoice.Id}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className={cn(
                          "text-sm",
                          dueDateStatus === "overdue" && "text-error font-medium",
                          dueDateStatus === "due-today" && "text-warning font-medium",
                          dueDateStatus === "due-soon" && "text-info font-medium"
                        )}>
                          {formatDate(invoice.dueDate)}
                        </div>
                        {dueDateStatus === "overdue" && (
                          <div className="text-xs text-error">Overdue</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {invoice.paidDate ? formatDate(invoice.paidDate) : "-"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
<EditableCell 
                          value={invoice.companyName} 
                          field="companyName" 
                          invoiceId={invoice.Id}
                        />
                        {invoice.contactName && (
                          <EditableCell 
                            value={invoice.contactName} 
                            field="contactName" 
                            invoiceId={invoice.Id}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-sm">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-600">
                      {invoice.payId}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs abn-format">
                      {formatABN(invoice.abn)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="small"
                              variant="success"
                              onClick={saveEdit}
                            >
                              <ApperIcon name="Check" size={14} />
                            </Button>
                            <Button
                              size="small"
                              variant="secondary"
                              onClick={cancelEdit}
                            >
                              <ApperIcon name="X" size={14} />
                            </Button>
                          </>
                        ) : (
                          <>
<Tooltip text="Edit Invoice Details">
                              <Button
                                size="small"
                                variant="ghost"
                                onClick={() => startEditing(invoice)}
                              >
                                <ApperIcon name="Edit3" size={14} />
                              </Button>
                            </Tooltip>
                            <Tooltip text="Mark as Paid">
                              <Button
                                size="small"
                                variant="ghost"
                                onClick={() => onStatusUpdate?.(invoice.Id, "paid")}
                              >
                                <ApperIcon name="CheckCircle" size={14} />
                              </Button>
                            </Tooltip>
                          </>
                        )}
</div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">
            {selectedInvoices.length > 0
              ? `${selectedInvoices.length} of ${sortedInvoices.length} selected`
              : `${sortedInvoices.length} total invoices`}
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Total Amount:</span>
            <span className="font-bold currency-aud">
              {formatCurrency(
                sortedInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceTable;