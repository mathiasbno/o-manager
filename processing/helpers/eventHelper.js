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

module.exports.eventObject = eventObject;
module.exports.teamObject = teamObject;
