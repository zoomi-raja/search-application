import React, { useState, useEffect, useCallback } from "react";
import classes from "./Header.module.scss";
//import utils
import debounce from "lodash/debounce";
//import components
import Head from "../components/head/Head";
import Input from "../components/ui/input/Input";
import Select from "../components/ui/select/Select";

const handleDataFetch = async (entityValue, textValue) => {
	if (textValue.length > 3 && entityValue !== "") {
		console.log(entityValue, textValue);
		let response = await fetch("http://localhost:8010/api/search");
		console.log(response);
	}
};
const Header = () => {
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
	return (
		<div className={`${classes.header} ${classes.moveLeft}`}>
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
					options={entities}
					value={entity}
				></Select>
			</form>
		</div>
	);
};

export default Header;
