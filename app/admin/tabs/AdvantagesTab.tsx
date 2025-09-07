'use client';

import { useState, useEffect } from 'react';

export default function AdvantagesTab() {
  const [advantages, setAdvantages] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/advantages');
        const data = await res.json();
        setAdvantages(data);
      } catch (error) {
        alert('Error cargando ventajas');
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/admin/advantages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando ventaja');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ventajas</h2>
        <button
          onClick={() => setEditing({ title: '', content: '', order: 1, icon: '' })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva Ventaja
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Título</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Icono</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Orden</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {advantages.map(a => (
            <tr key={a.id}>
              <td className="px-6 py-4">{a.title}</td>
              <td className="px-6 py-4">{a.icon}</td>
              <td className="px-6 py-4">{a.order}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing(a)}
                  className="text-blue-600 mr-4"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Ventaja</h3>
            <input
              placeholder="Título"
              value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              placeholder="Contenido"
              value={editing.content}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              rows="4"
            />
            <input
              placeholder="Icono (opcional)"
              value={editing.icon}
              onChange={e => setEditing({ ...editing, icon: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="number"
              placeholder="Orden"
              value={editing.order}
              onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) })}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded">
                Guardar
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}