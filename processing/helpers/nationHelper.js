const { ensureArray } = require("./helper.js");

function nationObject(nationality) {
  const nation = {
    short: nationality.Country.Alpha3.value,
    id: parseInt(nationality.Country.CountryId.value),
    name: []
  };

  // Save all registered country name language variations
  ensureArray(nationality.Country.Name).forEach(function(country) {
    nation.name.push({
      name: country._,
      lang: country.languageId
    });
  });

  return nation;
}

module.exports.nationObject = nationObject;
