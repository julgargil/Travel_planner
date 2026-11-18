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
          <span>💼</span> Viajes
        </a>
        <a className="sidebar-item">
          <span>📅</span> Itinerario
        </a>
        <a className="sidebar-item">
          <span>✅</span> Tareas
        </a>
        <a className="sidebar-item active">
          <span>💶</span> Gastos
        </a>
        <a className="sidebar-item">
          <span>📄</span> Documentos
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