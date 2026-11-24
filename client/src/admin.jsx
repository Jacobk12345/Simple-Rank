import './css/table.css'
import './css/admin.css'

function Admin() {

  return (
    <>
      <h2>
        Admin
      </h2>
      <div style={{ display: 'flex' }}>
        
        <div className="setup" style={{ flex: 1 }}>
          <h3>
            Setup
          </h3>
          <hr />
          
          <div>
            <h4>
              TBA Import
            </h4>
            
            <div style={{ display: 'flex' }}>
              <p>
                Event Key
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <button>
              Submit
            </button>
          </div>
          
          <div>
            <h4>
              Manual Input
            </h4>
            
            <div style={{ display: 'flex' }}>
              <p>
                Match Number
              </p>
              <input style={{ margin: '10px' }} />
            </div>

            <div style={{ display: 'flex' }}>
              <p>
                Video ID
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Red 1
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Red 2
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Red 3
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Blue 1
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Blue 2
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Blue 3
              </p>
              <input style={{ margin: '10px' }} />
            </div>
            
            <div style={{ display: 'flex' }}>
              <p>
                Blue 3
              </p>
              <input style={{ margin: '10px' }} />
            </div>

            <button>
              Submit
            </button>
          </div>
        </div>
        
        <div style={{ flex: 4 }}>
          <h3>
            Assignment
          </h3>
          <hr />
          
          <div style={{ display: 'flex' }}>
          </div>
        </div>
      </div>

    </>
  )
}

export default Admin
