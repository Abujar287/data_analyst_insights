import { useState } from 'react';
import { KPICard, MetricDetail } from './KPICard';
import { DataTable } from './DataTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  title: string;
  metrics: MetricDetail[];
  onBack: () => void;
}

const mockTableData = [
  { name: 'Team Alpha', value1: '500', value2: '480', ratio: '96%' },
  { name: 'Team Beta', value1: '740', value2: '700', ratio: '94.5%' },
];

const mockGraphData = [
  { day: 'Mon', acquisition: 10, retention: 5, kam: 2, all: 17 },
  { day: 'Tue', acquisition: 15, retention: 8, kam: 3, all: 26 },
  { day: 'Wed', acquisition: 12, retention: 7, kam: 4, all: 23 },
  { day: 'Thu', acquisition: 18, retention: 9, kam: 5, all: 32 },
  { day: 'Fri', acquisition: 20, retention: 10, kam: 6, all: 36 },
];

export function Dashboard({ title, metrics, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Number Insights');

  const tabs = ['Number Insights', 'Graph', 'Agent Wise Order Summary', 'Raw Details'];

  const renderChart = (dataKey: string, title: string, color: string) => (
    <div className="bg-slate-900 p-4 rounded-lg">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockGraphData}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <header className="mb-8">
        <button onClick={onBack} className="text-sky-400 mb-2 hover:underline">&larr; Back to Home</button>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div className="flex gap-4 mt-4 border-b border-slate-800">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${activeTab === tab ? 'border-b-2 border-sky-500 text-white' : 'text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'Number Insights' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map(m => <KPICard key={m.id} metric={m} />)}
        </div>
      )}

      {activeTab === 'Graph' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderChart('acquisition', 'Acquisition Team – Day-wise Order Trend', '#38bdf8')}
          {renderChart('retention', 'Retention Team – Day-wise Order Trend', '#fbbf24')}
          {renderChart('kam', 'KAM Team – Day-wise Order Trend', '#f472b6')}
          {renderChart('all', 'All Teams – Day-wise Order Trend', '#34d399')}
        </div>
      )}

      {activeTab === 'Agent Wise Order Summary' && (
        <DataTable title="Team-wise Performance" headers={['Team', 'Target', 'Achieved', 'Efficiency']} data={mockTableData} />
      )}
    </div>
  );
}
