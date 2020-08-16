import React, { useEffect, createRef, useCallback } from "react";
import classes from "./Header.module.scss";
//import utils
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
//import components
import Head from "../components/head/Head";
import Input from "../components/ui/input/Input";
import Select from "../components/ui/select/Select";
// redux
import { connect } from "react-redux";
import * as actions from "../store/git/actions";

const Header = ({
	data,
	presrvText,
	entity,
	entities,
	indexer,
	loading,
	getData,
	setEntity,
	setEntities,
	clearData,
}) => {
	//text ref
	const textRef = createRef("");
	//callbacks
	useEffect(() => {
		if (entities.length <= 0) {
			//todo api call
			let apiEntities = [{ value: "users" }, { value: "repositories" }];
			setEntities(apiEntities[0].value, apiEntities);
		}
	}, [setEntities, entities]);

	const handleDataFetch = ({
		indexer = {},
		text = "",
		entity = "",
		presrvText = "",
		textChange = false,
	}) => {
		if (text.length > 3 && entity !== "") {
			getData(entity, text, indexer);
		} else if (presrvText.length > 0) {
			//only empty string from store and maintain input value on field
			clearData();
		} else if (!textChange) {
			//entity changed but text is not long enough just updating entity in store
			setEntity(entity);
		}
	};
	const debounceFn = useCallback(debounce(handleDataFetch, 300), []);

	const onTextChange = () => {
		debounceFn({
			text: textRef.current.value,
			entity,
			indexer,
			presrvText,
			textChange: true,
		});
	};

	const onEntityChange = (event) => {
		let value = event.target.value;
		handleDataFetch({
			text: textRef.current.value,
			entity: value,
			indexer,
			presrvText,
		});
	};

	let classNames =
		data.length > 0 ? `${classes.header} ${classes.moveLeft}` : classes.header;

	return (
		<div className={classNames}>
			<Head />
			<form
				className={classes.form}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Input
					type="text"
					ref={textRef}
					value={presrvText}
					onChanged={onTextChange}
					placeholder="start typing to search.."
				/>
				<Select
					onChanged={onEntityChange}
					options={entities}
					value={entity}
					disabled={loading}
				/>
			</form>
		</div>
	);
};
Header.propTypes = {
	data: PropTypes.array,
	text: PropTypes.string,
	entity: PropTypes.string,
	indexer: PropTypes.object,
	entities: PropTypes.array,
};

const mapStateToProps = ({
	git: { data, text, entity, entities, indexer, loading },
}) => {
	const props = {
		entity,
		entities,
		data: [...data],
		presrvText: text,
		indexer: { ...indexer },
		loading,
	};
	return props;
};
const mapDispatchToProps = (dispatch) => {
	return {
		getData: (entity, text, indexer) => {
			dispatch(actions.fetchGitData(entity, text, indexer));
		},
		clearData: () => {
			dispatch(actions.clearData());
		},
		setEntities: (entity, entities) => {
			dispatch(actions.setEntities(entity, entities));
		},
		setEntity: (entity) => {
			dispatch(actions.setEntity(entity));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
