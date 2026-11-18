import React from 'react';

function Gastos() {
  return (
    <div>
      <header className="trip-header">
        <div className="trip-title">
          <h1>✈️ Japón en Navidad</h1>
          <p>24-27 dic 2026 · 4 días</p>
        </div>
        <button className="btn-outline">⇄ Cambiar viaje</button>
      </header>

      <h2>Gastos</h2>
      
      <div className="gastos-container">
        <div className="resumen-grid">
          <div className="resumen-card total">
            <p>Total</p>
            <h2>1.240 €</h2>
          </div>
          <div className="resumen-card">
            <p>Transporte</p>
            <h2>780 €</h2>
          </div>
          <div className="resumen-card">
            <p>Alojamiento</p>
            <h2>460 €</h2>
          </div>
        </div>

        <ul className="lista-gastos">
          <li className="gasto-item">
            <div className="gasto-info">
              <span>Vuelo Tigerair</span>
              <span className="tag">Transporte</span>
            </div>
            <strong>420 €</strong>
          </li>
          <li className="gasto-item">
            <div className="gasto-info">
              <span>Vuelo Scoot</span>
              <span className="tag">Transporte</span>
            </div>
            <strong>360 €</strong>
          </li>
          <li className="gasto-item">
            <div className="gasto-info">
              <span>KOKO Hotel Ginza</span>
              <span className="tag">Alojamiento</span>
            </div>
            <strong>460 €</strong>
          </li>
        </ul>

        <div className="widget-tiempo">
          <span>☁️</span> Tiempo: Tokio 9º / 2º · Yokohama 10º / 3º · Izu 12º / 5º
        </div>
      </div>
    </div>
  );
}

export default Gastos;