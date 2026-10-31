import { useState } from 'react';
import { KPICard } from './KPICard';
import { DataTable } from './DataTable';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { metricCategories } from '../data/metrics';
import { motion } from 'motion/react';

interface DashboardProps {
  title: string;
  dashboardType: 'telesales' | 'inbound';
  onBack: () => void;
}



const mockGraphData = Array.from({ length: 31 }, (_, i) => ({
  day: `${i + 1}`,
  acquisition: Math.floor(Math.random() * 20) + 5,
  retention: Math.floor(Math.random() * 15) + 3,
  kam: Math.floor(Math.random() * 10) + 1,
  all: Math.floor(Math.random() * 40) + 10,
}));

export function Dashboard({ title, dashboardType, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Number Insights');

  const tabs = ['Number Insights', 'Graph', 'Summary', 'Agent Wise Order Summary', 'Raw Details'];

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
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={{r: 3}} 
            activeDot={{r: 6}} 
            label={{ position: 'top', fontSize: 10, fill: color }} 
          />
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

      {activeTab === 'Number Insights' && dashboardType === 'telesales' && (
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
      {activeTab === 'Number Insights' && dashboardType === 'inbound' && (
        <div className="text-slate-500">No data available.</div>
      )}

      {activeTab === 'Graph' && dashboardType === 'telesales' && (
        <div className="space-y-6">
          {renderChart('all', 'All Teams – Day-wise Order Trend', '#34d399')}
          {renderChart('acquisition', 'Acquisition Team – Day-wise Order Trend', '#38bdf8')}
          {renderChart('retention', 'Retention Team – Day-wise Order Trend', '#fbbf24')}
          {renderChart('kam', 'KAM Team – Day-wise Order Trend', '#f472b6')}
        </div>
      )}
      {activeTab === 'Graph' && dashboardType === 'inbound' && (
        <div className="text-slate-500">No data available.</div>
      )}

      {activeTab === 'Summary' && dashboardType === 'telesales' && (
        <div className="space-y-6">
          <DataTable 
            title="Week wise Order Summary" 
            headers={['Month', 'W1 (1-7)', 'W2 (8-14)', 'W3 (15-21)', 'W4 (22-End)', 'Total', 'Avg/Day W1', 'Avg/Day W2', 'Avg/Day W3', 'Avg/Day W4', 'Best Week']} 
            data={[['Oct', 100, 120, 110, 130, 460, 14, 17, 15, 18, 'W4']]} 
          />
          <DataTable 
            title="Category Wise" 
            headers={['Date', 'Category', 'OJT', 'Acquisition', 'Retention', 'KAM', 'Total_Order_Count', 'Ratio']} 
            data={[['31-Oct', 'General', 10, 5, 2, 1, 18, '80%']]} 
          />
          <DataTable 
            title="Team Wise" 
            headers={['Team', 'Create Order', 'Contribution Ratio', 'Agent Count', 'Order per Agent']} 
            data={[['Acquisition', 150, '40%', 10, 15], ['Retention', 100, '30%', 8, 12.5]]} 
          />
        </div>
      )}
      {activeTab === 'Summary' && dashboardType === 'inbound' && (
        <div className="text-slate-500">No data available.</div>
      )}

      {activeTab === 'Agent Wise Order Summary' && (
        <DataTable title="Team-wise Performance" headers={['Team', 'Target', 'Achieved', 'Efficiency']} data={[['Alpha', 500, 480, '96%'], ['Beta', 740, 700, '94.5%']]} />
      )}
    </div>
  );
}
