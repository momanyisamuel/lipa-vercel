const uuid = require('crypto');

class WriteCategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async save(categoryDTO) {
        const id = uuid.randomUUID();

        const category = {
            id,
            name: categoryDTO.name,
            description: categoryDTO.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const response = await this.categoryRepository.create(category);

        return response;
    }

    async update(categoryDTO, id) {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error('Category not found');
        }

        category.name = categoryDTO.name;
        category.description = categoryDTO.description;
        category.updatedAt = new Date();

        const response = await this.categoryRepository.update(id, category);

        return response;
    }

    async delete(id) {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error('Category not found');
        }

        await this.categoryRepository.delete(id);
    }
}

module.exports = { WriteCategoryUseCase }