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
  return runner.eventorId === 0;
}

module.exports.itemInArray = itemInArray;
module.exports.ensureArray = ensureArray;
module.exports.asyncForEach = asyncForEach;
module.exports.filterRunnersByEventId = filterRunnersByEventId;
module.exports.findResultById = findResultById;
module.exports.getRandomInt = getRandomInt;
module.exports.isVacantRunner = isVacantRunner;
