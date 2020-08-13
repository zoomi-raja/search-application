import React from "react";
import classes from "./Head.module.scss";
import logo from "../../../assets/logo.svg";

const Head = () => {
	return (
		<div className={classes.heading}>
			<div className={classes.headingLogo}>
				<img src={logo} alt="github" />
			</div>
			<div className={classes.headingText}>
				<h2>GitHub Searcher</h2>
				<span>Search users or repositories below</span>
			</div>
		</div>
	);
};
export default Head;
