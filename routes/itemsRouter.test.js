process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

let items = require("../fakeDb");

let item = { name: "soda", price: 2.00 }

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});


/** for GET "/items", return list of all items using findAll() method from Item class */
describe("GET /items", () => {
    test("Returns a list of items", async () => {
        const response = await request(app).get(`/items`);
        const {items} = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1)
    });
});

/** for POST "/items", create a new instance of Item class */
describe("POST /items", () => {
    test("Creates a new item", async () => {
        const response = await request(app)
        .post(`/items`)
        .send({
            name: "candy",
            price: 1
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).toEqual("candy");
        expect(response.body.item.price).toEqual(1);
    });
})

/** for GET "/items/[name]", returns item from fakeDb using find() method from Item class */
describe("GET /items/:name", () => {
    test("Returns a single item", async () => {
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });

    test("Responds with 404 if item not found", async () => {
        const response = await request(app).get(`/items/notitem`);
        expect(response.statusCode).toBe(404);
    });
})

/** for PATCH "/items/[name]", updates item data from fadeDb using update() method from item class */
describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "sofa"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({
            name: "sofa"
        });
    });

    test("Responds with 404 if item not found", async () => {
        const response = await request(app).patch(`/items/notitem`);
        expect(response.statusCode).toBe(404);
    });
});

/** for DELETE "/items/[name]", deletes item from fakeDb using remove() method from item class */
describe("DELETE /items/:name", () => {
    test("Deletes a single item", async () => {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Deleted" });
    });
});