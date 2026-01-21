# Testing Guide

## Automated Tests

Run the test suite:
```bash
npx mocha elevator-challenge/tests/*.cjs
```

### Test Coverage

The test suite includes:

**Unit Tests**
- Elevator initialization
- Person class properties

**Level 1**
- Single person going up
- Single person going down

**Level 2**
- Required methods (moveUp, moveDown, hasPickup, hasDropoff, hasStop)

**Level 3**
- Metrics tracking (floorsTraversed, stops)

**Level 4**
- Multiple requests in FCFS order

**Level 5**
- Person A up, Person B up
- Person A up, Person B down
- Person A down, Person B up
- Person A down, Person B down

**Level 6**
- Return to lobby before noon
- Stay at current floor after noon

**Level 7**
- Optimized dispatch vs FCFS comparison

## Manual Testing

### Level 8: UI Visualization

Start the server:
```bash
cd elevator-challenge/server
node index.js
```

Open [http://localhost:3001](http://localhost:3001)

Test the following:
- Add elevator requests using the form
- Watch elevator animation
- View request queue
- Check status panel
- Remove individual requests
- Use reset button

### Level 9: REST API

The API runs alongside the UI server.

**Available Endpoints:**

GET /requests - List all requests
```bash
curl http://localhost:3001/requests
```

POST /requests - Create request
```bash
curl -X POST http://localhost:3001/requests \
  -H "Content-Type: application/json" \
  -d '{"from": 3, "to": 7}'
```

DELETE /requests/:name - Remove request
```bash
curl -X DELETE http://localhost:3001/requests/PersonA
```

GET /riders - List current riders
```bash
curl http://localhost:3001/riders
```

GET /debug - View server state
```bash
curl http://localhost:3001/debug
```
