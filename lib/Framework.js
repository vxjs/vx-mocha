var Promise = require('bluebird');
var Runner  = require('./Runner');

module.exports = Framework;

/**
 * @constructor
 * @param {Vx} vx Context object
 */
function Framework(vx) {
  this.name = 'mocha';
}

/**
 * Run spec
 * @param {string} specPath
 */
Framework.prototype.run = function (specPath) {
  return new Promise(function (resolve, reject) {
    new Runner()
      .run(specPath)
      .then(function (suite) {
        resolve(suite.summary);
      }, reject);
  });
};
