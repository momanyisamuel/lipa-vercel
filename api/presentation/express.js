const { Router } = require('express');
const  { PrismaClient } = require('@prisma/client')
const { PrismaCategoryRepository } = require('../infrastructure/PrismaCategoryRepository');
const { PrismaProductRepository } = require('../infrastructure/PrismaProductRepository');
const { WriteCategoryUseCase } = require('../application/category/WriteCategoryUseCase');
const { WriteProductUseCase } = require('../application/product/WriteProductUseCase');
const { CategoryController } = require('./CategoryController');
const { ProductController } = require('./ProductController');
const { PrismaLibSQL } =  require('@prisma/adapter-libsql')
const { createClient } = require('@libsql/client') 

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

const categoryRepository = new PrismaCategoryRepository(prisma);
const writeCategoryUseCase = new WriteCategoryUseCase(categoryRepository);
const categoryController = new CategoryController(writeCategoryUseCase);

const productRepository = new PrismaProductRepository(prisma);
const writeProductUseCase = new WriteProductUseCase(productRepository);
const productController = new ProductController(writeProductUseCase);



const r = Router();

r.get('/health', (req, res) => res.json({ message: 'Server is running'}));
r.post('/categories', (req, res) => categoryController.create(req, res));
r.put('/categories/:id', (req, res) => categoryController.update(req, res));
r.delete('/categories/:id', (req, res) => categoryController.delete(req, res));
r.get('/categories', (req, res) => categoryController.findAll(req, res));
r.get('/categories/:id', (req, res) => categoryController.findById(req, res));


r.post('/products', (req, res) => productController.save(req, res));
r.put('/products/:id', (req, res) => productController.update(req, res));
r.delete('/products/:id', (req, res) => productController.delete(req, res));
r.get('/products', (req, res) => productController.findAll(req, res));
r.get('/products/:id', (req, res) => productController.findById(req, res));

module.exports = r;