import supertest from "supertest"
import { app } from "../src/application/web.js"
import { logger } from "../src/application/logging.js";
import { getTestUser } from "./user-util.js";

// describe('POST /api/register', function () {
//     it('should can register for new user', async () => {
//         const result = await supertest(app)
//         .post("/api/register")
//         .send({
//             email: "suz12345@gmail.com",
//             name: "suzuran",
//             password: "suztest"
//         })

//         expect(result.status).toBe(200);
//         expect(result.body.data.email).toBe("suz12345@gmail.com");
//         expect(result.body.data.name).toBe("suzuran");
//         expect(result.body.data.password).toBeUndefined();
//     });

//     it('should reject if request is invalid', async () => {
//         const result = await supertest(app)
//         .post("/api/register")
//         .send({
//             email: "",
//             name: "",
//             password: "suztest"
//         })

//         expect(result.status).toBe(400);
//         expect(result.body.errors).toBeDefined();
//     });

//     it('should reject if email already registered', async () => {
//         let result = await supertest(app)
//         .post("/api/register")
//         .send({
//             email: "midori@gmail.com",
//             name: "midori",
//             password: "midtest"
//         })

//         expect(result.status).toBe(200);
//         expect(result.body.data.email).toBe("midori@gmail.com");
//         expect(result.body.data.name).toBe("midori");
//         expect(result.body.data.password).toBeUndefined();

//         result = await supertest(app)
//         .post("/api/register")
//         .send({
//             email: "midori@gmail.com",
//             name: "midori",
//             password: "midtest"
//         })

//         expect(result.status).toBe(400);
//         expect(result.body.errors).toBeDefined();
//     });
// });

describe('POST /api/login', function () {
    it('should can login', async () => {
        const result = await supertest(app)
            .post('/api/login')
            .send({
                email: "narumi@gmail.com",
                password: "narumioke"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/login')
            .send({
                email: "",
                password: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(app)
            .post('/api/login')
            .send({
                email: "midori@gmail.com",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(app)
            .post('/api/login')
            .send({
                email: "mido@gmail.com",
                password: "midtest"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('DELETE /api/logout', function () {
    it('should can logout', async () => {
        const result = await supertest(app)
            .delete('/api/logout')
            .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcnVtaUBnbWFpbC5jb20iLCJpYXQiOjE3MTc5MTg2NTR9.YGHGGvzhXyAEfpyJkBuuiSKmDYRtUAGTgeWpkzU63BY");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        console.log("=== user test ===")
        console.log(user)
        console.log(user.token)
        expect(user.token).toBeNull();
    });
});