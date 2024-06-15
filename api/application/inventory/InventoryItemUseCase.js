class InventoryItemUseCase {
  constructor(inventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  async getInventoryItem(id) {
    return this.inventoryItemRepository.getInventoryItem(id);
  }

  async createInventoryItem(inventoryItemDTO) {
    const inventoryItem = {
      name: inventoryItemDTO.name,
      description: inventoryItemDTO.description,
      quantity: inventoryItemDTO.quantity,
      buyingPrice: inventoryItemDTO.buyingPrice,
      sellingPrice: inventoryItemDTO.sellingPrice,
      productId: inventoryItemDTO.productId,
      inventoryId: inventoryItemDTO.inventoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const response = await this.inventoryItemRepository.createInventoryItem(inventoryItem);

    return response;
    }

    async updateInventoryItem(inventoryItemDTO, id) {
        const inventoryItem = await this.inventoryItemRepository.findById(id);
    
        if (!inventoryItem) {
        throw new Error('Inventory Item not found');
        }
    
        inventoryItem.name = inventoryItemDTO.name;
        inventoryItem.description = inventoryItemDTO.description;
        inventoryItem.quantity = inventoryItemDTO.quantity;
        inventoryItem.buyingPrice = inventoryItemDTO.buyingPrice;
        inventoryItem.sellingPrice = inventoryItemDTO.sellingPrice;
        inventoryItem.productId = inventoryItemDTO.productId;
        inventoryItem.inventoryId = inventoryItemDTO.inventoryId;
        inventoryItem.updatedAt = new Date();

        const response = await this.inventoryItemRepository.update(id, inventoryItem);

        return response;

    }

    async deleteInventoryItem(id) {
        const inventoryItem = await this.inventoryItemRepository.findById(id);
    
        if (!inventoryItem) {
        throw new Error('Inventory Item not found');
        }
    
        await this.inventoryItemRepository.delete(id);
    }

    async findAll() {
        return this.inventoryItemRepository.findAll();
    }
}
 

module.exports = { InventoryItemUseCase }