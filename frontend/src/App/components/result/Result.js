import React from "react";
import User from "./user/User";
import classes from "./Result.module.scss";

// redux
import { connect } from "react-redux";

const Results = (props) => {
	// props.entity === "users"
	let items;
	if (props.data && props.data.length > 0) {
		items = props.data.map((user, i) => {
			return <User {...user} key={i} />;
		});
	}

	return <div className={classes.result}>{items}</div>;
};
const mapStateToProps = (state) => {
	const props = {
		data: [...state.git.data],
		entity: state.git.entity,
	};
	return props;
};
export default connect(mapStateToProps)(Results);
