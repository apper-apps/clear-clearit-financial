import companiesData from "@/services/mockData/companies.json";

class CompanyService {
  constructor() {
    this.companies = [...companiesData];
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.companies];
  }

  async getById(Id) {
    await this.delay();
    const company = this.companies.find(item => item.Id === parseInt(Id));
    if (!company) {
      throw new Error(`Company with Id ${Id} not found`);
    }
    return { ...company };
  }

  async create(companyData) {
    await this.delay();
    
    const maxId = Math.max(...this.companies.map(company => company.Id));
    const newCompany = {
      Id: maxId + 1,
      ...companyData
    };

    this.companies.push(newCompany);
    return { ...newCompany };
  }

  async update(Id, updateData) {
    await this.delay();
    
    const index = this.companies.findIndex(company => company.Id === parseInt(Id));
    if (index === -1) {
      throw new Error(`Company with Id ${Id} not found`);
    }

    this.companies[index] = { ...this.companies[index], ...updateData };
    return { ...this.companies[index] };
  }

  async delete(Id) {
    await this.delay();
    
    const index = this.companies.findIndex(company => company.Id === parseInt(Id));
    if (index === -1) {
      throw new Error(`Company with Id ${Id} not found`);
    }

    const deletedCompany = this.companies.splice(index, 1)[0];
    return { ...deletedCompany };
  }

  async searchByName(name) {
    await this.delay();
    const searchTerm = name.toLowerCase();
    return this.companies
      .filter(company => company.name.toLowerCase().includes(searchTerm))
      .map(company => ({ ...company }));
  }
}

export default new CompanyService();