import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Home from './home.jsx'
import Admin from './admin.jsx'
import Error from './error.jsx'

function APP() {
  const [viewPage, setViewPage] = useState(0)

  return (
    <>
      {/* Header and buttons */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: '10px', flex: 1 }}>Simple Rank</h1>
        <button 
          onClick={() => setViewPage(0)}
          style={{ margin: '10px' }}
        >
          Ranking
        </button>
        <button 
          onClick={() => setViewPage(1)}
          style={{ margin: '10px' }}
        >
          Admin
        </button>
      </div>

      <hr />

      {/* Page content */}
      {viewPage === 0 && <Home />}
      {viewPage === 1 && <Admin />}
      {viewPage !== 0 && viewPage !== 1 && <Error />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <APP />
  </StrictMode>
)
