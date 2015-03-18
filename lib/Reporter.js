module.exports = Reporter;

/**
 * @constructor
 * @param {function} done Callback
 * @param {object} runner Mocha runner instance
 */
function Reporter(done, runner) {
  this.errors = {};

  // runner events:
  //   - `start`  execution started
  //   - `end`  execution complete
  //   - `suite`  (suite) test suite execution started
  //   - `suite end`  (suite) all tests (and sub-suites) have finished
  //   - `test`  (test) test execution started
  //   - `test end`  (test) test completed
  //   - `hook`  (hook) hook execution started
  //   - `hook end`  (hook) hook complete
  //   - `pass`  (test) test passed
  //   - `fail`  (test, err) test failed
  //   - `pending`  (test) test pending
  runner.on('test', function (test) {
    debugger;
  });

  runner.on('fail', function (test, err) {
    this.errors[test] = err;
  }.bind(this));

  runner.on('end', function () {
    done({
      summary: this.summary(runner.suite),
      raw: runner.suite
    });
  }.bind(this));
}

/**
 * Calculate test run summary object
 * @param {object} root Mocha Suite object (root)
 * @returns {object} summary Result set
 * @returns {number} summary.count Number of tests executed
 * @returns {number} summary.passCount Number of passed tests
 * @returns {number} summary.failCount Number of failed tests
 * @returns {array} summary.results Flatened, ordered list of executed suites and tests
 */
Reporter.prototype.summary = function (root) {
  var summary = {
    failCount: 0,
    passCount: 0,
    count: 0,
    results: []
  };

  root.suites.forEach(this.visitSuite.bind(this, summary));

  return summary;
};

/**
 * Visit mocha Suite object and extract details
 * @param {object} summary Test run summary object
 * @param {object} suite Mocha Suite object
 */
Reporter.prototype.visitSuite = function (summary, suite) {
  summary.results.push({
    parent: suite.parent.title,
    title: suite.title,
    test: false
  });

  suite.tests.forEach(this.visitTest.bind(this, summary));
  suite.suites.forEach(this.visitSuite.bind(this, summary));
};

/**
 * Visit mocha Test object and extract test details
 * @param {object} summary Test run summary object
 * @param {object} test Mocha Test object
 */
Reporter.prototype.visitTest = function (summary, test) {
  summary.results.push({
    parent: test.parent.title,
    title: test.title,
    error: this.errors[test],
    passed: (test.state === 'passed'),
    test: true
  });

  if (test.state === 'failed') {
    summary.failCount++;
  }

  if (test.state === 'passed') {
    summary.passCount++;
  }

  summary.count++;
};
