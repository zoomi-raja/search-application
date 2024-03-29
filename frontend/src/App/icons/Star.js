import React from "react";
const Star = ({ color, width, height }) => (
	<svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
		<path
			fill={color || "#000"}
			d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
		/>
	</svg>
);

export default Star;
