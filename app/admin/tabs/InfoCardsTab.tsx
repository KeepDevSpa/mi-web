'use client';

import { useState, useEffect } from 'react';

export default function InfoCardsTab() {
  const [cards, setCards] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/information-cards');
        const data = await res.json();
        setCards(data);
      } catch (error) {
        alert('Error cargando tarjetas');
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/admin/information-cards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando tarjeta');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tarjetas Informativas</h2>
        <button
          onClick={() => setEditing({ title: '', description: '', page: 'home', section: 'ventajas' })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva Tarjeta
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Título</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Página</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Sección</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card.id}>
              <td className="px-6 py-4">{card.title}</td>
              <td className="px-6 py-4">{card.page}</td>
              <td className="px-6 py-4">{card.section}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing(card)}
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
            <h3 className="text-xl font-bold mb-4">Editar Tarjeta</h3>
            <input
              placeholder="Título"
              value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              placeholder="Descripción"
              value={editing.description}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              rows="4"
            />
            <input
              placeholder="Página"
              value={editing.page}
              onChange={e => setEditing({ ...editing, page: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              placeholder="Sección"
              value={editing.section}
              onChange={e => setEditing({ ...editing, section: e.target.value })}
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