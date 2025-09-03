import { toast } from 'react-toastify';

class SettlementService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'settlement_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "date_c" } },
          { field: { Name: "total_receivables_c" } },
          { field: { Name: "total_payables_c" } },
          { field: { Name: "net_amount_c" } },
          { field: { Name: "status_c" } }
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
      return response.data.map(settlement => ({
        Id: settlement.Id,
        date: settlement.date_c,
        totalReceivables: settlement.total_receivables_c,
        totalPayables: settlement.total_payables_c,
        netAmount: settlement.net_amount_c,
        status: settlement.status_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching settlements:", error?.response?.data?.message);
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
          { field: { Name: "date_c" } },
          { field: { Name: "total_receivables_c" } },
          { field: { Name: "total_payables_c" } },
          { field: { Name: "net_amount_c" } },
          { field: { Name: "status_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, Id, params);
      
      if (!response || !response.data) {
        return null;
      }

      const settlement = response.data;
      return {
        Id: settlement.Id,
        date: settlement.date_c,
        totalReceivables: settlement.total_receivables_c,
        totalPayables: settlement.total_payables_c,
        netAmount: settlement.net_amount_c,
        status: settlement.status_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching settlement with ID ${Id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getLatest() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "date_c" } },
          { field: { Name: "total_receivables_c" } },
          { field: { Name: "total_payables_c" } },
          { field: { Name: "net_amount_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "date_c", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data || response.data.length === 0) {
        return null;
      }

      const settlement = response.data[0];
      return {
        Id: settlement.Id,
        date: settlement.date_c,
        totalReceivables: settlement.total_receivables_c,
        totalPayables: settlement.total_payables_c,
        netAmount: settlement.net_amount_c,
        status: settlement.status_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching latest settlement:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getUpcoming() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "date_c" } },
          { field: { Name: "total_receivables_c" } },
          { field: { Name: "total_payables_c" } },
          { field: { Name: "net_amount_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: ["pending"]
          }
        ],
        orderBy: [
          { fieldName: "date_c", sorttype: "ASC" }
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

      return response.data.map(settlement => ({
        Id: settlement.Id,
        date: settlement.date_c,
        totalReceivables: settlement.total_receivables_c,
        totalPayables: settlement.total_payables_c,
        netAmount: settlement.net_amount_c,
        status: settlement.status_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming settlements:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async create(settlementData) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: settlementData.Name || `Settlement ${new Date().toISOString().split('T')[0]}`,
            Tags: settlementData.Tags || '',
            date_c: settlementData.date,
            total_receivables_c: settlementData.totalReceivables,
            total_payables_c: settlementData.totalPayables,
            net_amount_c: settlementData.netAmount,
            status_c: settlementData.status || "pending"
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
          console.error(`Failed to create ${failedRecords.length} settlement records:${JSON.stringify(failedRecords)}`);
          
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
            date: createdRecord.date_c,
            totalReceivables: createdRecord.total_receivables_c,
            totalPayables: createdRecord.total_payables_c,
            netAmount: createdRecord.net_amount_c,
            status: createdRecord.status_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating settlement:", error?.response?.data?.message);
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
            ...(updateData.date !== undefined && { date_c: updateData.date }),
            ...(updateData.totalReceivables !== undefined && { total_receivables_c: updateData.totalReceivables }),
            ...(updateData.totalPayables !== undefined && { total_payables_c: updateData.totalPayables }),
            ...(updateData.netAmount !== undefined && { net_amount_c: updateData.netAmount }),
            ...(updateData.status !== undefined && { status_c: updateData.status })
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
          console.error(`Failed to update ${failedUpdates.length} settlement records:${JSON.stringify(failedUpdates)}`);
          
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
            date: updatedRecord.date_c,
            totalReceivables: updatedRecord.total_receivables_c,
            totalPayables: updatedRecord.total_payables_c,
            netAmount: updatedRecord.net_amount_c,
            status: updatedRecord.status_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating settlement:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async markCompleted(Id) {
    return this.update(Id, { 
      status: "completed",
      completedDate: new Date().toISOString().split("T")[0]
    });
  }
}

export default new SettlementService();