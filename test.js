let expect = require('chai').expect;

let jsonabc = require('./index');

describe('Trailing commas', function () {
  it('should remove from plain object', function () {
    expect(jsonabc.cleanJSON("{a: 'b', }")).to.be.equal("{a: 'b'}");
  });
  it('should remove from plain array', function () {
    expect(jsonabc.cleanJSON("[ 'b', ]")).to.be.equal("[ 'b']");
  });
});

describe('Sorting', function () {
  let input, expectedOutput;
  beforeEach(function () {
    input = {
      'object': {
        'b': 2,
        'a': 1,
        'd': 4,
        'c': 3
      },
      'array': ['d', '1', 'c', 'a', 'b'],
      'collection': [{
        'b': 2,
        'a': 1,
        'd': 4,
        'c': 3
      }, {
        '__b1': 2,
        '__a2': 1,
        '__d3': 4,
        '__c4': 3
      },
      ['d', '1', 'c', 'a', 'b']
      ]
    };

    expectedOutput = {
      'array': [
        '1',
        'a',
        'b',
        'c',
        'd'
      ],
      'collection': [
        [
          '1',
          'a',
          'b',
          'c',
          'd'
        ],
        {
          'a': 1,
          'b': 2,
          'c': 3,
          'd': 4
        },
        {
          '__a2': 1,
          '__b1': 2,
          '__c4': 3,
          '__d3': 4
        }
      ],
      'object': {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4
      }
    };
  });

  it('should sort complex JSON', function () {
    console.log(jsonabc.sortObj(input));
    expect(jsonabc.sortObj(input)).to.deep.equal(expectedOutput);
  });
});
