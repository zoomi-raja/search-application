import PropTypes from "prop-types";

import React, { useState } from "react";
import classes from "./Repo.module.scss";
import { shorten } from "../../../utility/utility";

//import icons
import Star from "../../../icons/Star";
import Fork from "../../../icons/Fork";
import Watch from "../../../icons/Watch";
import RepoAvatar from "../../../icons/Repo";
import Language from "../../../icons/Language";

const Repo = ({
	full_name,
	owner,
	svn_url,
	description,
	language,
	stargazers_count,
	forks,
	watchers,
}) => {
	const [avatar, setAvatar] = useState();

	/** handle if user image somehow missing */
	const addDefaultSrc = (e) => {
		e.preventDefault();
		setAvatar(<RepoAvatar height="100%" width="100%" />);
	};

	let avatarHTML = avatar ? (
		avatar
	) : (
		<img src={owner.avatar_url} alt="repo owner" onError={addDefaultSrc} />
	);

	return (
		<div className={classes.repo}>
			<div className={classes.repoHead}>
				<div className={classes.repoHeadImg}>{avatarHTML}</div>

				<div className={classes.repoHeadInfo}>
					<a
						className={classes.repoTitle}
						href={svn_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2>{shorten(full_name, 26)}</h2>
					</a>
					<a
						className={classes.repoUser}
						href={owner.html_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{owner.login}
					</a>
				</div>
			</div>
			{/* pushed_at,created_at */}
			<div className={classes.repoBody}>
				<span className={classes.repoBodyDesc}>{shorten(description, 68)}</span>
				<div className={classes.repoBodyStats}>
					<span className={classes.statItem}>
						<Language color="red" width="1.4rem" height="1.4rem" />
						{language}
					</span>
					<span className={classes.statItem}>
						<Star width="1.4rem" height="1.4rem" />
						{stargazers_count}
					</span>
					<span className={classes.statItem}>
						<Fork width="1.4rem" height="1.4rem" />
						{forks}
					</span>
					<span className={classes.statItem}>
						<Watch width="1.4rem" height="1.4rem" />
						{watchers}
					</span>
				</div>
			</div>
		</div>
	);
};

/** Required Props for component */
Repo.propTypes = {
	full_name: PropTypes.string.isRequired,
	owner: PropTypes.object.isRequired,
	svn_url: PropTypes.string.isRequired,
	description: PropTypes.string,
	language: PropTypes.string,
	stargazers_count: PropTypes.number,
	forks: PropTypes.number,
	watchers: PropTypes.number,
};
export default Repo;
