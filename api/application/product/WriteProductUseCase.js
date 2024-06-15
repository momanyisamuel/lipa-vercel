const uuid = require('crypto');

class WriteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

    async save(productDTO) {
        const product = {
        id: uuid.randomUUID(),
        name: productDTO.name,
        description: productDTO.description,
        price: productDTO.price,
        categoryId: productDTO.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
        };
    
        await this.productRepository.create(product);
    
        return product;
    }

    async update(productDTO, id) {
        const product = await this.productRepository.findById(id);
    
        if (!product) {
        throw new Error('Product not found');
        }
    
        product.name = productDTO.name;
        product.description = productDTO.description;
        product.price = productDTO.price;
        product.categoryId = productDTO.categoryId;
        product.updatedAt = new Date();
    
        await this.productRepository.update(id, product);
    
        return product;
    }

    async delete(id) {
        const product = await this.productRepository.findById(id);
    
        if (!product) {
        throw new Error('Product not found');
        }
    
        await this.productRepository.delete(id);
    }
}

module.exports = { WriteProductUseCase }