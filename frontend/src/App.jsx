import { useEffect, useState } from 'react'
import { getTrips } from './api'
import Trips from './Trips'

function App() {
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState('')

  function cargarViajes() {
    getTrips()
      .then(setViajes)
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    cargarViajes()
  }, [])

  return (
    <main>
      <h1>🧳 Travel Planner</h1>
      {error && <p className="error">{error}</p>}
      <Trips viajes={viajes} onCambio={cargarViajes} />
    </main>
  )
}

export default App