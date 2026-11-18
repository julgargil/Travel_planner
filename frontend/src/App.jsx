import React from 'react';
import Sidebar from './components/Sidebar';
import Gastos from './components/Gastos';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Gastos />
      </main>
    </div>
  );
}

export default App;