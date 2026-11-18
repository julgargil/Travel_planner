import { Plane, PlusCircle } from 'lucide-react'

function Menu({ pagina, onIr }) {
  return (
    <nav className="menu">
      <button className={pagina === 'viajes' ? 'activo' : ''} onClick={() => onIr('viajes')}>
        <Plane size={28} /> Mis viajes
      </button>
      <button className={pagina === 'nuevo' ? 'activo' : ''} onClick={() => onIr('nuevo')}>
        <PlusCircle size={28} /> Nuevo viaje
      </button>
    </nav>
  )
}

export default Menu