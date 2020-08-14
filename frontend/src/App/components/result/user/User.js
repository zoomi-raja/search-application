import PropTypes from "prop-types";
import React, { useState } from "react";
import classes from "./User.module.scss";
import UserAvatar from "../../../icons/User";

const User = ({ avatar_url, html_url, login }) => {
	const [avatar, setAvatar] = useState();
	const addDefaultSrc = (e) => {
		e.preventDefault();
		setAvatar(<UserAvatar height="100%" width="100%" />);
	};
	let avatarHTML = avatar ? (
		avatar
	) : (
		<img src={avatar_url} alt="git user" onError={addDefaultSrc} />
	);
	return (
		<div className={classes.user}>
			<div className={classes.userLogo}>{avatarHTML}</div>
			<div className={classes.userInfo}>
				<a href={html_url} target="_blank" rel="noopener noreferrer">
					<span>{login}</span>
					<span>&rarr;</span>
				</a>
			</div>
		</div>
	);
};
User.propTypes = {
	avatar_url: PropTypes.string,
	html_url: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
};
export default User;
