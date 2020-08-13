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

const Header = (props) => {
	//states
	const [text, setText] = useState("");
	const [entity, setEntity] = useState("");
	const [entities, setEntities] = useState([]);
	//callbacks
	useEffect(() => {
		let entities = [{ value: "users" }, { value: "repositories" }];
		setEntity(entities[0].value);
		setEntities(entities);
	}, []);
	const handleDataFetch = async (entityValue, textValue) => {
		if (textValue.length > 3 && entityValue !== "") {
			props.getData(entityValue, textValue);
		}
	};
	const debounceFn = useCallback(debounce(handleDataFetch, 300), []);
	const onTextChange = useCallback(
		(event) => {
			let value = event.target.value;
			setText(value);
			debounceFn(entity, value);
		},
		[debounceFn, entity]
	);
	const onEntityChange = useCallback(
		(event) => {
			let value = event.target.value;
			debounceFn(value, text);
			setEntity(value);
		},
		[debounceFn, text]
	);
	let classNames =
		props.data.length > 0
			? `${classes.header} ${classes.moveLeft}`
			: classes.header;

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
				<Select onChanged={onEntityChange} options={entities} value={entity} />
			</form>
		</div>
	);
};
Header.propTypes = {
	data: PropTypes.array,
};

const mapStateToProps = (state) => {
	const props = {
		data: [...state.git.data],
	};
	return props;
};
const mapDispatchToProps = (dispatch) => {
	return {
		getData: (entity, text) => {
			dispatch(actions.fetchGitData(entity, text));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
