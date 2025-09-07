'use client';

import { useState, useEffect } from 'react';

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        alert('Error cargando testimonios');
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando testimonio');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Testimonios</h2>
        <button
          onClick={() => setEditing({ author: '', content: '', order: 1, role: '' })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Testimonio
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Autor</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Rol</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Orden</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(t => (
            <tr key={t.id}>
              <td className="px-6 py-4">{t.author}</td>
              <td className="px-6 py-4">{t.role}</td>
              <td className="px-6 py-4">{t.order}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing(t)}
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
            <h3 className="text-xl font-bold mb-4">Editar Testimonio</h3>
            <input
              placeholder="Autor"
              value={editing.author}
              onChange={e => setEditing({ ...editing, author: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              placeholder="Rol (opcional)"
              value={editing.role}
              onChange={e => setEditing({ ...editing, role: e.target.value })}
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