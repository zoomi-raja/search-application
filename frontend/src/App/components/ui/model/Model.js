import React, { Fragment } from "react";
import classes from "./Model.module.scss";
import Backdrop from "../backdrop/Backdrop";
const Model = ({ show, onClose, children }) => {
	return (
		<Fragment>
			<Backdrop show={show} clicked={onClose} />
			<div
				className={classes.Modal}
				style={{
					transform: show ? "translateY(0)" : "translateY(-100vh)",
					opacity: show ? "1" : "0",
				}}
			>
				{children}
			</div>
		</Fragment>
	);
};
export default Model;
