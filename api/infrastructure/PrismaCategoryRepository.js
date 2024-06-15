class PrismaCategoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async create(category) {
        console.log(category, "repository");
        try {
            const response = await this.prisma.category.create({
                data: {
                    name: category.name,
                    description: category.description,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                },
            });

            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async update(id, category) {
        const response = await this.prisma.category.update({
            where: {
                id,
            },
            data: {
                name: category.name,
                description: category.description,
                updatedAt: category.updatedAt,
            },
        });

        return response;
    }

    async delete(id) {
        const response = await this.prisma.category.delete({
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
        const response = await this.prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!response) {
            throw new Error('Category not found');
        }

        return response;
    }

    async findAll() {
        const  data = await this.prisma.category.findMany({
            include: {
                Product: true,
            },
        });
        
        return data;
    }
}



module.exports = { PrismaCategoryRepository };