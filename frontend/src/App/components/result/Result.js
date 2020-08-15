import React from "react";
import User from "./user/User";
import Repo from "./repo/Repo";
import classes from "./Result.module.scss";

// redux
import { connect } from "react-redux";

const Results = ({ data }) => {
	let items;
	if (data && data.length > 0) {
		items = data.map((item, i) => {
			return ["User", "Organization"].includes(item.type) ? (
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
	};
	return props;
};
export default connect(mapStateToProps)(Results);
