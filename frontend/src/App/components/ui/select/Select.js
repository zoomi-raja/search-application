import React from "react";
import PropTypes from "prop-types";
import classes from "./Select.module.scss";
const Select = ({ value, options, disabled, onChanged }) => {
	let arOptions;
	if (options && options.length > 0) {
		arOptions = options.map((option, i) => {
			return (
				<option key={i} value={option}>
					{option}
				</option>
			);
		});
	}
	return (
		<select
			className={classes.select}
			value={value}
			onChange={onChanged}
			disabled={disabled}
		>
			{arOptions}
		</select>
	);
};
Select.propTypes = {
	options: PropTypes.array,
};
export default Select;
