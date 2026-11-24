import { useEffect, useState } from 'react'

// CSS Import
import './css/table.css'
import './css/admin.css'

const initialMatchForm = {
  match_number: '',
  video_id: '',
  red_1: '',
  red_2: '',
  red_3: '',
  blue_1: '',
  blue_2: '',
  blue_3: '',
}

function Admin() {
  const [matches, setMatches] = useState([])
  const [form, setForm] = useState(initialMatchForm)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [removeAllError, setRemoveAllError] = useState('')
  const [isRemovingAll, setIsRemovingAll] = useState(false)
  const [removeMatchError, setRemoveMatchError] = useState('')
  const [removingMatchId, setRemovingMatchId] = useState(null)

  useEffect(() => {
    fetch('/api/matches')
      .then(response => {
        if (!response.ok) throw new Error('Could not load matches')
        return response.json()
      })
      .then(setMatches)
      .catch(error => console.error(error))
  }, [])

  function handleFormChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          match_number: form.match_number.trim(),
          video_id: form.video_id.trim() || null,
          red_1: Number(form.red_1),
          red_2: Number(form.red_2),
          red_3: Number(form.red_3),
          blue_1: Number(form.blue_1),
          blue_2: Number(form.blue_2),
          blue_3: Number(form.blue_3),
        }),
      })
      const createdMatch = await response.json()

      if (!response.ok) {
        throw new Error(createdMatch.error || 'Could not add match')
      }

      setMatches(current => [...current, createdMatch])
      setForm(initialMatchForm)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not add match')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRemoveAll() {
    setRemoveAllError('')
    setIsRemovingAll(true)

    try {
      const response = await fetch('/api/matches', { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not remove matches')
      setMatches([])
    } catch (error) {
      setRemoveAllError(error instanceof Error ? error.message : 'Could not remove matches')
    } finally {
      setIsRemovingAll(false)
    }
  }

  async function handleRemoveMatch(matchId) {
    setRemoveMatchError('')
    setRemovingMatchId(matchId)

    try {
      const response = await fetch(`/api/matches/${matchId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not remove match')
      setMatches(current => current.filter(match => match.id !== matchId))
    } catch (error) {
      setRemoveMatchError(error instanceof Error ? error.message : 'Could not remove match')
    } finally {
      setRemovingMatchId(null)
    }
  }

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
              Import
            </button>
          </div>
          
          <div>
            <h4>
              Manual Input
            </h4>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex' }}>
                <p>Match Number</p>
                <input
                  name="match_number"
                  value={form.match_number}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Video ID</p>
                <input
                  name="video_id"
                  type="text"
                  value={form.video_id}
                  onChange={handleFormChange}
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Red 1</p>
                <input
                  name="red_1"
                  type="number"
                  min="1"
                  step="1"
                  value={form.red_1}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Red 2</p>
                <input
                  name="red_2"
                  type="number"
                  min="1"
                  step="1"
                  value={form.red_2}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Red 3</p>
                <input
                  name="red_3"
                  type="number"
                  min="1"
                  step="1"
                  value={form.red_3}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Blue 1</p>
                <input
                  name="blue_1"
                  type="number"
                  min="1"
                  step="1"
                  value={form.blue_1}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Blue 2</p>
                <input
                  name="blue_2"
                  type="number"
                  min="1"
                  step="1"
                  value={form.blue_2}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <p>Blue 3</p>
                <input
                  name="blue_3"
                  type="number"
                  min="1"
                  step="1"
                  value={form.blue_3}
                  onChange={handleFormChange}
                  required
                  style={{ margin: '10px' }}
                />
              </div>

              {submitError && <p role="alert">{submitError}</p>}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
        
        <div style={{ flex: 2 }}>
          <h3>
            All Matches
          </h3>
          <hr />
          
          <div style={{ display: 'flex' }}>
            <table>
              <tr>
                <td>
                  Match #
                </td>
                <td>
                  Red 1
                </td>
                <td>
                  Red 2
                </td>
                <td>
                  Red 3
                </td>
                <td>
                  Blue 1
                </td>
                <td>
                  Blue 2
                </td>
                <td>
                  blue 3
                </td>
                <td>
                  <button
                    type="button"
                    onClick={handleRemoveAll}
                    disabled={isRemovingAll || removingMatchId !== null}
                  >
                    {isRemovingAll ? 'Removing...' : 'Remove All'}
                  </button>
                </td>
              </tr>
              {matches.map(match => (
                <tr>
                  <td>
                    {match.match_number}
                  </td>
                  <td>
                    {match.red_1}
                  </td>
                  <td>
                    {match.red_2}
                  </td>
                  <td>
                    {match.red_3}
                  </td>
                  <td>
                    {match.blue_1}
                  </td>
                  <td>
                    {match.blue_2}
                  </td>
                  <td>
                    {match.blue_3}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveMatch(match.id)}
                      disabled={isRemovingAll || removingMatchId !== null}
                    >
                      {removingMatchId === match.id ? 'Removing...' : 'Remove Match'}
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          {removeAllError && <p role="alert">{removeAllError}</p>}
          {removeMatchError && <p role="alert">{removeMatchError}</p>}
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
