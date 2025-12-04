import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../app.module";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, disconnect } from "mongoose";

describe("Products (e2e)", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let categoryId: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/inventory_test';
    await connect(uri);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();

    // Create a category for product tests
    const categoryRes = await request(app.getHttpServer())
      .post("/api/categories")
      .send({ name: "Default Category" });
    categoryId = categoryRes.body._id;
  }, 30000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await disconnect();
    if (mongod) {
      await mongod.stop();
    }
  });

  it("POST /api/products should create a product", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/products")
      .send({
        name: "Laptop",
        description: "High-performance laptop",
        price: 1200,
        stock: 5,
        category_id: categoryId,
      })
      .expect(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Laptop");
    expect(res.body.price).toBe(1200);
  });

  it("GET /api/products should return array of products", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/products")
      .expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("GET /api/products/:id should return a single product", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/products")
      .send({
        name: "Mouse",
        price: 25,
        stock: 100,
        category_id: categoryId,
      });
    const productId = createRes.body._id;

    const res = await request(app.getHttpServer())
      .get(`/api/products/${productId}`)
      .expect(200);
    expect(res.body._id).toBe(productId);
    expect(res.body.name).toBe("Mouse");
  });

  it("PATCH /api/products/:id should update a product", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/products")
      .send({
        name: "Keyboard",
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

  it("DELETE /api/products/:id should delete a product", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/products")
      .send({
        name: "Monitor",
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

  it("GET /api/products/:id should return 404 for non-existent product", async () => {
    await request(app.getHttpServer())
      .get("/api/products/000000000000000000000000")
      .expect(404);
  });
});
