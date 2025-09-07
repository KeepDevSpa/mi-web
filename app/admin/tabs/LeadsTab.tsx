'use client';

import { useState, useEffect } from 'react';

export default function LeadsTab() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/leads');
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        alert('Error cargando leads');
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Leads Recibidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Teléfono</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Mensaje</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} className="border-t">
                <td className="px-6 py-4">{lead.name}</td>
                <td className="px-6 py-4">{lead.phone}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.message}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}