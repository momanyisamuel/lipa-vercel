
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }

    async save(req, res) {
        try {
            const product = await this.productUseCase.save(req.body);

            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const product = await this.productUseCase.update(req.body, req.params.id);

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.productUseCase.delete(req.params.id);

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const products = await this.productUseCase.productRepository.findAll();

            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const product = await this.productUseCase.productRepository.findById(req.params.id);

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = { ProductController }