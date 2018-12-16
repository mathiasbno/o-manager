import createStore from "redux-zero";

const initialState = {
  loading: false,
  runnerSelect: {
    classId: null,
    event: null,
    open: false,
    runners: []
  },
  errorMsg: "",
  team: [],
  playerEvents: []
};

const store = createStore(initialState);

export default store;
