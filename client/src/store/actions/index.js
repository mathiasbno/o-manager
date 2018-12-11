import axios from "axios";

const actions = store => ({
  getrunners(state, event) {
    store.setState({
      loading: true,
      errorMessage: ""
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/runners/event/${event}`)
      .then(runners => {
        console.log("runners", runners);
        store.setState({
          runners: [...runners.data],
          loading: false
        });
      })
      .catch(error => {
        store.setState({
          errorMessage: error.message,
          loading: false
        });
      });
  },
  getPlayerEvents(state, value) {
    store.setState({
      loading: true,
      errorMessage: ""
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/playerEvents`)
      .then(playerEvents => {
        store.setState({
          playerEvents: [...playerEvents.data],
          loading: false
        });
      })
      .catch(error => {
        store.setState({
          errorMessage: error.message,
          loading: false
        });
      });
  },
  getPlayer(state, value) {
    // TODO: Fetch logged in player
    const id = "5c0303ce0fc5241fcd1cb927";

    store.setState({
      loading: true,
      errorMessage: ""
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/player/${id}`)
      .then(player => {
        store.setState({
          player: player.data,
          loading: false
        });
      })
      .catch(error => {
        store.setState({
          errorMessage: error.message,
          loading: false
        });
      });
  },
  onJoinPlayerEvent(state, playerEvent) {
    console.log(playerEvent);

    axios
      .patch(`${process.env.REACT_APP_API_URL}/player/joinEvent`, playerEvent)
      .then(player => {
        store.setState({
          player: player.data,
          loading: false
        });
      })
      .catch(error => {
        store.setState({
          errorMessage: error.message,
          loading: false
        });
      });
  },
  closeRunnerSelect() {
    store.setState({
      runnerSelectOpen: false
    });
  },
  openRunnerSelect(state, value) {
    store.setState({
      runnerSelectOpen: true
    });
  },
  addRunnerToTeam(_store, runner) {
    store.setState({
      team: _store.team.concat(runner),
      runnerSelectOpen: false
    });
  }
});
export default actions;
