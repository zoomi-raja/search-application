import React from "react";
import { shorten } from "../../../utility/utility";
import classes from "./Repo.module.scss";
//import icons
import Star from "../../../icons/Star";
import Fork from "../../../icons/Fork";
import Watch from "../../../icons/Watch";
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
	return (
		<div className={classes.repo}>
			<div className={classes.repoHead}>
				<div className={classes.repoHeadImg}>
					<img src={owner.avatar_url} alt="repo owner" />
				</div>

				<div className={classes.repoHeadInfo}>
					<a className={classes.repoTitle} href={svn_url}>
						<h2>{shorten(full_name, 26)}</h2>
					</a>
					<a className={classes.repoUser} href={owner.html_url}>
						{owner.login}
					</a>
				</div>
			</div>
			{/* pushed_at,created_at */}
			<div className={classes.repoBody}>
				<span className={classes.repoBodyDesc}>{shorten(description, 68)}</span>
				<div className={classes.repoBodyStats}>
					<span className={classes.statItem}>
						<Language color="red" />
						{language}
					</span>
					<span className={classes.statItem}>
						<Star />
						{stargazers_count}
					</span>
					<span className={classes.statItem}>
						<Fork />
						{forks}
					</span>
					<span className={classes.statItem}>
						<Watch />
						{watchers}
					</span>
				</div>
			</div>
		</div>
	);
};
export default Repo;
