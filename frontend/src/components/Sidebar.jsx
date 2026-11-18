import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-item">
          <span className="icon">👤</span> Mi cuenta
        </div>
        <div className="sidebar-item">
          <span className="icon">✈️</span> Mis viajes
        </div>
      </div>
      
      <nav>
        <a className="sidebar-item">
          <span>💼</span> Viajes <span className="badge">P1</span>
        </a>
        <a className="sidebar-item">
          <span>📅</span> Itinerario <span className="badge">P2</span>
        </a>
        <a className="sidebar-item">
          <span>✅</span> Tareas <span className="badge">P3</span>
        </a>
        <a className="sidebar-item active">
          <span>💶</span> Gastos <span className="badge">P4</span>
        </a>
        <a className="sidebar-item">
          <span>📄</span> Documentos <span className="badge">P5</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <a className="sidebar-item">
          <span>🚪</span> Cerrar sesión
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;