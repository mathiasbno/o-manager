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

function unknownTeam() {
  return { name: "Unknown", id: 0 };
}

module.exports.eventObject = eventObject;
module.exports.teamObject = teamObject;
module.exports.unknownTeam = unknownTeam;
