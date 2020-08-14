import React, { useState, useEffect, useCallback } from "react";
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
	presrvEntity,
	presrvEntities,
	indexer,
	getData,
	setEntities,
	clearData,
}) => {
	//states
	const [text, setText] = useState("");
	const [entity, setEntity] = useState("");
	//callbacks
	useEffect(() => {
		if (presrvEntities.length <= 0) {
			//todo api call
			let entities = [{ value: "users" }, { value: "repositories" }];
			setEntities(entities[0].value, entities);
			setEntity(entities[0].value);
		} else {
			setEntity(presrvEntity);
			setText(presrvText);
		}
	}, [setEntities, setEntity]);

	const handleDataFetch = (entityValue, textValue) => {
		if (textValue.length > 3 && entityValue !== "") {
			getData(entityValue, textValue, indexer);
		} else if (presrvText.length > 0) {
			//only empty string from cache maintain input
			clearData();
		}
	};
	const debounceFn = useCallback(debounce(handleDataFetch, 300), []);
	const onTextChange = useCallback(
		(event) => {
			let value = event.target.value;
			debounceFn(entity, value);
			setText(value);
		},
		[debounceFn, entity, setText]
	);
	const onEntityChange = (event) => {
		let value = event.target.value;
		setEntity(value);
		handleDataFetch(value, text);
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
					placeholder="start typing to search.."
					onChanged={onTextChange}
					value={text}
				/>
				<Select
					onChanged={onEntityChange}
					options={presrvEntities}
					value={entity}
				/>
			</form>
		</div>
	);
};
Header.propTypes = {
	indexer: PropTypes.object,
	data: PropTypes.array,
	text: PropTypes.string,
	entity: PropTypes.string,
	entities: PropTypes.array,
};

const mapStateToProps = ({
	git: { indexer, data, text, entity, entities },
}) => {
	const props = {
		indexer,
		data: [...data],
		presrvText: text,
		presrvEntity: entity,
		presrvEntities: entities,
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
