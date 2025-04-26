//AL MOMENTO NON è UTILIZZATO
//IMPLEMENTATO IN SleepDetails.tsx

import React from 'react';

interface SleepRecord {
  date: string;
  quality: number;
  duration: number;
  deepSleep: number;
  remSleep: number;
  awakeTime: number;
}

interface InsightsProps {
  data: SleepRecord[];
}

const Insights: React.FC<InsightsProps> = ({ data }) => {
  const insights = data.map(record => {
    let advice = '';
    if (record.quality >= 80) {
      advice = '✅ Ottimo lavoro! Mantieni queste abitudini';
    } else if (record.quality >= 60) {
      advice = '📈Qualità del sonno buona ma migliorabile.';
    } else if (record.quality >= 40) {
      advice = "📱 Riduci l'uso di dispositivi 1-2 ore prima di dormire\n🌡️ Mantieni una temperatura ambiente di 18-20°C\n☕ Evita caffeina dopo le 16:00";
    } else {
      advice = "⚠️Considera una consulenza specialistica\n👨‍⚕️ Migliora l'ambiente di sonno (rumore/luce/temperatura)";
    }
    return { date: record.date, advice };
  });

  return (
    <div className="insights">
      <h2>Insights e Consigli</h2>
      <ul>
        {insights.map((item, index) => (
          <li key={index}>
            <strong>{new Date(item.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: '2-digit'
            })}:</strong> {item.advice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Insights;
