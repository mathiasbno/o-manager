import createStore from "redux-zero";

const initialState = {
  loading: false,
  errorMsg: "",
  runners: []
};

const store = createStore(initialState);

export default store;
