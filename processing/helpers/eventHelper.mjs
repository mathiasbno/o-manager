function eventObject(event, classes) {
  const _classes = classes.map(_class => {
    return {
      name: _class.EventClass ? _class.EventClass.Name : _class.Name,
      id: parseInt(_class.EventClass ? _class.EventClass.EventClassId : _class.EventClassId)
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
  const name = team.Name ? team.Name : team.TeamName;

  return {
    name: name,
    id: parseInt(team.OrganisationId)
  };
}

function unknownTeam() {
  return {
    name: "Unknown",
    id: 0
  };
}

export {
  eventObject,
  teamObject,
  unknownTeam
};
