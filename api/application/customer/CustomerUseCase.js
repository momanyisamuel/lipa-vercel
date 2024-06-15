
class CustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async createCustomer(customerDTO) {
    const customer = {
      name: customerDTO.name,
      email: customerDTO.email,
      phoneNumber: customerDTO.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await this.customerRepository.createCustomer(customer);

    return response;
  }

  async getCustomerById(customerId) {
    return this.customerRepository.getCustomerById(customerId);
  }

  async getCustomers() {
    return this.customerRepository.getCustomers();
  }

    async updateCustomer(customerDTO, customerId) {
        const customer = await this.customerRepository.getCustomerById(customerId);
    
        if (!customer) {
        throw new Error('Customer not found');
        }
    
        customer.name = customerDTO.name;
        customer.email = customerDTO.email;
        customer.phoneNumber = customerDTO.phone;
        customer.updatedAt = new Date();
    
        const response = await this.customerRepository.updateCustomer(customerId, customer);
    
        return response;
    }
}

module.exports = { CustomerUseCase }