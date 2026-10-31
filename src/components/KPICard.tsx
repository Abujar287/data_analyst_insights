import { MetricDetail } from './KPICard';

// ... (existing code, need to update interface and component)
export interface MetricDetail {
  id: string;
  title: string;
  value: string;
  logic: string;
  businessLogic: string;
  formula: string;
  sqlQuery: string;
}

interface KPICardProps {
  metric: MetricDetail;
}

export function KPICard({ metric }: KPICardProps) {
  return (
    <div 
      className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full"
    >
      <div className="mb-4">
        <h3 className="text-slate-400 font-medium text-sm">{metric.title}</h3>
      </div>
      <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
      <p className="text-xs text-slate-500">Logic: {metric.logic}</p>
    </div>
  );
}
