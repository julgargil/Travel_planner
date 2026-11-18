import { useEffect, useState } from 'react'
import { getTrips } from './api'
import Menu from './Menu'
import TripList from './TripList'

function App() {
  const [pagina, setPagina] = useState('viajes')
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState('')
  const [viajeActivoId, setViajeActivoId] = useState(null)

  function cargarViajes() {
    getTrips()
      .then(setViajes)
      .catch((e) => setError(e.message))
  }

  function verViaje(id) {
    setViajeActivoId(id)
    setPagina('detalle')
  }

  useEffect(() => {
    cargarViajes()
  }, [])

  return (
    <div className="app">
      <Menu pagina={pagina} onIr={setPagina} />

      <main className="contenido">
        {error && <p className="error">{error}</p>}
        {pagina === 'viajes' && (
          <TripList viajes={viajes} onVer={verViaje} onNuevo={() => setPagina('nuevo')} />
        )}
        {pagina === 'nuevo' && <p>Aquí irá el formulario de nuevo viaje.</p>}
        {pagina === 'detalle' && <p>Aquí irá el viaje {viajeActivoId}.</p>}
      </main>
    </div>
  )
}

export default App