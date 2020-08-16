import React, { forwardRef } from "react";
import classes from "./Input.module.scss";

const Input = forwardRef((props, ref) => (
	<input
		ref={ref}
		type={props.type}
		defaultValue={props.value}
		className={classes.input}
		onChange={props.onChanged}
		placeholder={props.placeholder}
	/>
));

export default Input;
