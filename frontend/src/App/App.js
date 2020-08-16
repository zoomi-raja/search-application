import React from "react";
//components
import Model from "./components/ui/model/Model";
import Results from "./components/result/Result";
import ErrorModel from "./components/models/Error";
// redux
import { connect } from "react-redux";
import { clearError } from "./store/git/actions";

//container for one way distribution of data
import Header from "./container/Header";

function App({ errMessage, resetErropr }) {
	let alert = errMessage && (
		<Model show={!!errMessage} onClose={resetErropr}>
			<ErrorModel msg={errMessage} onClose={resetErropr} />
		</Model>
	);

	return (
		<section className="container">
			{alert}
			<Header />
			<Results />
		</section>
	);
}
const mapStateToProps = ({ git: { errMessage } }) => {
	const props = {
		errMessage,
	};
	return props;
};
const mapDispatchToProps = (dispatch) => {
	return {
		resetErropr: () => {
			dispatch(clearError());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
