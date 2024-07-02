import supertest from "supertest"
import { app } from "../src/application/web.js"
import { getTestTransactions, getTestTransactionsById } from "./transaction-util.js";

describe('POST /api/create/transactions', function () {
    it('should can create new products', async () => {
        const result = await supertest(app)
            .post("/api/create/transactions")
            .send({
                products: 1,
                customer_name: "midori",
                customer_email: "midori@gmail.com",
                payment_method: "AKULAKU"
            });

        expect(result.status).toBe(200);
    });

    it('should reject if email is not sign up', async () => {
        const result = await supertest(app)
            .post("/api/create/transactions")
            .send({
                products: 1,
                customer_name: "zilong",
                customer_email: "zilong@gmail.com",
                payment_method: "DANA"
            });

            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();
    })
})

describe('GET /api/transactions', function() {
    it('should can get all products', async () => {
        const testTransaction = await getTestTransactions()

        const result = await supertest(app)
        .get("/api/transactions")

        expect(result.status).toBe(200);
        expect(result.body.data.total).toBe(testTransaction.total);
        expect(result.body.data.status).toBe(testTransaction.status);
        expect(result.body.data.customer_name).toBe(testTransaction.customer_name);
        expect(result.body.data.customer_email).toBe(testTransaction.customer_email);
        expect(result.body.data.snap_token).toBe(testTransaction.snap_token);
        expect(result.body.data.snap_redirect_url).toBe(testTransaction.snap_redirect_url);
        expect(result.body.data.payment_method).toBe(testTransaction.payment_method);
    });
});

describe('GET /api/transactions/:id', function() {
    it('should can get transactions by id', async () => {
        const testTransaction = await getTestTransactionsById()

        const result = await supertest(app)
        .get("/api/transactions/" + testTransaction.id)

        expect(result.status).toBe(200);
        expect(result.body.data.total).toBe(testTransaction.total);
        expect(result.body.data.status).toBe(testTransaction.status);
        expect(result.body.data.customer_name).toBe(testTransaction.customer_name);
        expect(result.body.data.customer_email).toBe(testTransaction.customer_email);
        expect(result.body.data.snap_token).toBe(testTransaction.snap_token);
        expect(result.body.data.snap_redirect_url).toBe(testTransaction.snap_redirect_url);
        expect(result.body.data.payment_method).toBe(testTransaction.payment_method);
    });

    it('should return 404 if transactions is not found', async () => {
        const testProduct = await getTestTransactionsById()

        const result = await supertest(app)
        .get("/api/transactions/" + (testProduct.id + 90))

        expect(result.status).toBe(404);
    })
})

describe('PUT /api/update/transactions/:id', () => {
    it('should can update existing transactions', async () => {

        const result = await supertest(app)
        .put("/api/update/transactions/" + 51)
        .send({
            payment_method: 'SHOPEEPAY'
        })
        expect(result.status).toBe(200);
    })
})