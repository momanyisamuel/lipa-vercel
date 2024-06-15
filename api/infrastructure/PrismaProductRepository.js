
class PrismaProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    
    async create(product) {
        try {
            const response = await this.prisma.product.create({
                data: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    categoryId: product.categoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
            });

            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async update(id, product) {
        const response = await this.prisma.product.update({
            where: {
                id,
            },
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId,
                updatedAt: product.updatedAt,
            },
        });

        return response;
    }

    async delete(id) {
        const response = await this.prisma.product.delete({
            where: {
                id,
            },
        });
        if (response) {
            return true;
        }
        return false;
    }

    async findById(id) {
        const response = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!response) {
            return null;
        }

        return response;
    }

    async findAll() {
        const response = await this.prisma.product.findMany();
        
        return response;
    }
}



module.exports = { PrismaProductRepository }