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
  return results.find(function(result) {
    return result.event._id === id;
  });
}

function filterRunnersByEventId(runners, eventId) {
  return runners.filter(function(runner) {
    return findResultById(runner.results, eventId);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function isVacantRunner(runner) {
  return runner.id === 0;
}

export {
  asyncForEach,
  itemInArray,
  ensureArray,
  filterRunnersByEventId,
  findResultById,
  getRandomInt,
  isVacantRunner
};
