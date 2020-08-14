import React, { useState } from "react";
import classes from "./User.module.scss";
import UserAvatar from "../../../icons/User";
const User = (props) => {
	const [avatar, setAvatar] = useState();
	const addDefaultSrc = () => {
		setAvatar(<UserAvatar height="100%" width="100%" />);
	};
	let html = (
		<img
			src={props.avatar_url + "das"}
			alt="git user"
			onError={addDefaultSrc}
		/>
	);
	if (avatar) {
		html = avatar;
	}
	return (
		<div className={classes.user}>
			<div className={classes.userLogo}>{html}</div>
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
