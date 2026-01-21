import Elevator from './elevator.js'

const runBtn = document.getElementById('run')
const optBtn = document.getElementById('opt')
const addForm = document.getElementById('addForm')
const requestsList = document.getElementById('requests')
const clearBtn = document.getElementById('clear')
const shaft = document.getElementById('shaft')

const MIN_FLOOR = 0
const MAX_FLOOR = 10

function log(s){ console.log(s) }

function createShaft(){
  shaft.innerHTML = ''
  for(let f = MAX_FLOOR; f >= MIN_FLOOR; f--){
    const row = document.createElement('div')
    row.className = 'floor'
    row.dataset.floor = f
    row.innerHTML = `<div class="label">${f}</div>`
    shaft.appendChild(row)
  }
  const car = document.createElement('div')
  car.id = 'car'
  car.innerHTML = `<div class="doors"><div class="door left"></div><div class="door right"></div></div>`
  shaft.appendChild(car)
}

createShaft()

async function fetchRequests(){
  const res = await fetch('/requests')
  return res.json()
}

async function renderRequests(){
  const reqs = await fetchRequests()
  requestsList.innerHTML = ''
  reqs.forEach(r => {
    const li = document.createElement('li')
    li.textContent = `${r.name}: ${r.currentFloor} -> ${r.dropOffFloor}`
    requestsList.appendChild(li)
  })
}

addForm.addEventListener('submit', async (ev)=>{
  ev.preventDefault()
  const name = document.getElementById('name').value
  const currentFloor = Number(document.getElementById('currentFloor').value)
  const dropOffFloor = Number(document.getElementById('dropOffFloor').value)
  await fetch('/requests', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({name,currentFloor,dropOffFloor})})
  await renderRequests()
  addForm.reset()
})

clearBtn.addEventListener('click', async ()=>{
  const reqs = await fetchRequests()
  await Promise.all(reqs.map(r => fetch(`/requests/${encodeURIComponent(r.name)}`, {method:'DELETE'})))
  await renderRequests()
})

function setCarFloor(floor){
  const car = document.getElementById('car')
  const floorEls = Array.from(document.querySelectorAll('.floor'))
  const idx = floorEls.findIndex(el => Number(el.dataset.floor) === floor)
  if (idx === -1) return
  const target = floorEls[idx]
  car.style.top = `${target.offsetTop}px`
}

function animateTrace(trace, interval=600){
  return new Promise(resolve => {
    let i = 0
    const step = ()=>{
      if (i>=trace.length){ resolve(); return }
      setCarFloor(trace[i])
      const car = document.getElementById('car')
      car.classList.add('open')
      log(`Floor ${trace[i]}`)
      i++
      setTimeout(()=>{
        car.classList.remove('open')
        setTimeout(step, 200)
      }, Math.max(200, interval - 200))
    }
    step()
  })
}

async function runSimulation(useOptimized=false){
  const reqs = await fetchRequests()
  if (!reqs.length) { log('No requests'); return }
  const ElevatorClass = Elevator
  const e = new ElevatorClass()
  e.requests = reqs.map(r => Object.assign({}, r))

  const trace = []
  e.onMove = (floor)=> trace.push(floor)

  if (useOptimized) e.optimizedDispatch()
  else e.dispatch()

  console.log('Starting simulation')
  setCarFloor(0)
  await animateTrace(trace)
  console.log(`Finished. End floor: ${e.currentFloor}, floorsTraversed: ${e.floorsTraversed}, stops: ${e.stops}`)
  await renderRequests()
}

runBtn.addEventListener('click', ()=> runSimulation(false))
optBtn.addEventListener('click', ()=> runSimulation(true))

renderRequests()
