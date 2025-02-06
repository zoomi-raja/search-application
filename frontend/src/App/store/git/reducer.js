import * as actionTypes from "./actionTypes";

const initialState = {
  data: [],
  text: "",
  entity: "",
  indexer: {},
  loading: false,
  entities: [],
  errMessage: "",
};

const gitReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    case actionTypes.SET_ENTITY:
      return {
        ...state,
        entity: action.entity,
        data:
          (state.indexer[action.entity] &&
            state.indexer[action.entity][state.text]) ||
          [],
      };
    case actionTypes.SET_TEXT:
      return {
        ...state,
        text: action.text,
      };

    case actionTypes.SET_ENTITIES:
      return {
        ...state,
        entity: action.entity,
        loading: false,
        entities: action.entities,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        errMessage: "",
      };

    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.data,
        text: action.text,
        entity: action.entity,
      };

    case actionTypes.CLEAR_DATA:
      return {
        ...state,
        text: "",
        data: [],
      };

    case actionTypes.CLEAR_CACHE:
      return {
        ...initialState,
      };

    /** State responsible for updating indexer againts entity and text searched*/
    case actionTypes.FETCHED_DATA:
      if (
        //aditional condition to compensate infinite scroll not properly handled can be improved
        state.indexer[action.entity] &&
        state.indexer[action.entity][action.text]
      ) {
        action.result = state.indexer[action.entity][action.text].concat(
          action.result
        );
      }
      return {
        ...state,
        data: action.result,
        entity: action.entity,
        text: action.text,
        indexer: {
          ...state.indexer,
          [action.entity]: {
            ...state.indexer[action.entity],
            [action.text]: action.result,
          },
        },
        loading: false,
      };

    default:
      return state;
  }
};
export default gitReducer;
