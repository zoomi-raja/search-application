import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss";

import Head from "../components/head/Head";
import Input from "../components/ui/input/Input";
import Select from "../components/ui/select/Select";

const Header = () => {
	const [text, setText] = useState("");
	const [entity, setEntity] = useState("");
	const [entities, setEntities] = useState([]);
	useEffect(() => {
		let entities = [{ value: "users" }, { value: "repositories" }];
		setEntity(entities[0].value);
		setEntities(entities);
	}, []);
	const onTextChange = (event) => {
		let value = event.target.value;
		handleDataFetch(entity, value);
		setText(value);
	};
	const onEntityChange = (event) => {
		let value = event.target.value;
		handleDataFetch(value, text);
		setEntity(value);
	};
	const handleDataFetch = (entity, text) => {
		if (text.length > 3 && entity !== "") {
			console.log(entity, text);
		}
	};
	return (
		<div className={`${classes.header} ${classes.moveLeft}`}>
			<Head />
			<form className={classes.form}>
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
