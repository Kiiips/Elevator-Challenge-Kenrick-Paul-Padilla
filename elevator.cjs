class Elevator {
  constructor() {
    // start state for TDD implementation
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.requests = []
    this.riders = []
    // optional override for current hour (makes tests deterministic)
    this._currentHour = null
  }

  // First-come-first-serve dispatch
  dispatch() {
    // process requests in order but don't remove them here — goToFloor/_handleStops will remove
    while (this.requests.length > 0) {
      const req = this.requests[0]
      this.goToFloor(req)
    }
  }

  goToFloor(person) {
    // move to pickup
    while (this.currentFloor !== person.currentFloor) {
      if (person.currentFloor > this.currentFloor) this.moveUp()
      else this.moveDown()
    }

    // pickup (become rider) — ensure pickups at same floor count as a stop
    const picked = this._handleStops()
    if (picked && this.floorsTraversed === 0) this.stops++

    // move to dropoffs for current riders (process all riders in elevator)
    // We'll continue moving until no riders have pending dropoffs
    while (this.riders.length > 0) {
      const nextDrop = this.riders[0].dropOffFloor
      while (this.currentFloor !== nextDrop) {
        if (nextDrop > this.currentFloor) this.moveUp()
        else this.moveDown()
      }
      // dropoff handled in moveUp/moveDown via checks
    }

    // optional return to lobby
    if (this.checkReturnToLobby()) this.returnToLobby()
  }

  moveUp() {
    this.currentFloor++
    this.floorsTraversed++
    // after moving, handle pickups/dropoffs
    if (this._handleStops()) this.stops++
  }

  moveDown() {
    // don't go below ground
    if (this.currentFloor === 0) return
    this.currentFloor--
    this.floorsTraversed++
    if (this._handleStops()) this.stops++
  }

  // public API compatible method name
  hasStop() {
    return (this.hasPickup() || this.hasDropoff()) && (this.floorsTraversed > 0)
  }

  hasPickup() {
    return this.requests.some(r => r.currentFloor === this.currentFloor)
  }

  hasDropoff() {
    return this.riders.some(r => r.dropOffFloor === this.currentFloor)
  }

  checkReturnToLobby() {
    const hour = this._currentHour != null ? this._currentHour : new Date().getHours()
    return hour < 12 && this.riders.length === 0
  }

  returnToLobby() {
    while (this.currentFloor > 0) this.moveDown()
  }

  // Helper: handle pickups and dropoffs at current floor, return true if a stop occurred
  _handleStops() {
    let stopped = false
    // pickups
    const pickups = this.requests.filter(r => r.currentFloor === this.currentFloor)
    if (pickups.length) {
      stopped = true
      // remove from requests and add to riders
      this.requests = this.requests.filter(r => r.currentFloor !== this.currentFloor)
      pickups.forEach(p => this.riders.push(p))
    }

    // dropoffs
    const dropOffs = this.riders.filter(r => r.dropOffFloor === this.currentFloor)
    if (dropOffs.length) {
      stopped = true
      this.riders = this.riders.filter(r => r.dropOffFloor !== this.currentFloor)
    }

    return stopped
  }

  _pickupAtCurrentFloor() {
    const pickups = this.requests.filter(r => r.currentFloor === this.currentFloor)
    this.requests = this.requests.filter(r => r.currentFloor !== this.currentFloor)
    pickups.forEach(p => this.riders.push(p))
    if (pickups.length) this.stops++
  }

  // Optimize: choose nearest pickup first (Level 7)
  optimizedDispatch() {
    while (this.requests.length > 0) {
      // pick request with minimal distance from current floor (but don't remove it yet)
      let idx = 0
      let bestDist = Math.abs(this.requests[0].currentFloor - this.currentFloor)
      for (let i = 1; i < this.requests.length; i++) {
        const d = Math.abs(this.requests[i].currentFloor - this.currentFloor)
        if (d < bestDist) {
          bestDist = d
          idx = i
        }
      }
      const req = this.requests[idx]
      this.goToFloor(req)
    }
  }

  // allow tests to set current hour
  _setCurrentHour(h) {
    this._currentHour = h
  }

  reset() {
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.riders = []
  }
}

module.exports = Elevator
