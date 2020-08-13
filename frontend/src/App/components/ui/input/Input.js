import React from "react";
import classes from "./Input.module.scss";
const Input = (props) => (
	<input
		type={props.type}
		value={props.value}
		className={classes.input}
		onChange={props.onChanged}
		placeholder={props.placeholder}
	/>
);
export default Input;
