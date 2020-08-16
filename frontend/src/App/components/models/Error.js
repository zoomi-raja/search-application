import React from "react";
import classes from "./Error.module.scss";
const Error = ({ msg, onClose }) => {
	return (
		<div className={classes.error}>
			<span className={classes.text}>{msg}</span>
			<button className={classes.close} onClick={onClose} />
		</div>
	);
};
export default Error;
