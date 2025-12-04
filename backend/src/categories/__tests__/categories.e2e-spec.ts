import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../app.module";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, disconnect } from "mongoose";

describe("Categories (e2e)", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

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

  it("POST /api/categories should create a category", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/categories")
      .send({ name: "Electronics" })
      .expect(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Electronics");
  });

  it("GET /api/categories should return array of categories", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/categories")
      .expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("GET /api/categories/:id should return a single category", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/categories")
      .send({ name: "Furniture" });
    const categoryId = createRes.body._id;

    const res = await request(app.getHttpServer())
      .get(`/api/categories/${categoryId}`)
      .expect(200);
    expect(res.body._id).toBe(categoryId);
    expect(res.body.name).toBe("Furniture");
  });

  it("PATCH /api/categories/:id should update a category", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/categories")
      .send({ name: "Clothing" });
    const categoryId = createRes.body._id;

    const res = await request(app.getHttpServer())
      .patch(`/api/categories/${categoryId}`)
      .send({ name: "Apparel" })
      .expect(200);
    expect(res.body.name).toBe("Apparel");
  });

  it("DELETE /api/categories/:id should delete a category", async () => {
    const createRes = await request(app.getHttpServer())
      .post("/api/categories")
      .send({ name: "Books" });
    const categoryId = createRes.body._id;

    await request(app.getHttpServer())
      .delete(`/api/categories/${categoryId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/categories/${categoryId}`)
      .expect(404);
  });

  it("GET /api/categories/:id should return 404 for non-existent category", async () => {
    await request(app.getHttpServer())
      .get("/api/categories/000000000000000000000000")
      .expect(404);
  });
});
