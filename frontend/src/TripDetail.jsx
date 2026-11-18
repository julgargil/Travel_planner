import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { deleteTrip } from './api'
import TripForm from './TripForm'
import { diasDeViaje, estadoDeViaje, nombreDeViaje, plural, rangoDeFechas, separarLugar } from './formato'

function TripDetail({ viaje, onVolver, onCambio, onBorrado }) {
  const [editando, setEditando] = useState(false)
  const [error, setError] = useState('')

  if (!viaje) {
    return (
      <>
        <p>Este viaje ya no existe.</p>
        <button className="boton boton-secundario" onClick={onVolver}>
          Volver a mis viajes
        </button>
      </>
    )
  }

  if (editando) {
    return (
      <TripForm
        viaje={viaje}
        onGuardado={() => {
          setEditando(false)
          onCambio()
        }}
        onCancelar={() => setEditando(false)}
      />
    )
  }

  async function borrar() {
    if (!window.confirm(`¿Borrar el viaje "${nombreDeViaje(viaje)}"? No se puede deshacer.`)) return
    try {
      await deleteTrip(viaje.id)
      onBorrado()
    } catch (err) {
      setError(err.message)
    }
  }

  const estado = estadoDeViaje(viaje.start_date, viaje.end_date)
  const dias = diasDeViaje(viaje.start_date, viaje.end_date)

  return (
    <>
      <button className="volver" onClick={onVolver}>
        <ArrowLeft size={16} /> Mis viajes
      </button>

      <div className="cabecera">
        <div>
          <p className="apagado">{separarLugar(viaje.destination).pais}</p>
          <h1>{nombreDeViaje(viaje)}</h1>
          <p className="apagado">
            {rangoDeFechas(viaje.start_date, viaje.end_date)} · {plural(dias, 'día', 'días')} ·{' '}
            {plural(viaje.travelers, 'viajero', 'viajeros')}
          </p>
        </div>
        <span className={estado === 'Finalizado' ? 'pastilla pastilla-gris' : 'pastilla'}>{estado}</span>
      </div>

      <div className="fila acciones">
        <button className="boton boton-secundario" onClick={() => setEditando(true)}>
          <Pencil size={16} /> Editar
        </button>
        <button className="boton boton-peligro" onClick={borrar}>
          <Trash2 size={16} /> Borrar
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Aquí va el componente de cada compañero, con el id del viaje: <Expenses viajeId={viaje.id} /> */}
      <div className="secciones">
        <section className="tarjeta seccion">
          <h2>Actividades</h2>
          <p className="apagado">Próximamente.</p>
        </section>
        <section className="tarjeta seccion">
          <h2>Tareas</h2>
          <p className="apagado">Próximamente.</p>
        </section>
        <section className="tarjeta seccion">
          <h2>Gastos</h2>
          <p className="apagado">Próximamente.</p>
        </section>
        <section className="tarjeta seccion">
          <h2>Documentos</h2>
          <p className="apagado">Próximamente.</p>
        </section>
      </div>
    </>
  )
}

export default TripDetail
