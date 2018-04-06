const assert = require('assert');
const Payload = require('../src/Payload');

describe('Payload', function() {
  const id = '303103f5-3dca-4704-96ad-860717769ec9';
  const method = 'GET';
  const timestamp = '2018-04-06 20:34:47';
  const uri = 'https://localhost';

  it('can be constructed', function() {
    const content = 'content';

    assert.ok(new Payload(id, method, timestamp, uri, content));
  });

  describe('toString()', function () {
    it('stringifies a simple payload to the proper string', function() {
      const content = 'content';
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"content"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a payload with an embedded url to the proper string', function () {
      const content = 'https://google.com';
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"https://google.com"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a payload with the ã character to the proper string', function() {
      const content = 'ã';
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"ã"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a payload with the 好 character to the proper string', function() {
      const content = '好';
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"好"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a json payload to the proper string', function() {
      const content = {test: 'test'};
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"{\"test\":\"test\"}"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a json payload with the ã character to the proper string', function() {
      const content = {ã: 'ã'};
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"{\"ã\":\"ã\"}"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a json payload with the 好 character to the proper string', function() {
      const content = {好: '好'};
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"{\"好\":\"好\"}"}`;

      assert.strictEqual(payload.toString(), expected);
    });

    it('stringifies a json payload with a url to the proper string', function() {
      const content = {url: 'https://google.com'};
      const payload = new Payload(id, method, timestamp, uri, content);
      const expected = String.raw`{"id":"303103f5-3dca-4704-96ad-860717769ec9","method":"GET","timestamp":"2018-04-06 20:34:47","uri":"https://localhost","content":"{\"url\":\"https://google.com\"}"}`;

      assert.strictEqual(payload.toString(), expected);
    });
  });
});
