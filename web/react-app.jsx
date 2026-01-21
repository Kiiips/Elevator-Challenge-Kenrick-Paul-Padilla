const { useState, useEffect, useRef } = React;

function Shaft({ floors = 10, carFloor = 1 }) {
  const floorHeight = 70;
  const shaftHeight = floors * floorHeight + 20;
  const carStyle = {
    position: 'absolute',
    right: 20,
    width: 70,
    height: floorHeight - 12,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
    border: '2px solid #5568d3',
    transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 28,
  };
  const translateY = (floors - carFloor) * floorHeight + 10;
  return (
    <div style={{ position: 'relative', width: 140, height: shaftHeight, background: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)', borderRadius: 20, border: '3px solid #dee2e6', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      {[...Array(floors)].map((_,i)=>{
        const floorNum = floors - i;
        return (
          <div key={i} style={{position:'absolute',left:0,right:0,top:i*floorHeight + 10,height:floorHeight,borderBottom: i < floors - 1 ? '2px solid #dee2e6' : 'none',display:'flex',alignItems:'center',paddingLeft:12}}>
            <span style={{fontSize:14,fontWeight:600,color:'#6c757d'}}>F{floorNum}</span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
        <div style={{ transform: `translateY(${translateY}px)` }}>
          <div style={carStyle}>🛗</div>
        </div>
      </div>
    </div>
  );
}

function RequestList({ requests, onRemove }) {
  return (
    <div style={{ marginBottom: 20, width: '100%' }}>
      <div style={{ fontWeight: 700, color: '#212529', marginBottom: 12, fontSize: 16 }}>Request Queue</div>
      <div style={{ maxHeight: 200, overflowY: 'auto', background: '#f8f9fa', borderRadius: 8, padding: 12, border: '1px solid #dee2e6' }}>
        {requests.length === 0 && <div style={{ color: '#6c757d', fontStyle: 'italic', textAlign: 'center', padding: 12 }}>No pending requests</div>}
        {requests.map((r, i) => (
          <div key={i} style={{
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600
              }}>F{r.from}</span>
              <span style={{ color: '#adb5bd', fontSize: 16 }}>→</span>
              <span style={{
                background: '#28a745',
                color: 'white',
                padding: '4px 10px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600
              }}>F{r.to}</span>
            </div>
            <button
              style={{
                background: 'transparent',
                border: '1px solid #dc3545',
                borderRadius: 4,
                color: '#dc3545',
                cursor: 'pointer',
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onClick={() => onRemove(i)}
              onMouseEnter={(e) => {
                e.target.style.background = '#dc3545';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#dc3545';
              }}
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Controls({ onAdd }) {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(5);
  return (
    <div style={{ marginBottom: 20, width: '100%' }}>
      <div style={{ fontWeight: 700, color: '#212529', marginBottom: 12, fontSize: 16 }}>Add New Request</div>
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        background: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        border: '1px solid #dee2e6'
      }}>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: '#495057', fontSize: 13, fontWeight: 600 }}>From Floor</span>
          <input
            type="number"
            min={1}
            max={10}
            value={from}
            onChange={e=>setFrom(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ced4da',
              fontSize: 14,
              fontWeight: 500,
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#ced4da'}
          />
        </label>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: '#495057', fontSize: 13, fontWeight: 600 }}>To Floor</span>
          <input
            type="number"
            min={1}
            max={10}
            value={to}
            onChange={e=>setTo(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ced4da',
              fontSize: 14,
              fontWeight: 500,
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#ced4da'}
          />
        </label>
        <button
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '10px 24px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onClick={() => {
            if (from !== to) onAdd({ from, to });
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          }}
        >+ Add Request</button>
      </div>
    </div>
  );
}

function App() {
  const [requests, setRequests] = useState([]); // server state
  const [animQueue, setAnimQueue] = useState([]); // local animation queue: [{from, to, _phase}]
  const [carFloor, setCarFloor] = useState(1);
  const [moving, setMoving] = useState(false);
  const floors = 10;
  const mounted = useRef(false);

  // Fetch requests from server on mount
  useEffect(() => {
    mounted.current = true;
    fetch('/requests').then(r => r.json()).then(data => {
      if (!mounted.current) return;
      setRequests(data || []);
    }).catch(() => {});
    return () => { mounted.current = false; };
  }, []);

  // Animate elevator to pickup, then drop-off for each request
  useEffect(() => {
    if (moving || animQueue.length === 0) return;
    const req = animQueue[0];
    if (!req._phase) req._phase = 'pickup';
    // If idle and car is not at the first request's from, jump to that floor instantly
    if (carFloor !== req.from && !moving && animQueue.length === requests.length && carFloor === 1) {
      setCarFloor(req.from);
      return;
    }
    if (req._phase === 'pickup' && carFloor !== req.from) {
      setMoving(true);
      setTimeout(() => {
        setCarFloor(cf => cf < req.from ? cf + 1 : cf - 1);
        setMoving(false);
      }, 400);
      return;
    }
    if (req._phase === 'pickup' && carFloor === req.from) {
      // Arrived at pickup, now go to drop-off
      req._phase = 'dropoff';
      setMoving(true);
      setTimeout(() => {
        setMoving(false);
        setAnimQueue(q => [Object.assign({}, req), ...q.slice(1)]); // force rerender
      }, 400);
      return;
    }
    if (req._phase === 'dropoff' && carFloor !== req.to) {
      setMoving(true);
      setTimeout(() => {
        setCarFloor(cf => cf < req.to ? cf + 1 : cf - 1);
        setMoving(false);
      }, 400);
      return;
    }
    if (req._phase === 'dropoff' && carFloor === req.to) {
      // Arrived at drop-off, remove request
      setMoving(true);
      setTimeout(() => {
        setAnimQueue(q => q.slice(1));
        setMoving(false);
      }, 600);
      return;
    }
  }, [animQueue, carFloor, moving, requests.length]);

  function add(req) {
    // If queue is empty, warp elevator to 'from' floor instantly
    if (animQueue.length === 0) setCarFloor(req.from);
    // Add to server
    fetch('/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) })
      .then(() => fetch('/requests'))
      .then(r => r.json())
      .then(data => setRequests(data || []))
      .catch(() => {});
    // Add to local animation queue
    setAnimQueue(q => [...q, {...req}]);
  }
  function remove(i) {
    fetch(`/requests/${i}`, { method: 'DELETE' })
      .then(() => fetch('/requests'))
      .then(r => r.json())
      .then(data => {
        setRequests(data || []);
        setAnimQueue(q => q.filter((_, idx) => idx !== i));
      })
      .catch(() => {});
  }
  function reset() {
    fetch('/requests', { method: 'DELETE' })
      .then(() => {
        setRequests([]);
        setAnimQueue([]);
        setCarFloor(1);
      })
      .catch(() => {});
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', minHeight: '100vh', background: '#ffffff', padding: 0, margin: 0 }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 60,
        padding: '40px 20px',
        minHeight: '100vh'
      }}>
        <div style={{
          width: 450,
          background: 'white',
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 900,
              fontSize: 36,
              letterSpacing: '-0.5px'
            }}>Elevator Simulator</h1>
            <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: 14 }}></p>
          </div>
          <Controls onAdd={add} />
          <RequestList requests={requests} onRemove={remove} />
          <div style={{
            marginTop: 20,
            padding: 20,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: 12,
            border: '2px solid #dee2e6'
          }}>
            <div style={{ fontWeight: 700, color: '#212529', marginBottom: 12, fontSize: 16 }}>Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6c757d', fontSize: 14 }}>Current Floor</span>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 16
                }}>F{carFloor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6c757d', fontSize: 14 }}>Pending Requests</span>
                <span style={{
                  background: animQueue.length > 0 ? '#28a745' : '#6c757d',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 16
                }}>{animQueue.length}</span>
              </div>
            </div>
          </div>
          <button
            style={{
              marginTop: 20,
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onClick={reset}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
            }}
          >Reset</button>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}>
          <Shaft floors={floors} carFloor={carFloor} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
