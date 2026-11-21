import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Home from './home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: '10px' }}>
            Simple Rank
          </h1>
          <p style={{ margin: '10px' }}>
            A simple ranking tool
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '10px' }}>
            Ranking
          </p>
          <p style={{ margin: '10px' }}>
            Admin
          </p>
        </div>
      </div>
      <hr/>
    </>
    <Home />
  </StrictMode>,
)
