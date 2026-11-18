import TripCard from './TripCard'
import { plural } from './formato'

function TripList({ viajes, onVer, onNuevo }) {
  return (
    <>
      <div className="cabecera">
        <div>
          <h1>Mis viajes</h1>
          <p className="apagado">Tus planes, recuerdos y próximas escapadas.</p>
        </div>
        <span className="pastilla">{plural(viajes.length, 'viaje', 'viajes')}</span>
      </div>

      <h2>Todos tus viajes</h2>

      {viajes.length === 0 ? (
        <div className="tarjeta vacio">
          <p>Todavía no tienes viajes.</p>
          <button className="boton" onClick={onNuevo}>Crear mi primer viaje</button>
        </div>
      ) : (
        <div className="rejilla">
          {viajes.map((viaje) => (
            <TripCard key={viaje.id} viaje={viaje} onVer={onVer} />
          ))}
        </div>
      )}
    </>
  )
}

export default TripList