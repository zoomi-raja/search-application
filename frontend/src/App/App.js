import React from "react";

//components
import classes from "./App.module.scss";
import Model from "./components/ui/model/Model";
import Results from "./components/result/Result";
import ErrorModel from "./components/models/Error";
import Button from "./components/ui/button/Button";

// redux
import { connect } from "react-redux";
import { clearError, flushCache } from "./store/git/actions";

//container for one way distribution of data
import Header from "./container/Header";

function App({ errMessage, loading, resetError, flushCache }) {
	/** Any error from redux store or from catchAsync it will be shown from here */
	let alert = errMessage && (
		<Model show={!!errMessage} onClose={resetError}>
			<ErrorModel msg={errMessage} onClose={resetError} />
		</Model>
	);

	return (
		<section className="container">
			{alert}
			<div className={classes.clearCache}>
				<Button clicked={flushCache} disabled={loading}>
					Clear Cache
				</Button>
			</div>
			<Header />
			<Results />
		</section>
	);
}

/** map store properties to component */
const mapStateToProps = ({ git: { errMessage, loading } }) => {
	const props = {
		errMessage,
		loading,
	};
	return props;
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetError: () => {
			dispatch(clearError());
		},
		flushCache: () => {
			dispatch(flushCache());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
