const assert = require('chai').assert;
const Elevator = require('../elevator.cjs');
const Person = require('../person.cjs');

describe('Elevator Integration Tests - Levels 1-7', function() {
  let elevator;
  beforeEach(() => elevator = new Elevator())

  it('Level 1: picks up and drops off single person going up', () => {
    const person = new Person('A', 1, 4)
    elevator.requests.push(person)
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.currentFloor, 4)
    assert.equal(elevator.floorsTraversed, 4)
    assert.equal(elevator.stops, 2)
  })

  it('Level 1: picks up and drops off single person going down', () => {
    const person = new Person('B', 5, 2)
    elevator.requests.push(person)
    elevator.currentFloor = 6
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.floorsTraversed, 4)
    assert.equal(elevator.currentFloor, 2)
  })

  it('Level 2: has required methods', () => {
    assert.isFunction(elevator.moveUp)
    assert.isFunction(elevator.moveDown)
    assert.isFunction(elevator.hasPickup)
    assert.isFunction(elevator.hasDropoff)
    assert.isFunction(elevator.hasStop)
  })

  it('Level 3: tracks metrics across multiple requests', () => {
    elevator.requests.push(new Person('C', 1, 3))
    elevator.requests.push(new Person('D', 2, 5))
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.isAbove(elevator.floorsTraversed, 0)
    assert.isAbove(elevator.stops, 0)
  })

  it('Level 4: processes multiple requests in FCFS order', () => {
    const personA = new Person('A', 3, 9)
    const personB = new Person('B', 6, 2)
    elevator.requests = [personA, personB]
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
  })

  it('Level 5: Person A goes up, Person B goes up', () => {
    const personA = new Person('A', 2, 5)
    const personB = new Person('B', 3, 7)
    elevator.requests = [personA, personB]
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.isAbove(elevator.floorsTraversed, 0)
    assert.isAbove(elevator.stops, 2)
  })

  it('Level 5: Person A goes up, Person B goes down', () => {
    const personA = new Person('A', 2, 5)
    const personB = new Person('B', 7, 3)
    elevator.requests = [personA, personB]
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
  })

  it('Level 5: Person A goes down, Person B goes up', () => {
    const personA = new Person('A', 5, 2)
    const personB = new Person('B', 3, 8)
    elevator.requests = [personA, personB]
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
  })

  it('Level 5: Person A goes down, Person B goes down', () => {
    const personA = new Person('A', 7, 3)
    const personB = new Person('B', 5, 1)
    elevator.requests = [personA, personB]
    elevator._setCurrentHour(13)
    elevator.dispatch()
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
  })

  it('Level 6: returns to lobby before noon when no riders', () => {
    const person = new Person('X', 2, 3)
    elevator.requests.push(person)
    elevator._setCurrentHour(9)
    elevator.dispatch()
    assert.equal(elevator.currentFloor, 0)
  })

  it('Level 7: optimized dispatch is more efficient than FCFS', () => {
    const requests = [new Person('P1', 3, 6), new Person('P2', 2, 8), new Person('P3', 10, 1)]

    const fcfsElevator = new Elevator()
    fcfsElevator._setCurrentHour(13)
    fcfsElevator.requests = requests.map(r => Object.assign({}, r))
    fcfsElevator.dispatch()

    const optimizedElevator = new Elevator()
    optimizedElevator._setCurrentHour(13)
    optimizedElevator.requests = requests.map(r => Object.assign({}, r))
    optimizedElevator.optimizedDispatch()

    assert.isAtMost(optimizedElevator.floorsTraversed, fcfsElevator.floorsTraversed)
  })
})
