jest.mock("node-fetch");
const app = require("../app/app");
const request = require("supertest");
//mocking
const fetch = require("node-fetch");

//available git entites in our system
it("should get entities", async (done) => {
	const appObj = request(app);
	const res = await appObj.get("/api/entities");
	expect(res.statusCode).toEqual(200);
	expect(res.body.data).toEqual(["users", "issues", "repositories"]);
	done();
});

//fetch result basis on provided request (cache/Git API)
it("Get results from git (moked response)", async (done) => {
	const { Response } = jest.requireActual("node-fetch");
	fetch.mockReturnValue(
		Promise.resolve(
			new Response(
				JSON.stringify({
					total_count: 199,
					incomplete_results: false,
					items: [
						{
							login: "zoomi-raja",
							id: 27607504,
							node_id: "MDQ6VXNlcjI3NjA3NTA0",
							avatar_url:
								"https://avatars1.githubusercontent.com/u/27607504?v=4",
							gravatar_id: "",
							url: "https://api.github.com/users/zoomi-raja",
							html_url: "https://github.com/zoomi-raja",
							repos_url: "https://api.github.com/users/zoomi-raja/repos",
							type: "User",
							site_admin: false,
							score: 1,
						},
					],
				})
			)
		)
	);
	const res = await request(app)
		.post("/api/search")
		.send({ text: "zamurd", entity: "users" });
	expect(res.statusCode).toEqual(200);
	expect(res.body.data).toHaveProperty("result");
	done();
});
