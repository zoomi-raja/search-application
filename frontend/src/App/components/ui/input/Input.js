import React from "react";
import classes from "./Input.module.scss";
const Input = (props) => {
	return (
		<input
			className={classes.input}
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChanged}
			value={props.value}
		/>
	);
};
export default Input;
