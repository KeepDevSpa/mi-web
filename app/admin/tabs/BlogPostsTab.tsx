'use client';

import { useState, useEffect } from 'react';

export default function BlogPostsTab() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/blog-posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        alert('Error cargando posts');
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/admin/blog-posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando post');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog</h2>
        <button
          onClick={() => setEditing({ title: '', excerpt: '', content: '', order: 1 })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Post
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Título</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Extracto</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Orden</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4">{post.excerpt}</td>
              <td className="px-6 py-4">{post.order}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing(post)}
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
            <h3 className="text-xl font-bold mb-4">Editar Post</h3>
            <input
              placeholder="Título"
              value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              placeholder="Extracto"
              value={editing.excerpt}
              onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              placeholder="Contenido"
              value={editing.content}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              rows="6"
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