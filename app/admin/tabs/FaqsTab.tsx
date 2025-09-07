'use client';

import { useState, useEffect } from 'react';

export default function FaqsTab() {
  const [faqs, setFaqs] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/faq-items');
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        alert('Error cargando FAQs');
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/admin/faq-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando FAQ');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
        <button
          onClick={() => setEditing({ question: '', answer: '', page: 'home', order: 1 })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva FAQ
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Pregunta</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Página</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Orden</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map(faq => (
            <tr key={faq.id}>
              <td className="px-6 py-4">{faq.question}</td>
              <td className="px-6 py-4">{faq.page}</td>
              <td className="px-6 py-4">{faq.order}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing(faq)}
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
            <h3 className="text-xl font-bold mb-4">Editar FAQ</h3>
            <input
              placeholder="Pregunta"
              value={editing.question}
              onChange={e => setEditing({ ...editing, question: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              placeholder="Respuesta"
              value={editing.answer}
              onChange={e => setEditing({ ...editing, answer: e.target.value })}
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