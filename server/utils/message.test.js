const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var from = 'tek';
    var text = 'some';
    var message = generateMessage(from,text);
    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
