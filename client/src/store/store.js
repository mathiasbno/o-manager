import createStore from "redux-zero";

const initialState = {
  loading: false,
  runnerSelectOpen: false,
  errorMsg: "",
  runners: [],
  team: [],
  playerEvents: []
};

const store = createStore(initialState);

export default store;
