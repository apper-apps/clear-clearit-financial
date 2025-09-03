import { toast } from 'react-toastify';

class CompanyService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'company_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "primary_contact_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } }
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
      return response.data.map(company => ({
        Id: company.Id,
        name: company.Name,
        abn: company.abn_c,
        primaryContact: company.primary_contact_c,
        email: company.email_c,
        phone: company.phone_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching companies:", error?.response?.data?.message);
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
          { field: { Name: "abn_c" } },
          { field: { Name: "primary_contact_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, Id, params);
      
      if (!response || !response.data) {
        return null;
      }

      const company = response.data;
      return {
        Id: company.Id,
        name: company.Name,
        abn: company.abn_c,
        primaryContact: company.primary_contact_c,
        email: company.email_c,
        phone: company.phone_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching company with ID ${Id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(companyData) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: companyData.name || '',
            Tags: companyData.Tags || '',
            abn_c: companyData.abn,
            primary_contact_c: companyData.primaryContact,
            email_c: companyData.email,
            phone_c: companyData.phone
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
          console.error(`Failed to create ${failedRecords.length} company records:${JSON.stringify(failedRecords)}`);
          
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
            name: createdRecord.Name,
            abn: createdRecord.abn_c,
            primaryContact: createdRecord.primary_contact_c,
            email: createdRecord.email_c,
            phone: createdRecord.phone_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating company:", error?.response?.data?.message);
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
            ...(updateData.name !== undefined && { Name: updateData.name }),
            ...(updateData.Tags !== undefined && { Tags: updateData.Tags }),
            ...(updateData.abn !== undefined && { abn_c: updateData.abn }),
            ...(updateData.primaryContact !== undefined && { primary_contact_c: updateData.primaryContact }),
            ...(updateData.email !== undefined && { email_c: updateData.email }),
            ...(updateData.phone !== undefined && { phone_c: updateData.phone })
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
          console.error(`Failed to update ${failedUpdates.length} company records:${JSON.stringify(failedUpdates)}`);
          
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
            name: updatedRecord.Name,
            abn: updatedRecord.abn_c,
            primaryContact: updatedRecord.primary_contact_c,
            email: updatedRecord.email_c,
            phone: updatedRecord.phone_c
          };
        }
      }
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating company:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
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
          console.error(`Failed to delete ${failedDeletions.length} company records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting company:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async searchByName(name) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "abn_c" } },
          { field: { Name: "primary_contact_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } }
        ],
        where: [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [name]
          }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
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

      return response.data.map(company => ({
        Id: company.Id,
        name: company.Name,
        abn: company.abn_c,
        primaryContact: company.primary_contact_c,
        email: company.email_c,
        phone: company.phone_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching companies:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }
}

export default new CompanyService();