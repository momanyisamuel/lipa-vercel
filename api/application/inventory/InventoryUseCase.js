const { stat } = require("fs");

class InventoryUseCase {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async getInventory(id) {
    return this.inventoryRepository.getInventory(id);
  }

  async createInventory(inventoryDTO) {
    const inventory = {
      id: inventoryDTO.id,
      name: inventoryDTO.name,
      description: inventoryDTO.description,
      totalItems: inventoryDTO.totalItems,
      totalValue: inventoryDTO.totalValue,
      status: inventoryDTO.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await this.inventoryRepository.createInventory(inventory);

    return response;
  }

    async updateInventory(inventoryDTO, id) {
        const inventory = await this.inventoryRepository.findById(id);
    
        if (!inventory) {
        throw new Error('Inventory not found');
        }
    
        inventory.name = inventoryDTO.name;
        inventory.description = inventoryDTO.description;
        inventory.totalItems = inventoryDTO.totalItems;
        inventory.totalValue = inventoryDTO.totalValue;
        inventory.status = inventoryDTO.status;
        inventory.updatedAt = new Date();
    
        const response = await this.inventoryRepository.update(id, inventory);
    
        return response;
    }

    async deleteInventory(id) {
        const inventory = await this.inventoryRepository.findById(id);
    
        if (!inventory) {
        throw new Error('Inventory not found');
        }
    
        await this.inventoryRepository.delete(id);
    }

    async findAll() {
        return this.inventoryRepository.findAll();
    }

}

module.exports = { InventoryUseCase }