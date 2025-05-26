import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Papa from 'papaparse';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ReminderDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/Supabase Snippet Retrieve All Data from Reminders.csv')
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const grouped = results.data.reduce((acc, row) => {
              const patient = row.patient || 'Unknown';
              acc[patient] = (acc[patient] || 0) + 1;
              return acc;
            }, {});

            const chartData = Object.entries(grouped).map(([patient, count]) => ({
              patient,
              count
            }));

            setData(chartData);
          }
        });
      });
  }, []);

  const filteredData = data.filter(d => d.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reminder Logs Visualization</h1>

      <Input
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-md"
      />

      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="patient" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
