const { get } = require("./helpers/helper.js");

class EventorApi {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.url = config.url;
  }

  options(endpoint) {
    return { uri: `${this.url}${endpoint}`, headers: { ApiKey: this.apiKey } };
  }

  apiKeyHolder() {
    return new Promise((resolve, reject) => {
      const endpoint = "/organisation/apiKey";
      get(this.options(endpoint))
        .then(response => {
          resolve(response.Organisation);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  resultsEvent(eventId) {
    return new Promise((resolve, reject) => {
      const endpoint = "/results/event";
      const customOptions = {
        qs: { eventId: eventId }
      };
      const options = Object.assign(this.options(endpoint), customOptions);

      get(options)
        .then(response => {
          resolve(response.ResultList);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  entriesEvent(eventId) {
    return new Promise((resolve, reject) => {
      const endpoint = "/entries";
      const customOptions = {
        qs: { eventIds: eventId }
      };
      const options = Object.assign(this.options(endpoint), customOptions);

      get(options)
        .then(response => {
          resolve(response.EntryList);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  startsEvent(eventId) {
    return new Promise((resolve, reject) => {
      const endpoint = "/starts/event";
      const customOptions = {
        qs: { eventId: eventId }
      };
      const options = Object.assign(this.options(endpoint), customOptions);

      get(options)
        .then(response => {
          resolve(response.StartList);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  competitor(personID) {
    return new Promise((resolve, reject) => {
      const endpoint = `/competitor/${personID}`;

      get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = EventorApi;
