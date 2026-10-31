import { MetricDetail } from './KPICard';
import { motion } from 'motion/react';

interface KPICardProps {
  metric: MetricDetail;
}

export function KPICard({ metric }: KPICardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border border-slate-200 hover:border-sky-500 p-6 rounded-xl w-full cursor-pointer transition-all duration-300"
    >
      <div className="mb-4">
        <h3 className="text-slate-600 font-medium text-sm">{metric.title}</h3>
      </div>
      <p className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</p>
      <p className="text-xs text-slate-400">{metric.logic}</p>
    </motion.div>
  );
}
