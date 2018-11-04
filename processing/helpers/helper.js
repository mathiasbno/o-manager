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

module.exports.itemInArray = itemInArray;
module.exports.ensureArray = ensureArray;
module.exports.asyncForEach = asyncForEach;
