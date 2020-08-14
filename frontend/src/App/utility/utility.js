export const scrollTop = () => {
	const body = document.querySelector("#root");
	body.scrollIntoView(
		{
			behavior: "smooth",
		},
		500
	);
};
export const shorten = (text = "", count = 0) =>
	text && text.length > count ? text.substring(0, count) + ".." : text;
//catch async to avoid muddy try catch though to avoid circular dependency added error as a parameter
export const reduxCatchAsync = (func, setError) => {
	return (dispatch) => {
		func(dispatch).catch((error) => {
			let msg = error.message;
			dispatch(setError(msg));
		});
	};
};
