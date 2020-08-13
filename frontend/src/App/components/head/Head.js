import React from "react";
import classes from "./Head.module.scss";
import logo from "../../../assets/logo.svg";
import Spinner from "../ui/spinner/Spinner";
// redux
import { connect } from "react-redux";

const Head = (props) => {
	return (
		<div className={classes.heading}>
			<div className={classes.headingLogo}>
				<img src={logo} alt="github" />
			</div>
			<div className={classes.headingText}>
				<h2>GitHub Searcher</h2>
				<span>Search users or repositories below</span>
			</div>
			{props.loading && (
				<div className={classes.load}>
					<Spinner />
				</div>
			)}
		</div>
	);
};
const mapStateToProps = (state) => {
	const props = {
		...state.git,
	};
	return props;
};
export default connect(mapStateToProps)(Head);
