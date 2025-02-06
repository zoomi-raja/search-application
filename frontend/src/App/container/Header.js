import classes from "./Header.module.scss";

//import utils
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

//import components
import Head from "../components/head/Head";
import { useHistory } from "react-router-dom";
import Input from "../components/ui/input/Input";
import Select from "../components/ui/select/Select";

// redux
import { connect } from "react-redux";
import * as actions from "../store/git/actions";

import React, { useEffect, useCallback } from "react";

const Header = ({
  data,
  text,
  entity,
  entities,
  loading,
  getData,
  setEntity,
  setText,
  initEntities,
  clearData,
}) => {
  /** text refrence to keep seprate text value of store and for input field */
  const history = useHistory();
  //on initial render if entities are empty fetch entities
  useEffect(() => {
    if (entities.length <= 0) {
      initEntities();
    }
  }, [initEntities, entities]);
  /** this function is called from lodash depounch function and setting value in store */
  const handleDataFetch = async ({ text = "", entity = "" }) => {
    if (text.length > 3 && entity !== "") {
      getData({ entity, text });
    } else if (text.length <= 0) {
      clearData();
    }
  };
  const debounceFn = useCallback(debounce(handleDataFetch, 300), []);

  /** handling of text change through debounce */
  useEffect(() => {
    debounceFn({
      text,
      entity,
    });
    return () => {
      debounceFn.cancel();
    };
  }, [text, debounceFn, entity]);

  /** entity change is slow event so we can go without debounce */
  const onEntityChange = (event) => {
    let value = event.target.value;
    setEntity(value);
    history.push(`/${value}`);
  };
  /** move search box top left when store(redux) has data */
  let classNames =
    data.length > 0 ? `${classes.header} ${classes.moveLeft}` : classes.header;
  console.log(text);
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
          value={text}
          onChanged={(e) => setText(e.target.value)}
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
    text,
    indexer: { ...indexer },
    loading,
  };
  return props;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: ({ entity, text }) => {
      dispatch(actions.fetchGitData({ entity, text }));
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
    setText: (text) => {
      dispatch(actions.setText(text));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
