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
  return results.find(function(_result) {
    return _result.event._id === id;
  });
}

module.exports.itemInArray = itemInArray;
module.exports.ensureArray = ensureArray;
module.exports.asyncForEach = asyncForEach;
module.exports.findResultById = findResultById;
