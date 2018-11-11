function eventObject(event, classes) {
  const _classes = classes.map(_class => {
    return {
      name: _class.EventClass.Name,
      id: parseInt(_class.EventClass.EventClassId)
    };
  });

  return {
    name: event.Name,
    id: parseInt(event.EventId),
    startDate: event.StartDate.Date,
    eventForm: event.eventForm,
    classes: _classes
  };
}

function teamObject(team) {
  return { name: team.Name, id: parseInt(team.OrganisationId) };
}

function unknownTeam() {
  return { name: "Unknown", id: 0 };
}

export { eventObject, teamObject, unknownTeam };
