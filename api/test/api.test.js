const app = require("../app/app");
const request = require("supertest");
//mocking
const service = require("../app/services/search");
global.fetch = jest.fn(() => {
	Promise.resolve({
		json: () =>
			Promise.resolve({
				status: "success",
				results: 1,
				data: {
					entity: "users",
					result: [
						{
							login: "zoomi-raja",
							id: 27607504,
							avatar_url:
								"https://avatars1.githubusercontent.com/u/27607504?v=4",
							html_url: "https://github.com/zoomi-raja",
							type: "User",
						},
					],
				},
			}),
	});
});
//test for listing available git entities
it("should get entities", async (done) => {
	const appObj = request(app);
	const res = await appObj.get("/api/entities");
	expect(res.statusCode).toEqual(200);
	expect(res.body.data).toEqual(["users", "issues", "repositories"]);
	done();
});
//get list of results from git (moked response is used)
it("Get results from git", async (done) => {
	const res = await request(app)
		.post("/api/search")
		.send({ text: "umar", entity: "users" });
	expect(res.statusCode).toEqual(200);
	expect(res.body.data).toHaveProperty("result");
	done();
});
