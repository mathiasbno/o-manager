import axios from "axios";

const actions = store => ({
  getrunners(state, eventId) {
    store.setState({
      loading: true,
      errorMessage: ""
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/runners/event/${eventId}`)
      .then(runners => {
        console.log("runners", runners);
        store.setState({
          runnerSelect: {
            ...state.runnerSelect,
            runners: [...runners.data]
          },
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
    const id = process.env.REACT_APP_PLAYER_ID;

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
  onAddRunnerToTeam(state, runnerId) {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/player/team/addRunner`, {
        runnerId: runnerId,
        eventClass: state.runnerSelect.eventClass
      })
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

    store.setState({
      runnerSelect: {
        ...state.runnerSelect,
        open: false,
      }
    });
  },
  onRemoveRunnerFromTeam(state, runnerId, eventClass) {
    console.log('ID', runnerId);

    axios
      .patch(`${process.env.REACT_APP_API_URL}/player/team/removeRunner`, {
        runnerId: runnerId,
        eventClass: eventClass
      })
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
  closeRunnerSelect(state) {
    store.setState({
      runnerSelect: {
        ...state.runnerSelect,
        open: false,
      }
    });
  },
  onOpenRunnerSelect(state, playerEvent, eventClass) {
    const runners = eventClass._id === state.runnerSelect.eventClass ? state.runnerSelect.runners : [];

    store.setState({
      runnerSelect: {
        eventClass: eventClass._id,
        event: playerEvent,
        runners: runners,
        open: true,
      }
    });
  }
});
export default actions;
