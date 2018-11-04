const parseString = require("xml2js-parser").parseString;
const rp = require("request-promise");

const get = function(options) {
  return new Promise((resolve, reject) => {
    rp(options)
      .then(response => {
        parseString(
          response,
          {
            explicitArray: false,
            ignoreAttrs: false,
            mergeAttrs: true
          },
          (err, result) => {
            resolve(result);
          }
        );
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.get = get;
