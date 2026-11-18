const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function aFecha(texto) {
  const [anio, mes, dia] = texto.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export function diasDeViaje(inicio, fin) {
  const milisegundos = aFecha(fin) - aFecha(inicio)
  return Math.round(milisegundos / 86400000) + 1
}

export function estadoDeViaje(inicio, fin) {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  if (aFecha(fin) < hoy) return 'Finalizado'
  if (aFecha(inicio) > hoy) return 'Próximo'
  return 'En curso'
}

export function rangoDeFechas(inicio, fin) {
  const a = aFecha(inicio)
  const b = aFecha(fin)
  const textoFin = `${b.getDate()} ${MESES[b.getMonth()]} ${b.getFullYear()}`

  if (a.getFullYear() !== b.getFullYear()) {
    return `${a.getDate()} ${MESES[a.getMonth()]} ${a.getFullYear()} – ${textoFin}`
  }
  if (a.getMonth() !== b.getMonth()) {
    return `${a.getDate()} ${MESES[a.getMonth()]} – ${textoFin}`
  }
  return `${a.getDate()} – ${textoFin}`
}

export function separarLugar(texto) {
  const [ciudad, ...resto] = texto.split(',')
  return { ciudad: ciudad.trim(), pais: resto.join(',').trim() }
}

export function nombreDeViaje(viaje) {
  const origen = separarLugar(viaje.origin).ciudad
  const destino = separarLugar(viaje.destination).ciudad
  return origen ? `${origen} - ${destino}` : destino
}

export function plural(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`
}