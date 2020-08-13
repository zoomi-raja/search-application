import React from "react";
import classes from "./App.module.scss";
//components
import Results from "./components/result/Result";
//container for one way distribution of data
import Header from "./container/Header";

function App() {
	return (
		<div className="container">
			<section className={classes.search}>
				<Header />
				<Results />
			</section>
		</div>
	);
}

export default App;
