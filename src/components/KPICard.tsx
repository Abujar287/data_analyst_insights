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
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl w-full cursor-pointer"
    >
      <div className="mb-4">
        <h3 className="text-slate-600 dark:text-slate-400 font-medium text-sm">{metric.title}</h3>
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{metric.value}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">{metric.logic}</p>
    </motion.div>
  );
}
