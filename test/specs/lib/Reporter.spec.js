var Reporter = hmt.lib('Reporter');

describe('Reporter', function () {
  describe('#summary', function () {
    var runner, done, reporter, summary;

    before(function () {
      runner   = hmt.mock('mochaRunner')();
      done     = hmt.spy();
      reporter = new Reporter(done, runner);
      summary  = reporter.summary({ suites: [] });
    });

    it('default count should be 0', function () {
      hmt.assert.equal(summary.count, 0);
    });

    it('default passCount should be 0', function () {
      hmt.assert.equal(summary.passCount, 0);
    });

    it('default failCount should be 0', function () {
      hmt.assert.equal(summary.failCount, 0);
    });

    it('default flattened result list should be empty', function () {
      hmt.assert.equal(summary.results.length, 0);
    });
  });
});
