import React from "react";
//components
import Model from "./components/ui/model/Model";
import Results from "./components/result/Result";
import ErrorModel from "./components/models/Error";
import Button from "./components/ui/button/Button";
import classes from "./App.module.scss";
// redux
import { connect } from "react-redux";
import { clearError, flushCache } from "./store/git/actions";

//container for one way distribution of data
import Header from "./container/Header";

function App({ errMessage, loading, resetError, flushCache }) {
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
const mapStateToProps = ({ git: { errMessage, loading } }) => {
	const props = {
		errMessage,
		loading,
	};
	return props;
};
const mapDispatchToProps = (dispatch) => {
	return {
		resetErropr: () => {
			dispatch(clearError());
		},
		flushCache: () => {
			dispatch(flushCache());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
