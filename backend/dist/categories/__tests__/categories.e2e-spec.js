"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../../app.module");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
describe('Categories (e2e)', () => {
    let app;
    let mongod;
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
    });
    afterAll(async () => {
        await app.close();
        await (0, mongoose_1.disconnect)();
        await mongod.stop();
    });
    it('POST /api/categories should create a category', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/categories')
            .send({ name: 'Electronics' })
            .expect(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Electronics');
    });
    it('GET /api/categories should return array of categories', async () => {
        const res = await request(app.getHttpServer())
            .get('/api/categories')
            .expect(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
    it('GET /api/categories/:id should return a single category', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/categories')
            .send({ name: 'Furniture' });
        const categoryId = createRes.body._id;
        const res = await request(app.getHttpServer())
            .get(`/api/categories/${categoryId}`)
            .expect(200);
        expect(res.body._id).toBe(categoryId);
        expect(res.body.name).toBe('Furniture');
    });
    it('PATCH /api/categories/:id should update a category', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/categories')
            .send({ name: 'Clothing' });
        const categoryId = createRes.body._id;
        const res = await request(app.getHttpServer())
            .patch(`/api/categories/${categoryId}`)
            .send({ name: 'Apparel' })
            .expect(200);
        expect(res.body.name).toBe('Apparel');
    });
    it('DELETE /api/categories/:id should delete a category', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/api/categories')
            .send({ name: 'Books' });
        const categoryId = createRes.body._id;
        await request(app.getHttpServer())
            .delete(`/api/categories/${categoryId}`)
            .expect(200);
        await request(app.getHttpServer())
            .get(`/api/categories/${categoryId}`)
            .expect(404);
    });
    it('GET /api/categories/:id should return 404 for non-existent category', async () => {
        await request(app.getHttpServer())
            .get('/api/categories/000000000000000000000000')
            .expect(404);
    });
});
//# sourceMappingURL=categories.e2e-spec.js.map