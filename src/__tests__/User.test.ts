import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", async () => {
    // exec this block before anothe test
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "User Example"
            });
        // expected in promise/return            
        expect(response.status).toBe(201);
    });

    it("Shoud not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example"
        });
    // expected in promise/return            
    expect(response.status).toBe(400);
    })

})