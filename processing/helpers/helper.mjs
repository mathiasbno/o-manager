function itemInArray(array, id) {
  return array.findIndex(_item => _item.id === parseInt(id)) === -1;
}

function ensureArray(array) {
  if (!Array.isArray(array)) {
    return [array];
  } else {
    return array;
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function findResultById(results, id) {
  return results.filter(function (result) {
    return result.event.id === id;
  });
}

function filterRunnersByEventId(runners, eventId) {
  return runners.filter(runner =>
    runner.results.find(result => result.event.id === eventId)
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function isVacantRunner(runner) {
  return runner.id === 0;
}

function convertToBool(bool) {
  return bool == 'true';
}

export {
  asyncForEach,
  itemInArray,
  ensureArray,
  filterRunnersByEventId,
  findResultById,
  getRandomInt,
  isVacantRunner,
  convertToBool
};
