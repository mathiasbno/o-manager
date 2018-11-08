function individualResultObject(result, eventId, teamId, _class) {
  const timeBehind = result.TimeDiff ? result.TimeDiff : 0;
  const position = result.ResultPosition ? result.ResultPosition : 0;
  const time = result.Time ? result.Time : 0;

  const resultObject = {
    class: _class,
    team: parseInt(teamId || 0),
    status: result.CompetitorStatus.value,
    time: time,
    behind: timeBehind,
    event: parseInt(eventId || 0),
    position: parseInt(position)
  };

  return resultObject;
}

function relayResultObject(result, eventId, teamId, _class) {
  const timeBehind = result.TimeBehind ? result.TimeBehind._ : "0";
  const legPosition = result.Position ? result.Position._ : 0;
  const time = result.Time ? result.Time : 0;
  const teamPosition = result.OverallResult
    ? result.OverallResult.ResultPosition
    : 0;

  const resultObject = {
    class: _class,
    team: parseInt(teamId || 0),
    status: result.CompetitorStatus.value,
    time: time,
    behind: timeBehind,
    event: parseInt(eventId || 0),
    leg: parseInt(result.Leg),
    legPosition: parseInt(legPosition),
    overallResult: {
      position: parseInt(teamPosition),
      status: result.OverallResult.TeamStatus.value
    }
  };

  return resultObject;
}

module.exports.individualResultObject = individualResultObject;
module.exports.relayResultObject = relayResultObject;
