import invoicesData from "@/services/mockData/invoices.json";

class InvoiceService {
  constructor() {
    this.invoices = [...invoicesData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.invoices];
  }

  async getById(Id) {
    await this.delay();
    const invoice = this.invoices.find(item => item.Id === parseInt(Id));
    if (!invoice) {
      throw new Error(`Invoice with Id ${Id} not found`);
    }
    return { ...invoice };
  }

  async getByType(type) {
    await this.delay();
    return this.invoices.filter(invoice => invoice.type === type).map(invoice => ({ ...invoice }));
  }

  async getReceivables() {
    return this.getByType("receivable");
  }

  async getPayables() {
    return this.getByType("payable");
  }

  async getByStatus(status, type = null) {
    await this.delay();
    let filtered = this.invoices.filter(invoice => invoice.status === status);
    if (type) {
      filtered = filtered.filter(invoice => invoice.type === type);
    }
    return filtered.map(invoice => ({ ...invoice }));
  }

  async create(invoiceData) {
    await this.delay();
    
    const maxId = Math.max(...this.invoices.map(invoice => invoice.Id));
    const newInvoice = {
      Id: maxId + 1,
      ...invoiceData,
      payId: invoiceData.payId || `asp${invoiceData.invoiceNumber}@clearitt.com`
    };

    this.invoices.push(newInvoice);
    return { ...newInvoice };
  }

  async update(Id, updateData) {
    await this.delay();
    
    const index = this.invoices.findIndex(invoice => invoice.Id === parseInt(Id));
    if (index === -1) {
      throw new Error(`Invoice with Id ${Id} not found`);
    }

    this.invoices[index] = { ...this.invoices[index], ...updateData };
    return { ...this.invoices[index] };
  }

  async updateStatus(Id, status) {
    return this.update(Id, { 
      status,
      paidDate: status === "paid" ? new Date().toISOString().split("T")[0] : null
    });
  }

  async delete(Id) {
    await this.delay();
    
    const index = this.invoices.findIndex(invoice => invoice.Id === parseInt(Id));
    if (index === -1) {
      throw new Error(`Invoice with Id ${Id} not found`);
    }

    const deletedInvoice = this.invoices.splice(index, 1)[0];
    return { ...deletedInvoice };
  }

  // Analytics methods
  async getSummary() {
    await this.delay();
    
    const receivables = this.invoices.filter(invoice => invoice.type === "receivable");
    const payables = this.invoices.filter(invoice => invoice.type === "payable");

    const receivablesSummary = {
      total: receivables.reduce((sum, inv) => sum + inv.amount, 0),
      count: receivables.length,
      clearing: receivables.filter(inv => inv.status === "clearing").reduce((sum, inv) => sum + inv.amount, 0),
      paid: receivables.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0),
      overdue: receivables.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)
    };

    const payablesSummary = {
      total: payables.reduce((sum, inv) => sum + inv.amount, 0),
      count: payables.length,
      clearing: payables.filter(inv => inv.status === "clearing").reduce((sum, inv) => sum + inv.amount, 0),
      unpaid: payables.filter(inv => inv.status === "unpaid").reduce((sum, inv) => sum + inv.amount, 0),
      overdue: payables.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)
    };

    return {
      receivables: receivablesSummary,
      payables: payablesSummary,
      netReceivable: receivablesSummary.total - payablesSummary.total
    };
  }
}

export default new InvoiceService();