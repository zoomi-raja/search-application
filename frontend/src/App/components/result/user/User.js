import React from "react";
import classes from "./User.module.scss";

const User = (props) => {
	return (
		<div className={classes.user}>
			<div className={classes.userLogo}>
				<img src={props.avatar_url} alt="git user" />
			</div>
			<div className={classes.userInfo}>
				<a href={props.html_url} target="_blank" rel="noopener noreferrer">
					<span>{props.login}</span>
					<span>&rarr;</span>
				</a>
			</div>
		</div>
	);
};
export default User;
