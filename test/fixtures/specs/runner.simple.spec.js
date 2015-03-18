/**
 * Sample test
 */
var simple, assert;

if (__vx__.isServer) {
    simple = require('../modules/simple');
    assert = require('assert');
}

describe('simple module', function () {
  it('should be a function', function () {
    assert.equal(typeof simple, 'function');
  });

  describe('child suite', function () {
    it('should fail', function () {
      assert.equal(true, false);
    });
  });
});

describe('sibling suite', function () {
  it('should pass', function () {
    assert.equal(true, true);
  });
});
