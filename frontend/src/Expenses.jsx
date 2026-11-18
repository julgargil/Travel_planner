//ISSUE 3 DAVID
import { useState, useEffect } from 'react';
import { getExpenses, createExpense, deleteExpense } from './api';
import './index.css';
//ISSUE4 DAVID
import { getExpenses, createExpense, deleteExpense, getExpenseTotals } from './api';

export default function Expenses({ activeTrip }) {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    //ISSUE 4 DAVID
    const [totals, setTotals] = useState({ Total: 0, Transporte: 0, Alojamiento: 0 });
    //--------------------------------------------------------------------------------
    const [category, setCategory] = useState('Transporte');

    useEffect(() => {
        if (activeTrip && activeTrip.id) {
            loadExpenses();
        }
    }, [activeTrip]);

    const loadExpenses = async () => {
        try {
            const data = await getExpenses(activeTrip.id);
            setExpenses(data);
            const totalsData = await getExpenseTotals(activeTrip.id);
            setTotals(totalsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        if (!description || !amount) return;
        
        await createExpense(activeTrip.id, {
            description,
            amount: parseFloat(amount),
            category
        });
        
        setDescription('');
        setAmount('');
        loadExpenses();
    };

    const handleDelete = async (expenseId) => {
        await deleteExpense(expenseId);
        loadExpenses();
    };

    if (!activeTrip) {
        return <div className="p4-container">Selecciona un viaje activo para ver los gastos.</div>;
    }

    return (
        <div className="p4-container" style={{ padding: '1rem', background: '#1e1e1e', borderRadius: '8px', color: 'white' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <div style={{ background: '#111', padding: '15px', borderRadius: '8px', flex: 1 }}>
                    <div style={{ color: '#aaa', fontSize: '0.9em', marginBottom: '5px' }}>Total</div>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{totals.Total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
                </div>
                <div style={{ background: '#111', padding: '15px', borderRadius: '8px', flex: 1 }}>
                    <div style={{ color: '#aaa', fontSize: '0.9em', marginBottom: '5px' }}>Transporte</div>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{totals.Transporte.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
                </div>
                <div style={{ background: '#111', padding: '15px', borderRadius: '8px', flex: 1 }}>
                    <div style={{ color: '#aaa', fontSize: '0.9em', marginBottom: '5px' }}>Alojamiento</div>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{totals.Alojamiento.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
                </div>
            </div>
            <form onSubmit={handleAddExpense} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Ej. Vuelo Scoot" 
                    required 
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#333', color: 'white' }}
                />
                <input 
                    type="number" 
                    step="0.01"
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                    placeholder="Importe" 
                    required 
                    style={{ width: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#333', color: 'white' }}
                />
                <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#333', color: 'white' }}
                >
                    <option value="Transporte">Transporte</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Ocio">Ocio</option>
                </select>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', background: '#0066cc', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Añadir
                </button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {expenses.map(ex => (
                    <li key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #333' }}>
                        <div>
                            <strong>{ex.description}</strong> <span style={{ color: '#aaa', fontSize: '0.9em' }}>{ex.category}</span>
                        </div>
                        <div>
                            <span>{ex.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                            <button onClick={() => handleDelete(ex.id)} style={{ marginLeft: '15px', background: 'transparent', border: 'none', cursor: 'pointer' }}>🗑</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}