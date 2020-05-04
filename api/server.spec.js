const request = require('supertest'); 
const server = require('./server.js'); 

describe('All Server Tests', () => {

  it("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 401 when not logged in", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(401);
    });

    it("should be json", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.type).toBe("application/json");
    });

  });

    describe("Testing Registration Functions", () => {

        it('should register new users', async() => {
            const res = await request(server)
                .post("/api/auth/register")
                .send({
                    username: `user made ${Date.now()}`,
                    password: "password"
                });
            expect(res.status).toBe(201);
        });

        it("should not work if missing registration info", async() => {
            const res = await request(server)
              .post("/api/auth/register")
              .send({
                password: "password"
              });
            expect(res.status).toBe(500);
        });
    });

    describe("Testing Login Functions", () => {
        it("should log in existing users", async() => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "jeff",
                    password: "password"
                });
            expect(res.status).toBe(200);
        });

        it("should return an error if missing login info", async() => {
            const res = await request(server).post("/api/auth/login");
            expect(res.status).toBe(500);
        });

        it("should return an error if info is incorrect", async() => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "jeffers",
                    password: "mad hax"
                });
            expect(res.status).toBe(401);
        });
    });

});

 
