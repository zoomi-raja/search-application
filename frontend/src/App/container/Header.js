import classes from "./Header.module.scss";

//import utils
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

//import components
import Head from "../components/head/Head";
import Input from "../components/ui/input/Input";
import Select from "../components/ui/select/Select";

// redux
import { connect } from "react-redux";
import * as actions from "../store/git/actions";

import React, { useRef, useEffect, createRef, useCallback } from "react";

const Header = ({
	data,
	presrvText,
	entity,
	entities,
	indexer,
	loading,
	getData,
	setEntity,
	initEntities,
	clearData,
}) => {
	/** text refrence to keep seprate text value of store and for input field */
	const textRef = createRef("");
	const funcStack = useRef([]);

	//callbacks
	useEffect(() => {
		if (entities.length <= 0) {
			initEntities();
		}
	}, [initEntities, entities]);

	//run every time on rerender to avoid race condtion between local cache and api response
	useEffect(() => {
		if (funcStack.current.length > 0) {
			let lastString = funcStack.current.pop();
			funcStack.current = [];
			if (lastString !== presrvText) {
				debounceFn({
					text: lastString,
					entity,
					indexer,
					presrvText,
					textChange: true,
				});
			}
		}
	}, [presrvText]);
	/** this function is called from lodash depounch function and setting value in store */
	const handleDataFetch = async ({
		indexer = {},
		text = "",
		entity = "",
		presrvText = "",
		textChange = false,
	}) => {
		if (text.length > 3 && entity !== "") {
			getData({ entity, text, indexer });
		} else if (presrvText.length > 0) {
			//only empty string from store and maintain input value on field
			clearData();
		} else if (!textChange) {
			//entity changed but text is not long enough just updating entity in store
			setEntity(entity);
		}
	};
	const debounceFn = useCallback(debounce(handleDataFetch, 300), []);

	/** handling of text change through debounce */
	const onTextChange = () => {
		if (!loading) {
			debounceFn({
				text: textRef.current.value,
				entity,
				indexer,
				presrvText,
				textChange: true,
			});
		} else {
			//maintain stack
			funcStack.current.push(textRef.current.value);
		}
	};
	/** entity change is slow event so we can go without debounce */
	const onEntityChange = (event) => {
		let value = event.target.value;
		handleDataFetch({
			text: textRef.current.value,
			entity: value,
			indexer,
			presrvText,
		});
	};
	/** move search box top left when store(redux) has data */
	let classNames =
		data.length > 0 ? `${classes.header} ${classes.moveLeft}` : classes.header;

	return (
		<div className={classNames}>
			<Head />
			<form
				className={classes.form}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Input
					type="text"
					ref={textRef}
					value={presrvText}
					onChanged={onTextChange}
					placeholder="start typing to search.."
				/>
				<Select
					onChanged={onEntityChange}
					options={entities}
					value={entity}
					disabled={loading}
				/>
			</form>
		</div>
	);
};
/** type of props required for component */
Header.propTypes = {
	data: PropTypes.array,
	text: PropTypes.string,
	entity: PropTypes.string,
	indexer: PropTypes.object,
	entities: PropTypes.array,
};

/** properties of store required by this component */
const mapStateToProps = ({
	git: { data, text, entity, entities, indexer, loading },
}) => {
	const props = {
		entity,
		entities,
		data: [...data],
		presrvText: text,
		indexer: { ...indexer },
		loading,
	};
	return props;
};
const mapDispatchToProps = (dispatch) => {
	return {
		getData: ({ entity, text, indexer }) => {
			dispatch(actions.fetchGitData({ entity, text, indexer }));
		},
		clearData: () => {
			dispatch(actions.clearData());
		},
		initEntities: () => {
			dispatch(actions.initEntities());
		},
		setEntity: (entity) => {
			dispatch(actions.setEntity(entity));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
