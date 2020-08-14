import React from "react";
const Fork = ({ color, width, height }) => (
	<svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
		<path
			fill={color || "#000"}
			d="M21 3a3 3 0 10-6 0 2.99 2.99 0 002.05 2.832c.168 4.295-2.021 4.764-4.998 5.391-1.709.36-3.642.775-5.052 2.085V5.816A2.99 2.99 0 009 3a3 3 0 10-6 0 2.99 2.99 0 002 2.816v12.367A2.992 2.992 0 003 21a3 3 0 106 0 2.99 2.99 0 00-1.973-2.808c.27-3.922 2.57-4.408 5.437-5.012 3.038-.64 6.774-1.442 6.579-7.377A2.992 2.992 0 0021 3zM4.2 3c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8S6.993 4.8 6 4.8 4.2 3.993 4.2 3zm3.6 18c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8zM18 4.8c-.993 0-1.8-.807-1.8-1.8s.807-1.8 1.8-1.8 1.8.807 1.8 1.8-.807 1.8-1.8 1.8z"
		/>
	</svg>
);

export default Fork;
