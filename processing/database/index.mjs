import { get, post } from "./helpers";
import { asyncForEach } from "../helpers/helper";

const saveData = function(url, data) {
  return new Promise(resolve => {
    post(url, data).then(response => {
      resolve(response.json());
    });
  });
};

const getData = function(url, data) {
  return new Promise(resolve => {
    get(url, data).then(response => {
      resolve(response.json());
    });
  });
};

function saveConnectedData(event, nations, teams) {
  const saveEvent = saveData(`${process.env.API_URL}/event`, event)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });

  const saveNations = asyncForEach(nations, async nation => {
    await saveData(`${process.env.API_URL}/nation`, nation)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const saveTeams = asyncForEach(teams, async team => {
    await saveData(`${process.env.API_URL}/team`, team)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return [saveEvent, saveNations, saveTeams];
}

export { saveData, getData, saveConnectedData };
