import supertest from "supertest"
import { app } from "../src/application/web.js"
import { getTestProduct, getTestProductById } from "./product-util.js";

describe('POST /api/create/products', function () {
    it('should can create new products', async () => {
        const result = await supertest(app)
            .post("/api/create/products")
            .send({
                name: "test",
                price: 10000,
                image: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.price).toBe(10000);
        expect(result.body.data.image).toBe("test");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(app)
            .post("/api/create/products")
            .send({
                name: "",
                price: 10000,
                image: "test"
            });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    })
})

describe('GET /api/products/:id', function() {
    it('should can get product by id', async () => {
        const testProduct = await getTestProductById()

        const result = await supertest(app)
        .get("/api/products/" + testProduct.id)

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe(testProduct.name);
        expect(result.body.data.price).toBe(testProduct.price);
        expect(result.body.data.image).toBe(testProduct.image);
    });

    it('should return 404 if product is not found', async () => {
        const testProduct = await getTestProductById()

        const result = await supertest(app)
        .get("/api/products/" + (testProduct.id + 70))

        expect(result.status).toBe(404);
    })
})

describe('GET /api/products', function() {
    it('should can get all products', async () => {
        const testProduct = await getTestProduct()

        const result = await supertest(app)
        .get("/api/products")

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe(testProduct.name);
        expect(result.body.data.price).toBe(testProduct.price);
        expect(result.body.data.image).toBe(testProduct.image);
    });
});