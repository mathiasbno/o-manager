function individualEntryObject(event, teamId, classId) {
  const _class = event.classes.find(__class => __class.id === parseInt(classId))

  const entryObject = {
    class: _class,
    team: parseInt(teamId || 0),
    event: parseInt(event.id || 0)
  };

  return entryObject;
}

export {
  individualEntryObject
};
