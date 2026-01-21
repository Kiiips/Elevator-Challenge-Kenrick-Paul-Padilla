const assert = require('chai').assert;
const Elevator = require('../elevator.cjs');
const Person = require('../person.cjs');

describe('Elevator Unit Tests', function() {
  let elevator;

  beforeEach(function() {
    elevator = new Elevator();
  });

  it('initializes with correct default values', () => {
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.floorsTraversed, 0);
  });

  it('creates person with correct properties', () => {
    const person = new Person('Alice', 2, 5);
    assert.equal(person.name, 'Alice');
    assert.equal(person.currentFloor, 2);
    assert.equal(person.dropOffFloor, 5);
  });
});
