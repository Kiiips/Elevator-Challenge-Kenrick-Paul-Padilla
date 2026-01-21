export default class Elevator {
  constructor() {
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.requests = []
    this.riders = []
    this.onMove = null // callback(floor)
    this._currentHour = null
  }

  dispatch() {
    while (this.requests.length > 0) {
      const req = this.requests[0]
      this.goToFloor(req)
    }
  }

  goToFloor(person) {
    while (this.currentFloor !== person.currentFloor) {
      if (person.currentFloor > this.currentFloor) this.moveUp()
      else this.moveDown()
    }

    // pickup at current
    this._handleStops()

    while (this.riders.length > 0) {
      const nextDrop = this.riders[0].dropOffFloor
      while (this.currentFloor !== nextDrop) {
        if (nextDrop > this.currentFloor) this.moveUp()
        else this.moveDown()
      }
      // drop handled in _handleStops
      this._handleStops()
    }

    if (this.checkReturnToLobby()) this.returnToLobby()
  }

  moveUp() {
    this.currentFloor++
    this.floorsTraversed++
    if (this.onMove) this.onMove(this.currentFloor)
    if (this._handleStops()) this.stops++
  }

  moveDown() {
    if (this.currentFloor === 0) return
    this.currentFloor--
    this.floorsTraversed++
    if (this.onMove) this.onMove(this.currentFloor)
    if (this._handleStops()) this.stops++
  }

  hasPickup() {
    return this.requests.some(r => r.currentFloor === this.currentFloor)
  }

  hasDropoff() {
    return this.riders.some(r => r.dropOffFloor === this.currentFloor)
  }

  _handleStops() {
    let stopped = false
    const pickups = this.requests.filter(r => r.currentFloor === this.currentFloor)
    if (pickups.length) {
      stopped = true
      this.requests = this.requests.filter(r => r.currentFloor !== this.currentFloor)
      pickups.forEach(p => this.riders.push(p))
    }
    const dropOffs = this.riders.filter(r => r.dropOffFloor === this.currentFloor)
    if (dropOffs.length) {
      stopped = true
      this.riders = this.riders.filter(r => r.dropOffFloor !== this.currentFloor)
    }
    return stopped
  }

  checkReturnToLobby() {
    const hour = this._currentHour != null ? this._currentHour : new Date().getHours()
    return hour < 12 && this.riders.length === 0
  }

  returnToLobby() {
    while (this.currentFloor > 0) {
      this.moveDown()
    }
  }

  optimizedDispatch() {
    while (this.requests.length > 0) {
      let idx = 0
      let bestDist = Math.abs(this.requests[0].currentFloor - this.currentFloor)
      for (let i = 1; i < this.requests.length; i++) {
        const d = Math.abs(this.requests[i].currentFloor - this.currentFloor)
        if (d < bestDist) { bestDist = d; idx = i }
      }
      const req = this.requests[idx]
      this.goToFloor(req)
    }
  }

  _setCurrentHour(h) { this._currentHour = h }
}
