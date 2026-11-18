function SelectorViaje({ viajes, activoId, onElegir }) {
  if (viajes.length === 0) {
    return <p>Todavía no tienes viajes. Crea uno abajo.</p>
  }

  return (
    <label>
      Viaje activo:{' '}
      <select
        value={activoId ?? ''}
        onChange={(e) => onElegir(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">— Elige un viaje —</option>
        {viajes.map((viaje) => (
          <option key={viaje.id} value={viaje.id}>
            {viaje.title}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectorViaje