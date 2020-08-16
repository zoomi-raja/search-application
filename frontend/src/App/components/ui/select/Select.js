import React from "react";

import PropTypes from "prop-types";
import classes from "./Select.module.scss";

/** as this was small project still made small components to avoid to much code in single file */
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
