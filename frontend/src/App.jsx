import { useEffect, useState } from 'react'
import { getTrips } from './api'
import Menu from './Menu'
import TripDetail from './TripDetail'
import TripForm from './TripForm'
import TripList from './TripList'

function App() {
  const [pagina, setPagina] = useState('viajes')
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState('')
  const [viajeActivoId, setViajeActivoId] = useState(null)

  function cargarViajes() {
    return getTrips()
      .then(setViajes)
      .catch((e) => setError(e.message))
  }

  function verViaje(id) {
    setViajeActivoId(id)
    setPagina('detalle')
  }

  function alGuardar(viaje) {
    cargarViajes().then(() => verViaje(viaje.id))
  }

  function alBorrar() {
    cargarViajes()
    setPagina('viajes')
  }

  const viajeActivo = viajes.find((viaje) => viaje.id === viajeActivoId)

  useEffect(() => {
    cargarViajes()
  }, [])

  return (
    <div className="app">
      <Menu pagina={pagina} onIr={setPagina} viaje={pagina === 'detalle' ? viajeActivo : null} />

      <main className="contenido">
        {error && <p className="error">{error}</p>}
        {pagina === 'viajes' && (
          <TripList viajes={viajes} onVer={verViaje} onNuevo={() => setPagina('nuevo')} />
        )}
        {pagina === 'nuevo' && <TripForm onGuardado={alGuardar} />}
        {pagina === 'detalle' && (
          <TripDetail
            key={viajeActivoId}
            viaje={viajeActivo}
            onVolver={() => setPagina('viajes')}
            onCambio={cargarViajes}
            onBorrado={alBorrar}
          />
        )}
      </main>
    </div>
  )
}

export default App