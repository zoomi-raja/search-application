const dev = {
	API_URL: "http://localhost:8010/api",
};
const prod = {
	API_URL: "/api",
};
const config = process.env.NODE_ENV === "development" ? dev : prod;
export default { ...config };
