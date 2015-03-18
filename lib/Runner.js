var Promise = require('bluebird');
var Mocha = require('mocha');
var Reporter = require('./Reporter');
var temp = require('temp');
var fs = require('fs');

module.exports = Runner;

/**
 * Run a test file (one or more suites)
 * @constructor
 */
function Runner() {}

/**
 * Run a spec file
 */
Runner.prototype.run = function (specSrc) {
  // setup global context
  global.__vx__ = {
    isServer: true
  };

  return new Promise(function (resolve, reject) {
    var mocha = new Mocha({
      ui: 'bdd',
      reporter: Reporter.bind(null, function (suite) {
        resolve(suite);
      })
    });

    this.saveTempSrc(specSrc).then(function (tempPath) {
      mocha.addFile(tempPath);
      mocha.run();
    }, reject);
  }.bind(this));
};

/**
 * Save spec source to a temporary file
 * @param
 */
Runner.prototype.saveTempSrc = function (src) {
  return new Promise(function (resolve, reject) {
    temp.open('vx-mocha', function (err, info) {
      if (!err) {
        fs.writeSync(info.fd, src);
        fs.close(info.fd, function (err) {
          resolve(info.path);
        });
      } else {
        reject(err);
      }
    });
  });
};
