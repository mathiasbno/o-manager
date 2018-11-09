import parseString from "xml2js-parser";
import rp from "request-promise";

const get = function(options) {
  return new Promise((resolve, reject) => {
    rp(options)
      .then(response => {
        parseString.parseString(
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

export { get };
