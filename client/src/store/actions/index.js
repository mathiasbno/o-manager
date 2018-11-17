import axios from "axios";

const actions = store => ({
  getrunners(state, event) {
    store.setState({ loading: true, errorMessage: "" });

    axios
      .get(`${process.env.REACT_APP_API_URL}/runners/event/${event}`)
      .then(runners => {
        console.log("runners", runners);
        store.setState({ runners: [...runners.data], loading: false });
      })
      .catch(error => {
        store.setState({ errorMessage: error.message, loading: false });
      });
  },
  closeRunnerSelect() {
    store.setState({ runnerSelectOpen: false });
  },
  openRunnerSelect(state, event) {
    store.setState({ runnerSelectOpen: true });
  },
  addRunnerToTeam(_store, runner) {
    store.setState({
      team: _store.team.concat(runner),
      runnerSelectOpen: false
    });
  }
});
export default actions;
