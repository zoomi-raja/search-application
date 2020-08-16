export const scrollTop = () => {
	const body = document.querySelector("#root");
	body.scrollIntoView(
		{
			behavior: "smooth",
		},
		500
	);
};

/** to shorten the string into required length */
export const shorten = (text = "", count = 0) =>
	text && text.length > count ? text.substring(0, count) + ".." : text;

/** CatchAsync to avoid muddy code by using try catch
 * and to avoid circular dependency added error as
 * a parameter
 * */
export const reduxCatchAsync = (func, setError) => {
	return (dispatch) => {
		func(dispatch).catch((error) => {
			let msg = error.message;
			dispatch(setError(msg));
		});
	};
};
