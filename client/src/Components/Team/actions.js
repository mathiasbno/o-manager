import axios from "axios";

const actions = store => ({
  getrunners(state, event) {
    store.setState({ loading: true, errorMessage: "" });

    // TODO: convert this ti use env variables fro url
    axios
      .get(`http://localhost:5000/api/runners/event/${event}`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(runners => {
        console.log("runners", runners);
        store.setState({ runners: [...runners.data], loading: false });
      })
      .catch(error => {
        store.setState({ errorMessage: error.message, loading: false });
      });
  }
});

export default actions;
