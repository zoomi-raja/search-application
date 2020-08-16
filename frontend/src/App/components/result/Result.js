import "./Infinite.scss";

import User from "./user/User";
import Repo from "./repo/Repo";
import React, { useState } from "react";

import classes from "./Result.module.scss";

import { fetchGitData } from "../../store/git/actions";
import InfiniteScroll from "react-infinite-scroll-component";

// redux
import { connect } from "react-redux";

const Results = ({ data, indexer, text, entity, getData }) => {
	const [page, setPage] = useState(1);

	/** infinite scroll function to get more data from api (redux store)*/
	const fetchMoreData = () => {
		let count = page + 1;
		setPage(count);
		getData({ text, entity, page: count, indexer });
	};

	/** as entity can be user / repositor and on top of that data is very dyncamic
	 * from GIT put additional checks to avout break down of script
	 */
	let html;
	if (data && data.length > 0) {
		html = data.map((item, i) => {
			return ["User", "Organization"].includes(item.type) ? (
				<User {...item} key={i} />
			) : (
				<Repo {...item} key={i} />
			);
		});
	} else if (text != "") {
		html = <span>No Result Found ...!</span>;
	}

	/**todo have set hasMore = true as of now not mainting page number in redux
	 * its additional feature not required in the assesment test
	 */

	return (
		<div className={classes.result}>
			<InfiniteScroll
				dataLength={data.length}
				next={fetchMoreData}
				hasMore={true}
			>
				{html}
			</InfiniteScroll>
		</div>
	);
};

/** redux properties for component */
const mapStateToProps = ({ git: { data, indexer, text, entity, page } }) => {
	const props = {
		data: [...data],
		indexer,
		text,
		entity,
		page,
	};
	return props;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: ({ entity, text, page, indexer }) => {
			dispatch(fetchGitData({ entity, text, page, indexer }));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Results);
