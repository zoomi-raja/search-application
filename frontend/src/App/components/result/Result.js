import React from "react";
import User from "./user/User";
import Repo from "./repo/Repo";
import classes from "./Result.module.scss";

// redux
import { connect } from "react-redux";

const Results = (props) => {
	let items;
	if (props.data && props.data.length > 0) {
		items = props.data.map((item, i) => {
			return props.entity === "users" ? (
				<User {...item} key={i} />
			) : (
				<Repo {...item} key={i} />
			);
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
