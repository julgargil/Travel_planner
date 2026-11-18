import { useState } from 'react'
import { createTrip } from './api'

const VACIO = { title: '', destination: '', start_date: '', end_date: '' }

function Trips({ viajes, onCambio }) {
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function guardar(e) {
    e.preventDefault()
    setError('')
    try {
      await createTrip(form)
      setForm(VACIO)
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
        <button type="submit">Añadir viaje</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {viajes.map((viaje) => (
          <li key={viaje.id}>
            {viaje.title} — {viaje.destination} ({viaje.start_date} → {viaje.end_date})
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Trips