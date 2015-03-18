var Runner = hmt.lib('Runner');

describe('Runner', function () {
  var summary;

  before(function (done) {
    new Runner()
      .run(hmt.path('fixtures', 'specs', 'runner.simple.spec.js'))
      .then(function (suite) {
        summary = suite.summary;
        done();
      })
      .then(null, done);
  });

  it('should report total test count', function () {
    hmt.assert.equal(summary.count, 3);
  });

  it('should report total test pass count', function () {
    hmt.assert.equal(summary.passCount, 2);
  });

  it('should report total test fail count', function () {
    hmt.assert.equal(summary.failCount, 1);
  });

  it('should report flattened list of suites and tests', function () {
    hmt.assert.equal(summary.results.length, 6);
  });
});
