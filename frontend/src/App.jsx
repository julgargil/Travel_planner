import { useEffect, useState } from 'react'
import { getTrips } from './api'
import SelectorViaje from './SelectorViaje'
import Trips from './Trips'

function App() {
  const [viajes, setViajes] = useState([])
  const [viajeActivoId, setViajeActivoId] = useState(null)
  const [error, setError] = useState('')

  function cargarViajes() {
    getTrips()
      .then(setViajes)
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    cargarViajes()
  }, [])

  const viajeActivo = viajes.find((viaje) => viaje.id === viajeActivoId)

  return (
    <main>
      <h1>🧳 Travel Planner</h1>
      {error && <p className="error">{error}</p>}

      <SelectorViaje viajes={viajes} activoId={viajeActivoId} onElegir={setViajeActivoId} />

      {viajeActivo ? (
        <section>
          <h2>{viajeActivo.title} · {viajeActivo.destination}</h2>
          <p>Aquí irán las actividades, tareas, gastos y documentos de este viaje.</p>
        </section>
      ) : (
        <p>Elige un viaje para ver sus actividades, tareas, gastos y documentos.</p>
      )}

      <Trips viajes={viajes} onCambio={cargarViajes} />
    </main>
  )
}

export default App