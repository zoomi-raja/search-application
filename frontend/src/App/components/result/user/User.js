import React, { useState } from "react";
import classes from "./User.module.scss";
import UserAvatar from "../../../icons/User";
const User = (props) => {
	const [avatar, setAvatar] = useState();
	const addDefaultSrc = (e) => {
		e.preventDefault();
		setAvatar(<UserAvatar height="100%" width="100%" />);
	};
	let avatarHTML = avatar ? (
		avatar
	) : (
		<img src={props.avatar_url} alt="git user" onError={addDefaultSrc} />
	);
	return (
		<div className={classes.user}>
			<div className={classes.userLogo}>{avatarHTML}</div>
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
