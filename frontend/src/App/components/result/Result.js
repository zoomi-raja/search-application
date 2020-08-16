import React, { useState } from "react";
import "./Infinite.scss";
import User from "./user/User";
import Repo from "./repo/Repo";
import classes from "./Result.module.scss";
import { fetchGitData } from "../../store/git/actions";
import InfiniteScroll from "react-infinite-scroll-component";

// redux
import { connect } from "react-redux";

const Results = ({ data, indexer, text, entity, getData }) => {
	const [page, setPage] = useState(1);
	const fetchMoreData = () => {
		let count = page + 1;
		setPage(count);
		getData({ text, entity, page: count, indexer });
	};

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
	// has more is true as not mainting page data in redux
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
