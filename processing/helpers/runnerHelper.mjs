function isJuniorOrOlder(runnerBirthDate, eventStartDate) {
  if (!runnerBirthDate) {
    return false;
  } else {
    return eventStartDate.slice(0, 4) - runnerBirthDate >= 17;
  }
}

function runnerObject(runner) {
  // Not all runners have a registered nationality, set country Id or null
  const nationalityId = runner.Person.Nationality ?
    runner.Person.Nationality.Country.CountryId.value :
    null;

  // Not all runners have a registered birtDate, set BirthDate or null
  const birthDate = runner.Person.BirthDate ?
    runner.Person.BirthDate.Date.slice(0, 4) :
    null;

  // Not all runners have a registered gender
  const gender = runner.Person.sex ? runner.Person.sex : "Unknown";

  const runnerObject = {
    name: {
      given: runner.Person.PersonName.Given._,
      family: runner.Person.PersonName.Family
    },
    id: parseInt(runner.Person.PersonId || 0),
    gender: gender,
    birthYear: birthDate,
    nationality: parseInt(nationalityId || 0),
    results: [],
    price: []
  };

  return runnerObject;
}

export {
  runnerObject,
  isJuniorOrOlder
};
