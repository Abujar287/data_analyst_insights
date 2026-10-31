import { useState } from 'react';
import { KPICard, MetricDetail } from './KPICard';
import { DataTable } from './DataTable';

interface DashboardProps {
  title: string;
  metrics: MetricDetail[];
  onBack: () => void;
}

const mockTableData = [
  { name: 'Team Alpha', value1: '500', value2: '480', ratio: '96%' },
  { name: 'Team Beta', value1: '740', value2: '700', ratio: '94.5%' },
];

export function Dashboard({ title, metrics, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Number Insights');

  const tabs = ['Number Insights', 'Graph', 'Agent Wise Order Summary', 'Raw Details'];

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

      {activeTab === 'Agent Wise Order Summary' && (
        <DataTable title="Team-wise Performance" headers={['Team', 'Target', 'Achieved', 'Efficiency']} data={mockTableData} />
      )}
    </div>
  );
}
