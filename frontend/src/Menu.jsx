import { nombreDeViaje } from './formato'

function Menu({ pagina, onIr, viaje }) {
  function clase(nombre) {
    return pagina === nombre ? 'sidebar-item active' : 'sidebar-item'
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="sidebar-item" title="Próximamente">
          <span>👤</span> Mi cuenta
        </button>
        <button className={clase('viajes')} onClick={() => onIr('viajes')}>
          <span>✈️</span> Mis viajes
        </button>
        <button className={clase('nuevo')} onClick={() => onIr('nuevo')}>
          <span>➕</span> Nuevo viaje
        </button>
      </div>

      {viaje && (
        <nav>
          <p className="sidebar-titulo">{nombreDeViaje(viaje)}</p>
          <a className="sidebar-item" href="#actividades">
            <span>📅</span> Actividades
          </a>
          <a className="sidebar-item" href="#tareas">
            <span>✅</span> Tareas
          </a>
          <a className="sidebar-item" href="#gastos">
            <span>💶</span> Gastos
          </a>
          <a className="sidebar-item" href="#documentos">
            <span>📄</span> Documentos
          </a>
        </nav>
      )}

      <div className="sidebar-footer">
        <button className="sidebar-item" title="Próximamente">
          <span>🚪</span> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default Menu
