const { stat } = require("fs");

class OrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(orderDTO) {
    const order = {
      customerId: orderDTO.customerId,
      orderNumber: orderDTO.orderNumber,
      total: orderDTO.total,
      status: orderDTO.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await this.orderRepository.createOrder(order);

    return response;
  }

   async updateOrder(orderDTO, orderId) {
       const order = await this.orderRepository.getOrderById(orderId);
   
       if (!order) {
       throw new Error('Order not found');
       }
   
       order.customerId = orderDTO.customerId;
       order.orderNumber = orderDTO.orderNumber;
       order.total = orderDTO.total;
       order.status = orderDTO.status;
       order.updatedAt = new Date();
   
       const response = await this.orderRepository.updateOrder(orderId, order);
   
       return response;
   }

    async getOrders() {
        return this.orderRepository.getOrders();
    }

    async getOrderById(orderId) {
        return this.orderRepository.getOrderById(orderId);
    }

    async deleteOrder(orderId) {
        const order = await this.orderRepository.getOrderById(orderId);
    
        if (!order) {
        throw new Error('Order not found');
        }
    
        await this.orderRepository.deleteOrder(orderId);
    }
}

module.exports = { OrderUseCase }