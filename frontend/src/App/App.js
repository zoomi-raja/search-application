import React from "react";
import logo from "../assets/logo.svg";
import classes from "./App.module.scss";

function App() {
	return (
		<div className="container">
			<section className={classes.search}>
				<div className={`${classes.header} ${classes.move_left}`}>
					<div className={classes.heading}>
						<div className={classes.heading_logo}>
							<img src={logo} alt="github" />
						</div>
						<div className={classes.heading_text}>
							<h2>GitHub Searcher</h2>
							<span>Search users or repositories below</span>
						</div>
					</div>
					<form className={classes.form}>
						<input type="text" placeholder="start typing to search.." />
						<select>
							<option value="user">users</option>
							<option value="repository">repositories</option>
						</select>
					</form>
				</div>

				<div className={classes.result}>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</section>
		</div>
	);
}

export default App;
