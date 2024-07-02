import supertest from "supertest"
import { app } from "../src/application/web.js"
import { prismaClient } from "../src/application/database.js"
import { logger } from "../src/application/logging.js"
import { getTestSample } from "./test-util.js"
import { sum, createTestSample } from "./test-util.js";

describe('GET /api/samples', function() {
    it('you can see all data samples', async () => {
        const testSample = await getTestSample()

        const result = await supertest(app)
        .get("/api/samples" + testSample.id)

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testSample.id);
        expect(result.body.data.username).toBe(testSample.username);
        expect(result.body.data.city).toBe(testSample.city);
    })
})

// describe('POST /api/create/samples', function () {
//     it('should can create new samples', async () => {
//         const result = await supertest(app)
//             .post("/api/create/samples")
//             .send({
//                 username: "test",
//                 city: "test"
//             });

//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe("test");
//         expect(result.body.data.city).toBe("test");
//     });
// })

test("test sum function", () => {
    const result = sum(1,2)

    expect(result).toBe(3);
})