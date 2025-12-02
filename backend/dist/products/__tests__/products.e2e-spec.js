"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../../app.module");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
describe('Products (e2e)', () => {
    let app;
    let mongod;
    let categoryId;
    beforeAll(async () => {
        mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        await (0, mongoose_1.connect)(uri);
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
        const categoryRes = await request(app.getHttpServer())
            .post('/api/categories')
            .send({ name: 'Default Category' });
        categoryId = categoryRes.body._id;
    });
    afterAll(async () => {
        await app.close();
        await (0, mongoose_1.disconnect)();
        await mongod.stop();
    });
    it('POST /api/products should create a product', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/products')
            .send({
            name: 'Laptop',
            description: 'High-performance laptop',
            price: 1200,
            stock: 5,
            category_id: categoryId,
        })
            .expect(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Laptop');
        expect(res.body.price).toBe(1200);
    });
    it('GET /api/products should return array of products', async () => {
        const res = await request(app.getHttpServer())
            .get('/api/products')
            .expect(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
    it('GET /api/products/:id should return a single product', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/products')
            .send({
            name: 'Mouse',
            price: 25,
            stock: 100,
            category_id: categoryId,
        });
        const productId = createRes.body._id;
        const res = await request(app.getHttpServer())
            .get(`/api/products/${productId}`)
            .expect(200);
        expect(res.body._id).toBe(productId);
        expect(res.body.name).toBe('Mouse');
    });
    it('PATCH /api/products/:id should update a product', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/products')
            .send({
            name: 'Keyboard',
            price: 80,
            stock: 50,
            category_id: categoryId,
        });
        const productId = createRes.body._id;
        const res = await request(app.getHttpServer())
            .patch(`/api/products/${productId}`)
            .send({ price: 99, stock: 45 })
            .expect(200);
        expect(res.body.price).toBe(99);
        expect(res.body.stock).toBe(45);
    });
    it('DELETE /api/products/:id should delete a product', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/products')
            .send({
            name: 'Monitor',
            price: 300,
            stock: 20,
            category_id: categoryId,
        });
        const productId = createRes.body._id;
        await request(app.getHttpServer())
            .delete(`/api/products/${productId}`)
            .expect(200);
        await request(app.getHttpServer())
            .get(`/api/products/${productId}`)
            .expect(404);
    });
    it('GET /api/products/:id should return 404 for non-existent product', async () => {
        await request(app.getHttpServer())
            .get('/api/products/000000000000000000000000')
            .expect(404);
    });
});
//# sourceMappingURL=products.e2e-spec.js.map