import { useState } from 'react';
import { KPICard } from './KPICard';
import { DataTable } from './DataTable';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { metricCategories } from '../data/metrics';
import { motion } from 'motion/react';

interface DashboardProps {
  title: string;
  onBack: () => void;
}

const mockTableData = [
  { name: 'Team Alpha', value1: '500', value2: '480', ratio: '96%' },
  { name: 'Team Beta', value1: '740', value2: '700', ratio: '94.5%' },
];

const mockGraphData = Array.from({ length: 31 }, (_, i) => ({
  day: `${i + 1}`,
  acquisition: Math.floor(Math.random() * 20) + 5,
  retention: Math.floor(Math.random() * 15) + 3,
  kam: Math.floor(Math.random() * 10) + 1,
  all: Math.floor(Math.random() * 40) + 10,
}));

export function Dashboard({ title, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Number Insights');

  const tabs = ['Number Insights', 'Graph', 'Agent Wise Order Summary', 'Raw Details'];

  const renderChart = (dataKey: string, title: string, color: string) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-4 rounded-lg border border-slate-200 hover:border-sky-500 w-full cursor-pointer transition-all duration-300"
    >
      <h3 className="text-sm font-semibold mb-2 text-slate-900">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockGraphData}>
          <XAxis dataKey="day" stroke="#64748b" fontSize={10} interval={0} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} 
            wrapperStyle={{color: '#000'}} 
            labelFormatter={(label) => `Day: ${label}`}
            formatter={(value: number) => [value, 'Orders']}
          />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{r: 3}} activeDot={{r: 6}} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <header className="mb-8">
        <button onClick={onBack} className="text-sky-600 mb-2 hover:underline">&larr; Back to Home</button>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <div className="flex gap-4 mt-4 border-b border-slate-200">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${activeTab === tab ? 'border-b-2 border-sky-600 text-slate-900' : 'text-slate-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'Number Insights' && (
        <div className="space-y-8">
          {metricCategories.map((cat, catIdx) => (
            <motion.div key={cat.category} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: catIdx * 0.1}}>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{cat.category}</h2>
              <div className="grid grid-cols-6 gap-4">
                {cat.metrics.map(m => <KPICard key={m.id} metric={m} />)}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'Graph' && (
        <div className="space-y-6">
          {renderChart('all', 'All Teams – Day-wise Order Trend', '#34d399')}
          {renderChart('acquisition', 'Acquisition Team – Day-wise Order Trend', '#38bdf8')}
          {renderChart('retention', 'Retention Team – Day-wise Order Trend', '#fbbf24')}
          {renderChart('kam', 'KAM Team – Day-wise Order Trend', '#f472b6')}
        </div>
      )}

      {activeTab === 'Agent Wise Order Summary' && (
        <DataTable title="Team-wise Performance" headers={['Team', 'Target', 'Achieved', 'Efficiency']} data={mockTableData} />
      )}
    </div>
  );
}
