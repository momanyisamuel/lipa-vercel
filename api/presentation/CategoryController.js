
class CategoryController {
    constructor(writeCategoryUseCase) {
        this.writeCategoryUseCase = writeCategoryUseCase;
    }

    async create(request, response) {
        try {
            const category = await this.writeCategoryUseCase.save(request.body);
            console.log(category, "controller");
            response.status(201).json(category);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    async update(request, response) {
        try {
            const category = await this.writeCategoryUseCase.update(request.body, request.params.id);

            response.status(200).json(category);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    async delete(request, response) {
        try {
            await this.writeCategoryUseCase.delete(request.params.id);

            response.status(204).send();
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    async findAll(request, response) {
        try {
            const categories = await this.writeCategoryUseCase.categoryRepository.findAll();

            response.status(200).json(categories);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    async findById(request, response) {
        try {
            const category = await this.writeCategoryUseCase.categoryRepository.findById(request.params.id);

            response.status(200).json(category);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}


module.exports = { CategoryController }