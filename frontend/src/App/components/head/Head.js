import React from "react";
import classes from "./Head.module.scss";
import Logo from "../../icons/Logo";
import Spinner from "../ui/spinner/Spinner";
// redux
import { connect } from "react-redux";

const Head = (props) => {
	return (
		<div className={classes.heading}>
			<div className={classes.headingLogo}>
				<Logo width="100%" height="100%" />
			</div>
			<div className={classes.headingText}>
				<h1>GitHub Searcher</h1>
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
