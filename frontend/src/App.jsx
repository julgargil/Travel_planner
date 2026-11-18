import { useEffect, useState } from 'react'
import { getTrips } from './api'

function App() {
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getTrips()
      .then(setViajes)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <main>
      <h1>🧳 Travel Planner</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {viajes.map((viaje) => (
          <li key={viaje.id}>
            {viaje.title} — {viaje.destination} ({viaje.start_date} → {viaje.end_date})
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App