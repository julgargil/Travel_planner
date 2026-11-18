const BASE = '/api'

async function pedir(ruta, opciones = {}) {
  const respuesta = await fetch(BASE + ruta, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  })

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(typeof error.detail === 'string' ? error.detail : 'Datos no válidos')
  }

  if (respuesta.status === 204) return null
  return respuesta.json()
}

export const getTrips = () => pedir('/trips')
export const createTrip = (viaje) => pedir('/trips', { method: 'POST', body: JSON.stringify(viaje) })
export const updateTrip = (id, viaje) => pedir(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(viaje) })
export const deleteTrip = (id) => pedir(`/trips/${id}`, { method: 'DELETE' })