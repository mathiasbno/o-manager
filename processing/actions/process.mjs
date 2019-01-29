import {
  runnerObject,
  isJuniorOrOlder
} from "../helpers/runnerHelper";
import {
  nationObject,
  unknownNation
} from "../helpers/nationHelper";
import {
  relayResultObject,
  individualResultObject
} from "../helpers/resultHelper";
import {
  individualEntryObject
} from "../helpers/entryHelper";
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

function processRunner(runner, teams, nations) {
  // Make sure that the team excists, if runner has no team assisiation he should get unknown team
  let team = unknownTeam()

  if (runner.Organisation) {
    team = teamObject(runner.Organisation);

    if (itemInArray(teams, runner.Organisation.OrganisationId)) {
      teams.push(team);
    }
  } else if (itemInArray(teams, 0)) {
    teams.push(team);
  }

  // Not all nationalities are propperly mapped up.
  // We have to make differentiate between totaly missing countries,
  // countris with only id and propper countries.
  if (runner.Person.Nationality) {
    if (runner.Person.Nationality.Country) {
      if (itemInArray(
          nations,
          runner.Person.Nationality.Country.CountryId.value
        )) {
        nations.push(nationObject(runner.Person.Nationality));
      }
    } else {
      if (itemInArray(
          nations,
          runner.Person.Nationality.CountryId.value
        )) {
        nations.push(unknownNation(runner.Person.Nationality.CountryId.value));
      }
    }
  } else {
    nations.push(unknownNation());
  }

  const processedRunner = runnerObject(runner);

  return {
    processedRunner,
    team
  };
}

function processEvent(data) {
  let event = null;
  const nations = [];
  const teams = [];
  const runners = [];

  if (data.ClassResult) {
    event = eventObject(data.Event, data.ClassResult);

    data.ClassResult.forEach(_class => {
      const __class = {
        id: _class.EventClass.EventClassId,
        name: _class.EventClass.Name
      };

      ensureArray(_class.PersonResult).forEach(runner => {
        if (runner.Person.PersonId) {
          let {
            processedRunner,
            team
          } = processRunner(runner, teams, nations);

          let result = runner.Result;

          // If the race is multi day we need to send in a different form of event data
          // TODO: process result data from each day indivually
          if (event.eventForm == "IndMultiDay") {
            result = runner.RaceResult.Result;
          }

          processedRunner.results.push(
            individualResultObject(result, event.id, team.id, __class)
          );

          if (
            itemInArray(runners, processedRunner.id) &&
            !isVacantRunner(processedRunner) &&
            isJuniorOrOlder(processedRunner.birthYear, event.startDate)
          ) {
            runners.push(processedRunner);
          }
        }
      });
    });
  } else {
    event = eventObject(data.Event, data.EventClassList.EventClass);

    ensureArray(data.EventEntries.Entry).forEach(runner => {
      const _runner = runner.Competitor;

      if (_runner.Person.PersonId) {
        const {
          processedRunner,
          team
        } = processRunner(_runner, teams, nations);

        processedRunner.entries.push(
          individualEntryObject(event, team.id, runner.EntryClass.EventClassId)
        );

        if (
          itemInArray(runners, processedRunner.id) &&
          !isVacantRunner(processedRunner) &&
          isJuniorOrOlder(processedRunner.birthYear, event.startDate)
        ) {
          runners.push(processedRunner);
        }
      }
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
  let event = null;
  const nations = [];
  const teams = [];
  const runners = [];

  if (data.ClassResult) {
    const event = eventObject(data.Event, data.ClassResult);

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

            if (
              !isVacantRunner(_runner) &&
              isJuniorOrOlder(_runner.birthYear, event.startDate)
            ) {
              runners.push(_runner);
            }
          });
        });
      });
    }
  } else {
    event = eventObject(data.Event, data.EventClassList.EventClass);


    ensureArray(data.EventEntries.Entry).forEach(_team => {
      console.log(_team.EntryClass);
      const __team = teamObject(_team);
      if (_team.OrganisationId && itemInArray(teams, __team.id)) {
        teams.push(__team);
      }

      ensureArray(_team.TeamCompetitor).forEach(runner => {
        if (runner.Person) {
          if (runner.Person.PersonId) {
            const {
              processedRunner,
              team
            } = processRunner(runner, teams, nations);

            processedRunner.entries.push(
              individualEntryObject(event, team.id, _team.EntryClass.EventClassId)
            );

            if (
              itemInArray(runners, processedRunner.id) &&
              !isVacantRunner(processedRunner) &&
              isJuniorOrOlder(processedRunner.birthYear, event.startDate)
            ) {
              runners.push(processedRunner);
            }
          }
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

export {
  processRelayEvent,
  processEvent
};
