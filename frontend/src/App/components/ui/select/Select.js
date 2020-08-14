import React from "react";
import PropTypes from "prop-types";
import classes from "./Select.module.scss";
const Select = (props) => {
	let options = [];
	if (props.options && props.options.length > 0) {
		options = props.options.map((option, i) => {
			return (
				<option key={i} value={option.value}>
					{option.value}
				</option>
			);
		});
	}
	return (
		<select
			className={classes.select}
			value={props.value}
			onChange={props.onChanged}
		>
			{options}
		</select>
	);
};
Select.propTypes = {
	options: PropTypes.array,
};
export default Select;
