import { useState } from 'react'
import { createTrip, deleteTrip, updateTrip } from './api'

const VACIO = { title: '', destination: '', start_date: '', end_date: '' }

function Trips({ viajes, onCambio }) {
  const [form, setForm] = useState(VACIO)
  const [editandoId, setEditandoId] = useState(null)
  const [error, setError] = useState('')

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function limpiar() {
    setForm(VACIO)
    setEditandoId(null)
    setError('')
  }

  async function guardar(e) {
    e.preventDefault()
    setError('')
    try {
      if (editandoId) {
        await updateTrip(editandoId, form)
      } else {
        await createTrip(form)
      }
      limpiar()
      onCambio()
    } catch (err) {
      setError(err.message)
    }
  }

  function empezarEdicion(viaje) {
    setForm({
      title: viaje.title,
      destination: viaje.destination,
      start_date: viaje.start_date,
      end_date: viaje.end_date,
    })
    setEditandoId(viaje.id)
    setError('')
  }

  async function borrar(viaje) {
    if (!window.confirm(`¿Borrar "${viaje.title}"?`)) return
    try {
      await deleteTrip(viaje.id)
      if (editandoId === viaje.id) limpiar()
      onCambio()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h2>Mis viajes</h2>

      <form onSubmit={guardar}>
        <input name="title" placeholder="Título" value={form.title} onChange={cambiar} required />
        <input name="destination" placeholder="Destino" value={form.destination} onChange={cambiar} required />
        <input name="start_date" type="date" value={form.start_date} onChange={cambiar} required />
        <input name="end_date" type="date" value={form.end_date} onChange={cambiar} required />
        <button type="submit">{editandoId ? 'Guardar cambios' : 'Añadir viaje'}</button>
        {editandoId && (
          <button type="button" onClick={limpiar}>Cancelar</button>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {viajes.map((viaje) => (
          <li key={viaje.id}>
            {viaje.title} — {viaje.destination} ({viaje.start_date} → {viaje.end_date})
            <button onClick={() => empezarEdicion(viaje)}>Editar</button>
            <button onClick={() => borrar(viaje)}>Borrar</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Trips