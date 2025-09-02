import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import invoiceService from "@/services/api/invoiceService";

export const useInvoices = (type = null, status = null) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (type && status) {
        data = await invoiceService.getByStatus(status, type);
      } else if (type) {
        data = await invoiceService.getByType(type);
      } else if (status) {
        data = await invoiceService.getByStatus(status);
      } else {
        data = await invoiceService.getAll();
      }
      
      setInvoices(data);
    } catch (err) {
      setError(err.message);
      toast.error("Unable to load your invoices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (invoiceId, newStatus) => {
    try {
      await invoiceService.updateStatus(invoiceId, newStatus);
      await loadInvoices(); // Reload data
      toast.success(`Invoice status updated successfully`);
    } catch (err) {
      toast.error("Unable to update invoice status. Please try again.");
      console.error(err);
    }
  };

  const createInvoice = async (invoiceData) => {
    try {
      const newInvoice = await invoiceService.create(invoiceData);
      await loadInvoices(); // Reload data
      toast.success("New invoice created successfully");
      return newInvoice;
    } catch (err) {
      toast.error("Unable to create invoice. Please check your information and try again.");
      throw err;
    }
  };

  const updateInvoice = async (invoiceId, updateData) => {
    try {
      const updatedInvoice = await invoiceService.update(invoiceId, updateData);
      await loadInvoices(); // Reload data
      toast.success("Invoice updated successfully");
      return updatedInvoice;
    } catch (err) {
      toast.error("Unable to update invoice. Please try again.");
      throw err;
    }
  };

  const deleteInvoice = async (invoiceId) => {
    try {
      await invoiceService.delete(invoiceId);
      await loadInvoices(); // Reload data
      toast.success("Invoice deleted successfully");
    } catch (err) {
      toast.error("Unable to delete invoice. Please try again.");
      throw err;
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [type, status]);

  return {
    invoices,
    loading,
    error,
    loadInvoices,
    updateInvoiceStatus,
    createInvoice,
    updateInvoice,
    deleteInvoice
  };
};
export const useInvoiceSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await invoiceService.getSummary();
      setSummary(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load invoice summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return {
    summary,
    loading,
    error,
    loadSummary
  };
};