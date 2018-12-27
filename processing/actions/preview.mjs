function previewEvent(eventor, eventId) {
  console.log("Starting preview");
  return new Promise((resolve, reject) => {
    console.log("Fetching from Eventor", eventId);
    eventor.event(eventId).then(data => {
        console.log("All done", data);
        const _data = {
          id: data.Event.EventId,
          name: data.Event.Name,
          eventForm: data.Event.eventForm,
          data: data.Event.StartDate,
          organiser: {
            id: data.Event.Organiser.Organisation.OrganisationId,
            club: data.Event.Organiser.Organisation.Name
          }
        }
        resolve(_data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {
  previewEvent
};
