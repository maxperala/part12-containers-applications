const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const {describe, test, after, beforeEach} = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");

beforeEach(async () => {
    await User.deleteMany({});
})



describe("register new tests", () => {
    test("Successful registeration", async () => {
        const response = await api.post("/api/users").send({
            username: "teppo_tulppu",
            name: "Teppo Tulppu",
            password: "teponsalis"
        })
        assert.strictEqual(response.status, 201);
    })
    test("User already exists", async () => {

        // Add an istance with the same username as a base
        await api.post("/api/users").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis"
        })

        const response = await api.post("/api/users").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis2"
        })
        assert.strictEqual(response.status, 400);
    })

    test("Username too short", async() => {
        const response = await api.post("/api/users").send({
            username: "jackson",
            name: "Samppa Saari",
            password: "zi"
        })
        assert.strictEqual(response.status, 400);
    })

    test("Username missing", async () => {
        const response = await api.post("/api/users").send({
            name: "Samppa Saari",
            password: "salis"
        })
        assert.strictEqual(response.status, 400);
    })

})


describe("Login tests", () => {

    test("Login succesfully", async () => {
        await api.post("/api/users").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis"
        })
        const response = await api.post("/api/login").send({
            username: "teppo_tulppu",
            password: "teponsalis"
        })
        const userObject = response.body;
        assert.ok(userObject.token);
    })

    test("Login with a wrong password", async () => {
        await api.post("/api/users").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis"
        })

        const response = await api.post("/api/login").send({
            username: "teppo_tulppu",
            password: "teponvääräsalis"
        })

        assert.strictEqual(response.status, 401);
        
    })
})

after(async () => {
    await  mongoose.connection.close();

})