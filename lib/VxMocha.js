var path      = require('path');
var Framework = require('./Framework');

module.exports = VxMocha;

/**
 * @constructor
 * @param {Vx} vx Context object
 */
function VxMocha(vx) {
  this.vx  = vx;
  this.framework = new Framework(vx);
}

/**
 * @property name
 */
VxMocha.prototype.name = require(path.resolve(__dirname, '..', 'package.json')).name;

/**
 * @property version
 */
VxMocha.prototype.version = require(path.resolve(__dirname, '..', 'package.json')).version;

/**
 * @property dependencies
 */
VxMocha.prototype.dependencies = require(path.resolve(__dirname, '..', 'package.json')).vxDependencies;

/**
 * Initialize
 */
VxMocha.prototype.init = function () {
};

/**
 * Attach
 */
VxMocha.prototype.attach = function () {
  this.vx.plugins['vx-unit'].registerFramework(this.framework, this);
};

/**
 * @method onStart
 */
VxMocha.prototype.run = function () {
  // console.log(this.store);
  // Promise.all(this.tests.map(function (test) {
    // return test.load();
  // })).then(function () {
    // this.info('init vx unit, running tests:', this.tests);
  // }.bind(this));
};
