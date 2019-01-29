import {
  ensureArray
} from "./helper";

function nationObject(nationality) {
  const nation = {
    short: nationality.Country.Alpha3.value,
    id: parseInt(nationality.Country.CountryId.value),
    name: []
  };

  // Save all registered country name language variations
  ensureArray(nationality.Country.Name).forEach(country => {
    nation.name.push({
      name: country._,
      lang: country.languageId
    });
  });

  return nation;
}

function unknownNation(id) {
  return {
    short: "Unknown",
    id: id ? parseInt(id) : 0,
    name: [{
        name: "Unknown",
        lang: "en"
      },
      {
        name: "Ukjent",
        lang: "no"
      },
      {
        name: "Okänt",
        lang: "se"
      }
    ]
  };
}

export {
  nationObject,
  unknownNation
};
