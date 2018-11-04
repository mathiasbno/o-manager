const { runnerObject } = require("./runnerHelper.js");
const { nationObject } = require("./nationHelper.js");
const {
  relayResultObject,
  individualResultObject
} = require("./resultHelper.js");

const { itemInArray, ensureArray } = require("./helper.js");

function eventObject(event) {
  return {
    name: event.Name,
    id: parseInt(event.EventId),
    startDate: event.StartDate.Date,
    eventForm: event.eventForm
  };
}

function teamObject(team) {
  return { name: team.Name, id: parseInt(team.OrganisationId) };
}

function processEvent(data) {
  const event = eventObject(data.Event);

  const nations = [];
  const teams = [];
  const runners = [];

  if (data.ClassResult) {
    data.ClassResult.forEach(_class => {
      ensureArray(_class.PersonResult).forEach(runner => {
        const team = teamObject(runner.Organisation);

        if (runner.Organisation.OrganisationId && itemInArray(teams, team.id)) {
          teams.push(team);
        }

        if (
          runner.Person.Nationality &&
          itemInArray(
            nations,
            runner.Person.Nationality.Country.CountryId.value
          )
        ) {
          nations.push(nationObject(runner.Person.Nationality));
        }

        const _runner = runnerObject(runner);
        let result = runner.Result;

        // If the race is multi day we need to send in a different form of event data
        // TODO: process result data from each day indivually
        if (event.eventForm == "IndMultiDay") {
          result = runner.RaceResult.Result;
        }

        _runner.results.push(individualResultObject(result, event.id, team.id));

        if (itemInArray(runners, _runner.eventorId.seId)) {
          runners.push(_runner);
        }
      });
    });
  }

  return { event, teams, nations, runners };
}

function processRelayEvent(data) {
  const event = eventObject(data.Event);

  const nations = [];
  const teams = [];
  const runners = [];

  if (data.ClassResult) {
    data.ClassResult.forEach(_class => {
      _class.TeamResult.forEach(team => {
        const _team = teamObject(team.Organisation);

        if (team.Organisation.OrganisationId && itemInArray(teams, _team.id)) {
          teams.push(_team);
        }

        team.TeamMemberResult.forEach(runner => {
          if (
            runner.Person.Nationality &&
            itemInArray(
              nations,
              runner.Person.Nationality.Country.CountryId.value
            )
          ) {
            nations.push(nationObject(runner.Person.Nationality));
          }

          const _runner = runnerObject(runner);
          const result = relayResultObject(runner, event.id, _team.id);
          _runner.results.push(result);

          if (itemInArray(runners, _runner.eventorId.seId)) {
            runners.push(_runner);
          }
        });
      });
    });
  }

  return { event, teams, nations, runners };
}

module.exports.processRelayEvent = processRelayEvent;
module.exports.processEvent = processEvent;
