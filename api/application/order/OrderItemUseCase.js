
class OrderItemUseCase {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  async createOrderItem(orderItemDTO) {
    const orderItem = {
      quantity: orderItemDTO.quantity,
      price: orderItemDTO.price,
      orderId: orderItemDTO.orderId,
      productId: orderItemDTO.productId,
      inventoryId: orderItemDTO.inventoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await this.orderItemRepository.createOrderItem(orderItem);

    return response;
  }

}