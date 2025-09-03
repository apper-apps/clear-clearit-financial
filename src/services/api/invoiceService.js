import { toast } from 'react-toastify';

class InvoiceService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'invoice_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "amount_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "paid_date_c" } },
          { field: { Name: "company_name_c" } },
          { field: { Name: "invoice_number_c" } },
          { field: { Name: "pay_id_c" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "type_c" } }
        ],
        orderBy: [
          { fieldName: "Id", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI expected format
      return response.data.map(invoice => ({
        Id: invoice.Id,
        amount: invoice.amount_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c,
        companyName: invoice.company_name_c,
        invoiceNumber: invoice.invoice_number_c,
        payId: invoice.pay_id_c,
        abn: invoice.abn_c,
        contactName: invoice.contact_name_c,
        email: invoice.email_c,
        mobile: invoice.mobile_c,
        status: invoice.status_c,
        type: invoice.type_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching invoices:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(Id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "amount_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "paid_date_c" } },
          { field: { Name: "company_name_c" } },
          { field: { Name: "invoice_number_c" } },
          { field: { Name: "pay_id_c" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "type_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, Id, params);
      
      if (!response || !response.data) {
        return null;
      }

      const invoice = response.data;
      return {
        Id: invoice.Id,
        amount: invoice.amount_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c,
        companyName: invoice.company_name_c,
        invoiceNumber: invoice.invoice_number_c,
        payId: invoice.pay_id_c,
        abn: invoice.abn_c,
        contactName: invoice.contact_name_c,
        email: invoice.email_c,
        mobile: invoice.mobile_c,
        status: invoice.status_c,
        type: invoice.type_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching invoice with ID ${Id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getByType(type) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "amount_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "paid_date_c" } },
          { field: { Name: "company_name_c" } },
          { field: { Name: "invoice_number_c" } },
          { field: { Name: "pay_id_c" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "type_c" } }
        ],
        where: [
          {
            FieldName: "type_c",
            Operator: "EqualTo",
            Values: [type]
          }
        ],
        orderBy: [
          { fieldName: "Id", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(invoice => ({
        Id: invoice.Id,
        amount: invoice.amount_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c,
        companyName: invoice.company_name_c,
        invoiceNumber: invoice.invoice_number_c,
        payId: invoice.pay_id_c,
        abn: invoice.abn_c,
        contactName: invoice.contact_name_c,
        email: invoice.email_c,
        mobile: invoice.mobile_c,
        status: invoice.status_c,
        type: invoice.type_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching invoices by type:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getReceivables() {
    return this.getByType("receivable");
  }

  async getPayables() {
    return this.getByType("payable");
  }

  async getByStatus(status, type = null) {
    try {
      const whereConditions = [
        {
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: [status]
        }
      ];

      if (type) {
        whereConditions.push({
          FieldName: "type_c",
          Operator: "EqualTo",
          Values: [type]
        });
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "amount_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "paid_date_c" } },
          { field: { Name: "company_name_c" } },
          { field: { Name: "invoice_number_c" } },
          { field: { Name: "pay_id_c" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "type_c" } }
        ],
        where: whereConditions,
        orderBy: [
          { fieldName: "Id", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(invoice => ({
        Id: invoice.Id,
        amount: invoice.amount_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c,
        companyName: invoice.company_name_c,
        invoiceNumber: invoice.invoice_number_c,
        payId: invoice.pay_id_c,
        abn: invoice.abn_c,
        contactName: invoice.contact_name_c,
        email: invoice.email_c,
        mobile: invoice.mobile_c,
        status: invoice.status_c,
        type: invoice.type_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching invoices by status:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async create(invoiceData) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: invoiceData.Name || invoiceData.invoiceNumber || '',
            Tags: invoiceData.Tags || '',
            amount_c: invoiceData.amount,
            due_date_c: invoiceData.dueDate,
            paid_date_c: invoiceData.paidDate,
            company_name_c: invoiceData.companyName,
            invoice_number_c: invoiceData.invoiceNumber,
            pay_id_c: invoiceData.payId || `asp${invoiceData.invoiceNumber}@clearitt.com`,
            abn_c: invoiceData.abn,
            contact_name_c: invoiceData.contactName,
            email_c: invoiceData.email,
            mobile_c: invoiceData.mobile,
            status_c: invoiceData.status,
            type_c: invoiceData.type
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} invoice records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          const createdRecord = successfulRecords[0].data;
          return {
            Id: createdRecord.Id,
            amount: createdRecord.amount_c,
            dueDate: createdRecord.due_date_c,
            paidDate: createdRecord.paid_date_c,
            companyName: createdRecord.company_name_c,
            invoiceNumber: createdRecord.invoice_number_c,
            payId: createdRecord.pay_id_c,
            abn: createdRecord.abn_c,
            contactName: createdRecord.contact_name_c,
            email: createdRecord.email_c,
            mobile: createdRecord.mobile_c,
            status: createdRecord.status_c,
            type: createdRecord.type_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating invoice:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(Id, updateData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(Id),
            // Only include Updateable fields that are being updated
            ...(updateData.Name !== undefined && { Name: updateData.Name }),
            ...(updateData.Tags !== undefined && { Tags: updateData.Tags }),
            ...(updateData.amount !== undefined && { amount_c: updateData.amount }),
            ...(updateData.dueDate !== undefined && { due_date_c: updateData.dueDate }),
            ...(updateData.paidDate !== undefined && { paid_date_c: updateData.paidDate }),
            ...(updateData.companyName !== undefined && { company_name_c: updateData.companyName }),
            ...(updateData.invoiceNumber !== undefined && { invoice_number_c: updateData.invoiceNumber }),
            ...(updateData.payId !== undefined && { pay_id_c: updateData.payId }),
            ...(updateData.abn !== undefined && { abn_c: updateData.abn }),
            ...(updateData.contactName !== undefined && { contact_name_c: updateData.contactName }),
            ...(updateData.email !== undefined && { email_c: updateData.email }),
            ...(updateData.mobile !== undefined && { mobile_c: updateData.mobile }),
            ...(updateData.status !== undefined && { status_c: updateData.status }),
            ...(updateData.type !== undefined && { type_c: updateData.type })
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} invoice records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          const updatedRecord = successfulUpdates[0].data;
          return {
            Id: updatedRecord.Id,
            amount: updatedRecord.amount_c,
            dueDate: updatedRecord.due_date_c,
            paidDate: updatedRecord.paid_date_c,
            companyName: updatedRecord.company_name_c,
            invoiceNumber: updatedRecord.invoice_number_c,
            payId: updatedRecord.pay_id_c,
            abn: updatedRecord.abn_c,
            contactName: updatedRecord.contact_name_c,
            email: updatedRecord.email_c,
            mobile: updatedRecord.mobile_c,
            status: updatedRecord.status_c,
            type: updatedRecord.type_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating invoice:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async updateStatus(Id, status) {
    return this.update(Id, { 
      status,
      paidDate: status === "paid" ? new Date().toISOString().split("T")[0] : null
    });
  }

  async delete(Id) {
    try {
      const params = {
        RecordIds: [parseInt(Id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} invoice records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting invoice:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async getSummary() {
    try {
      const allInvoices = await this.getAll();
      
      const receivables = allInvoices.filter(invoice => invoice.type === "receivable");
      const payables = allInvoices.filter(invoice => invoice.type === "payable");

      const receivablesSummary = {
        total: receivables.reduce((sum, inv) => sum + (inv.amount || 0), 0),
        count: receivables.length,
        clearing: receivables.filter(inv => inv.status === "clearing").reduce((sum, inv) => sum + (inv.amount || 0), 0),
        paid: receivables.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + (inv.amount || 0), 0),
        overdue: receivables.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + (inv.amount || 0), 0)
      };

      const payablesSummary = {
        total: payables.reduce((sum, inv) => sum + (inv.amount || 0), 0),
        count: payables.length,
        clearing: payables.filter(inv => inv.status === "clearing").reduce((sum, inv) => sum + (inv.amount || 0), 0),
        unpaid: payables.filter(inv => inv.status === "unpaid").reduce((sum, inv) => sum + (inv.amount || 0), 0),
        overdue: payables.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + (inv.amount || 0), 0)
      };

      return {
        receivables: receivablesSummary,
        payables: payablesSummary,
        netReceivable: receivablesSummary.total - payablesSummary.total
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error getting invoice summary:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return {
        receivables: { total: 0, count: 0, clearing: 0, paid: 0, overdue: 0 },
        payables: { total: 0, count: 0, clearing: 0, unpaid: 0, overdue: 0 },
        netReceivable: 0
      };
    }
  }
}

export default new InvoiceService();