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

//ISSUE 3 DAVID
export const getExpenses = async (tripId) => {
    const res = await fetch(`/api/trips/${tripId}/expenses`);
    if (!res.ok) throw new Error("Error obteniendo gastos");
    return res.json();
};

export const createExpense = async (tripId, data) => {
    const res = await fetch(`/api/trips/${tripId}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error creando gasto");
    return res.json();
};

export const deleteExpense = async (expenseId) => {
    const res = await fetch(`/api/trips/expenses/${expenseId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Error borrando gasto");
    return res.json();
};

//ISSUE 4 DAVID
export const getExpenseTotals = async (tripId) => {
    const res = await fetch(`/api/trips/${tripId}/expenses/totals`);
    if (!res.ok) throw new Error("Error obteniendo totales");
    return res.json();
};