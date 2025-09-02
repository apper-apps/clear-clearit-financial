import settlementsData from "@/services/mockData/settlements.json";

class SettlementService {
  constructor() {
    this.settlements = [...settlementsData];
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.settlements];
  }

  async getById(Id) {
    await this.delay();
    const settlement = this.settlements.find(item => item.Id === parseInt(Id));
    if (!settlement) {
      throw new Error(`Settlement with Id ${Id} not found`);
    }
    return { ...settlement };
  }

  async getLatest() {
    await this.delay();
    const sorted = this.settlements
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.length > 0 ? { ...sorted[0] } : null;
  }

  async getUpcoming() {
    await this.delay();
    return this.settlements
      .filter(settlement => settlement.status === "pending")
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(settlement => ({ ...settlement }));
  }

  async create(settlementData) {
    await this.delay();
    
    const maxId = Math.max(...this.settlements.map(settlement => settlement.Id));
    const newSettlement = {
      Id: maxId + 1,
      ...settlementData,
      status: "pending"
    };

    this.settlements.push(newSettlement);
    return { ...newSettlement };
  }

  async update(Id, updateData) {
    await this.delay();
    
    const index = this.settlements.findIndex(settlement => settlement.Id === parseInt(Id));
    if (index === -1) {
      throw new Error(`Settlement with Id ${Id} not found`);
    }

    this.settlements[index] = { ...this.settlements[index], ...updateData };
    return { ...this.settlements[index] };
  }

  async markCompleted(Id) {
    return this.update(Id, { 
      status: "completed",
      completedDate: new Date().toISOString().split("T")[0]
    });
  }
}

export default new SettlementService();