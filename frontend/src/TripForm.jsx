import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { createTrip, updateTrip } from './api'
import { plural, separarLugar } from './formato'

const VACIO = { origin: '', destination: '', start_date: '', end_date: '', travelers: 1 }

function TripForm({ viaje, onGuardado, onCancelar }) {
  const [form, setForm] = useState(() =>
    viaje
      ? {
          origin: viaje.origin,
          destination: viaje.destination,
          start_date: viaje.start_date,
          end_date: viaje.end_date,
          travelers: viaje.travelers,
        }
      : VACIO,
  )
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function cambiarViajeros(diferencia) {
    setForm({ ...form, travelers: Math.max(1, form.travelers + diferencia) })
  }

  async function guardar(e) {
    e.preventDefault()
    setError('')
    setGuardando(true)
    const datos = {
      ...form,
      title: `${separarLugar(form.origin).ciudad} - ${separarLugar(form.destination).ciudad}`,
    }
    try {
      const guardado = viaje ? await updateTrip(viaje.id, datos) : await createTrip(datos)
      onGuardado(guardado)
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <h1>{viaje ? 'Editar viaje' : 'Nuevo viaje'}</h1>
      <p className="apagado">Elige el destino y empieza a planear tu próxima escapada.</p>

      <form className="tarjeta formulario" onSubmit={guardar}>
        <div>
          <h2>Datos del viaje</h2>
          <p className="apagado">¿A dónde nos vamos?</p>
        </div>

        <div className="dos-columnas">
          <label>
            Origen
            <input name="origin" placeholder="Madrid, España" value={form.origin} onChange={cambiar} required />
          </label>
          <label>
            Destino
            <input
              name="destination"
              placeholder="Lisboa, Portugal"
              value={form.destination}
              onChange={cambiar}
              required
            />
          </label>
          <label>
            Ida
            <input name="start_date" type="date" value={form.start_date} onChange={cambiar} required />
          </label>
          <label>
            Vuelta
            <input
              name="end_date"
              type="date"
              min={form.start_date}
              value={form.end_date}
              onChange={cambiar}
              required
            />
          </label>
          <div className="campo">
            <span>Número de pasajeros</span>
            <div className="contador">
              <button
                type="button"
                onClick={() => cambiarViajeros(-1)}
                disabled={form.travelers <= 1}
                aria-label="Quitar pasajero"
              >
                <Minus size={16} />
              </button>
              <span>{plural(form.travelers, 'pasajero', 'pasajeros')}</span>
              <button type="button" onClick={() => cambiarViajeros(1)} aria-label="Añadir pasajero">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="formulario-pie">
          <span className="apagado">Todo listo para tu próxima aventura.</span>
          <div className="fila">
            {onCancelar && (
              <button type="button" className="boton boton-secundario" onClick={onCancelar}>
                Cancelar
              </button>
            )}
            <button type="submit" className="boton" disabled={guardando}>
              {viaje ? 'Guardar cambios' : 'Crear viaje'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default TripForm
