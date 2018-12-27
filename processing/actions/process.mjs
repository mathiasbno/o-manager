import runnerObject from "../helpers/runnerHelper";
import {
  nationObject,
  unknownNation
} from "../helpers/nationHelper";
import {
  relayResultObject,
  individualResultObject
} from "../helpers/resultHelper";
import {
  eventObject,
  teamObject,
  unknownTeam
} from "../helpers/eventHelper";
import {
  itemInArray,
  ensureArray,
  isVacantRunner
} from "../helpers/helper";

function processEvent(data) {
  const event = eventObject(data.Event, data.ClassResult);

  const nations = [unknownNation()];
  const teams = [unknownTeam()];
  const runners = [];

  if (data.ClassResult) {
    data.ClassResult.forEach(_class => {
      const __class = {
        id: _class.EventClass.EventClassId,
        name: _class.EventClass.Name
      };

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

        _runner.results.push(
          individualResultObject(result, event.id, team.id, __class)
        );

        if (itemInArray(runners, _runner.id) && !isVacantRunner(_runner)) {
          runners.push(_runner);
        }
      });
    });
  }

  return {
    event,
    teams,
    nations,
    runners
  };
}

function processRelayEvent(data) {
  const event = eventObject(data.Event, data.ClassResult);

  const nations = [unknownNation()];
  const teams = [unknownTeam()];
  const runners = [];

  if (data.ClassResult) {
    data.ClassResult.forEach(_class => {
      const __class = {
        id: _class.EventClass.EventClassId,
        name: _class.EventClass.Name
      };
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
          const result = relayResultObject(runner, event.id, _team.id, __class);
          _runner.results.push(result);

          if (!isVacantRunner(_runner)) {
            runners.push(_runner);
          }
        });
      });
    });
  }

  return {
    event,
    teams,
    nations,
    runners
  };
}

export {
  processRelayEvent,
  processEvent
};
