export const scrollTop = () => {
	const body = document.querySelector("#root");
	body.scrollIntoView(
		{
			behavior: "smooth",
		},
		500
	);
};
//catch async to avoid muddy try catch though to avoid circular dependency added error as a parameter
export const reduxCatchAsync = (func, setError) => {
	return (dispatch) => {
		func(dispatch).catch((error) => {
			let msg = error.message;
			dispatch(setError(msg));
		});
	};
};
