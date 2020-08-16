import React from "react";

import classes from "./Error.module.scss";
/** this component is used to show all the errors of app (store errMessage / catchAsync) */
const Error = ({ msg, onClose }) => {
	return (
		<div className={classes.error}>
			<span className={classes.text}>{msg}</span>
			<button className={classes.close} onClick={onClose} />
		</div>
	);
};
export default Error;
