import React from "react";
//components
import Results from "./components/result/Result";
//container for one way distribution of data
import Header from "./container/Header";

function App() {
	return (
		<section className="container">
			<Header />
			<Results />
		</section>
	);
}

export default App;
