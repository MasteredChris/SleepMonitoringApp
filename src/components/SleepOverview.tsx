import React, { useState } from 'react';
import { sleepData } from '../data/sleepData';
import { calculateSleepQuality } from '../utils/calculateQuality';
import TrendCharts from './TrendCharts';
import SleepDetail from './SleepDetail';
import DetailedTrendChart from './DetailedTrendChart';

interface SleepRecordWithQuality {
  id: number;
  date: string;     // Formato "YYYY-MM-DD"
  duration: number;
  deepSleep: number;
  remSleep: number;
  awakeTime: number;
  quality: number;
  lightSleep:number;
}

// Assicurati che i dati siano ordinati cronologicamente
const sortedData: SleepRecordWithQuality[] = sleepData
  .map(record => ({
    ...record,
    quality: calculateSleepQuality(record)
  }))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const SleepOverview: React.FC = () => {
  // Selezioniamo di default l'ultima data (la più recente)
  const [selectedDate, setSelectedDate] = useState<string>(
    sortedData[sortedData.length - 1]?.date || ''
  );

  // Trova il record corrispondente alla data selezionata
  const selectedRecord = sortedData.find(record => record.date === selectedDate);

  // Trova l'indice del record corrente
  const currentIndex = sortedData.findIndex(record => record.date === selectedDate);

  // Controlliamo se esiste un record precedente o successivo
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sortedData.length - 1;

  // Funzioni per passare al giorno precedente o successivo
  const goToPreviousDay = () => {
    if (hasPrev) {
      setSelectedDate(sortedData[currentIndex - 1].date);
    }
  };

  const goToNextDay = () => {
    if (hasNext) {
      setSelectedDate(sortedData[currentIndex + 1].date);
    }
  };

  return (
    <div>
      <h2>Seleziona una data</h2>
      {/* Input di tipo date per scegliere la data manualmente */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={sortedData[0]?.date}
        max={sortedData[sortedData.length - 1]?.date}
      />

      {/* Pulsanti per spostarsi al giorno precedente/successivo */}
      <div style={{ margin: '10px 0' }}>
        <button onClick={goToPreviousDay} disabled={!hasPrev}>
          Precedente
        </button>
        <button onClick={goToNextDay} disabled={!hasNext} style={{ marginLeft: '10px' }}>
          Successivo
        </button>
      </div>

      {selectedRecord ? (
        //Dettagli della dormita
        <SleepDetail record={selectedRecord} />
      ) : (
        <div className="sleep-detail">
          <p>Dati non disponibili per quella data</p>
        </div>
      )}


      <DetailedTrendChart data={sortedData} />
      <TrendCharts data={sortedData} />
    </div>
  );
};

export default SleepOverview;
