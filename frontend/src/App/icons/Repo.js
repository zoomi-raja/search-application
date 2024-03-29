import React from "react";
const Repo = ({ color, width, height }) => (
	<svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
		<path
			fill={color || "#000"}
			d="M3.44 1.999l-.439-1.999h17.994l-.439 1.999h-17.116zm18.281 8.001l-1.572 12h-16.352l-1.526-12h19.45zm2.279-2h-24l2.035 16h19.868l2.097-16zm-1.745-2l.371-2h-21.256l.371 2h20.514z"
		/>
	</svg>
);

export default Repo;
