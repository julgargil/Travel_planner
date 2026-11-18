import { ArrowRight } from 'lucide-react'
import { diasDeViaje, estadoDeViaje, plural, rangoDeFechas, separarLugar } from './formato'

function TripCard({ viaje, onVer }) {
  const origen = separarLugar(viaje.origin)
  const destino = separarLugar(viaje.destination)
  const estado = estadoDeViaje(viaje.start_date, viaje.end_date)
  const dias = diasDeViaje(viaje.start_date, viaje.end_date)

  return (
    <article className="tarjeta viaje">
      <header className="viaje-cabecera">
        <span className="apagado">{destino.pais}</span>
        <span className={estado === 'Finalizado' ? 'pastilla pastilla-gris' : 'pastilla'}>{estado}</span>
      </header>

      <div className="viaje-cuerpo">
        <h3>{origen.ciudad ? `${origen.ciudad} - ${destino.ciudad}` : destino.ciudad}</h3>
        <p>{rangoDeFechas(viaje.start_date, viaje.end_date)}</p>
        <p className="apagado">
          {plural(dias, 'día', 'días')} · {plural(viaje.travelers, 'viajero', 'viajeros')}
        </p>
      </div>

      <button className="viaje-pie" onClick={() => onVer(viaje.id)}>
        Ver viaje <ArrowRight size={18} />
      </button>
    </article>
  )
}

export default TripCard