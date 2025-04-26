import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SleepRecord {
  date: string;
  quality: number;
}

interface SleepQualityChartProps {
  data: SleepRecord[];
}

const formatDateTick = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).toLowerCase();
};

const SleepQualityChart: React.FC<SleepQualityChartProps> = ({ data }) => {
  if (data.length === 0) return null;

  // Estrae gli anni disponibili e seleziona quello più recente di default
  const availableYears = Array.from(new Set(data.map(record => new Date(record.date).getFullYear()))).sort((a, b) => a - b);
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[availableYears.length - 1]);

  // Filtra i dati per l'anno selezionato
  const filteredData = data.filter(record => new Date(record.date).getFullYear() === selectedYear);

  return (
    <div className="chart-container">
      <h2>Andamento Qualità del Sonno - {selectedYear}</h2>
      <div style={{ marginBottom: '10px' }}>
         <label htmlFor="year-general">Seleziona anno: </label>
         <select
           id="year-general"
           value={selectedYear}
           onChange={(e) => setSelectedYear(Number(e.target.value))}
         >
           {availableYears.map(year => (
             <option key={year} value={year}>{year}</option>
           ))}
         </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Nascondiamo l'asse X perché le date saranno visibili nel tooltip */}
          <XAxis dataKey="date" hide />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value: number) => value.toFixed(2)} labelFormatter={formatDateTick} />
          <Legend />
          {/* Linea continua e curva */}
          <Line type="step" dataKey="quality" stroke="#8884d8" activeDot={{ r: 4 }} dot={{ r: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepQualityChart;
