# Elevator Challenge Implementation

Implementation of the UTD Elevator Challenge (Levels 1-9).

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Setup Instructions

Follow these steps to set up the project:

### 1. Install Root Dependencies

Install testing dependencies (mocha, chai):
```bash
npm install
```

### 2. Install Server Dependencies

Install Express for the API server:
```bash
cd server
npm install
cd ..
```



## Running Tests

Run the automated test suite:
```bash
npm test
```

This will run all 13 tests covering Levels 1-7:
- Level 1: Basic elevator movement
- Level 2: Required methods
- Level 3: Metrics tracking
- Level 4: Multiple requests (FCFS)
- Level 5: All direction combinations
- Level 6: Lobby return behavior
- Level 7: Optimized dispatch algorithm


## Running the Application Locally

Start the Express server:
```bash
cd server
npm start
```

The server and UI will run on [http://localhost:3001](http://localhost:3001)


## Using the Application

Interact with the backend API using tools like Postman, curl, or your own scripts. The frontend is not required for server operation.

## Project Structure

```
elevator-challenge/
├── elevator.js          # Core Elevator class
├── person.js            # Person class
├── elevator.cjs         # CommonJS export for tests
├── person.cjs           # CommonJS export for tests
├── tests/               # Test suites
│   ├── elevator_test.cjs    # Unit tests
│   └── levels_test.cjs      # Integration tests
├── server/              # Express API server
│   └── index.js
└── web/                 # Static web UI (optional)
    ├── index.html
    ├── elevator.js
    ├── person.js
    ├── app.js
    └── style.css
```

## Implementation Details

**Level 1-2:** Elevator and Person classes with test suite
**Level 3:** Metrics tracking (floors traversed, stops)
**Level 4:** Multiple requests with FCFS dispatch
**Level 5:** All direction combinations tested
**Level 6:** Time-based lobby return behavior
**Level 7:** Optimized dispatch algorithm (nearest-pickup-first)
**Level 8:** Web UI with animated visualization (optional)
**Level 9:** Express REST API with CRUD operations
