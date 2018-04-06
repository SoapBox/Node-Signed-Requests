const assert = require('assert');
const Signature = require('../src/Signature');

describe('Signature', function() {
  it('it can be constructed', function() {
    assert.ok(new Signature('payload', 'sha256', 'key'));
  });

  it('a signature should be equal to itself', function() {
    const signature = new Signature('payload', 'sha256', 'key');

    assert.ok(signature.equals(signature));
  });

  it('two signatures with the same payload algorithm and key should be equal', function() {
    const signature1 = new Signature('payload', 'sha256', 'key');
    const signature2 = new Signature('payload', 'sha256', 'key');

    assert.ok(signature1.equals(signature2));
  });

  it('a signature should be equal to the hmac representation of the signature', function() {
    const signature = new Signature('payload', 'sha256', 'key');
    const hmac = "5d98b45c90a207fa998ce639fea6f02ecc8cc3f36fef81d694fb856b4d0a28ca";

    assert.ok(signature.equals(hmac));
  });

  it('two_signatures_with_different_algorithms_should_not_be_equal', function() {
    const signature1 = new Signature('payload', 'sha256', 'key');
    const signature2 = new Signature('payload', 'sha512', 'key');

    assert.ok(!signature1.equals(signature2));
  });

  it('two signatures signed with different keys should not be equal', function() {
    const signature1 = new Signature('payload', 'sha256', 'key1');
    const signature2 = new Signature('payload', 'sha256', 'key2');

    assert.ok(!signature1.equals(signature2));
  });

  it('two signatures with different payloads should not be equal', function() {
    const signature1 = new Signature('payload1', 'sha256', 'key');
    const signature2 = new Signature('payload2', 'sha256', 'key');

    assert.ok(!signature1.equals(signature2));
  });

  it('it can be coverted to a string', function() {
    const signature = new Signature('payload', 'sha256', 'key');

    assert.strictEqual(
      signature.toString(),
      '5d98b45c90a207fa998ce639fea6f02ecc8cc3f36fef81d694fb856b4d0a28ca'
    );
  });
});
