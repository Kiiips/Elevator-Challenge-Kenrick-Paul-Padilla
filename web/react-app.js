import React from 'https://esm.sh/react'
import { createRoot } from 'https://esm.sh/react-dom/client'
import Elevator from './elevator.js'

function RequestForm({onAdd}){
  const [name, setName] = React.useState('')
  const [currentFloor, setCurrentFloor] = React.useState(0)
  const [dropOffFloor, setDropOffFloor] = React.useState(1)
  return (
    React.createElement('form',{onSubmit:e=>{e.preventDefault(); onAdd({name,currentFloor:Number(currentFloor),dropOffFloor:Number(dropOffFloor)}); setName('');}},
      React.createElement('input',{placeholder:'Name',value:name,onChange:e=>setName(e.target.value),required:true}),
      React.createElement('input',{type:'number',value:currentFloor,onChange:e=>setCurrentFloor(e.target.value),min:0}),
      React.createElement('input',{type:'number',value:dropOffFloor,onChange:e=>setDropOffFloor(e.target.value),min:0}),
      React.createElement('button',null,'Add request')
    )
  )
}

function RequestList({items}){
  return React.createElement('ul',null,items.map((r,i)=>React.createElement('li',{key:i},`${r.name}: ${r.currentFloor} -> ${r.dropOffFloor}`)))
}

function Controls({onRefresh,onClear,onRun,onOptimize}){
  return React.createElement('div',{className:'controls'},
    React.createElement('button',{onClick:onRefresh},'Refresh'),
    React.createElement('button',{onClick:onClear},'Clear requests'),
    React.createElement('button',{onClick:onRun},'Run (FCFS)'),
    React.createElement('button',{onClick:onOptimize},'Run (Optimized)')
  )
}

function App(){
  const [requests,setRequests] = React.useState([])

  async function load(){
    const res = await fetch('/requests')
    setRequests(await res.json())
  }

  React.useEffect(()=>{load()},[])

  async function add(r){
    await fetch('/requests',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(r)})
    await load()
  }

  async function clearAll(){
    const res = await fetch('/requests')
    const list = await res.json()
    await Promise.all(list.map(p => fetch(`/requests/${encodeURIComponent(p.name)}`,{method:'DELETE'})))
    await load()
  }

  async function runSim(opt){
    const e = new Elevator()
    e.requests = requests.map(r=>Object.assign({},r))
    if(opt) e.optimizedDispatch(); else e.dispatch()
    alert(`Finished. End floor: ${e.currentFloor}, floorsTraversed: ${e.floorsTraversed}, stops: ${e.stops}`)
    await load()
  }

  return React.createElement('div',{className:'app'},
    React.createElement('h1',null,'Elevator Demo (React)'),
    React.createElement(RequestForm,{onAdd:add}),
    React.createElement(Controls,{onRefresh:load,onClear:clearAll,onRun:()=>runSim(false),onOptimize:()=>runSim(true)}),
    React.createElement('h2',null,'Requests'),
    React.createElement(RequestList,{items:requests})
  )
}

createRoot(document.getElementById('root')).render(React.createElement(App))
