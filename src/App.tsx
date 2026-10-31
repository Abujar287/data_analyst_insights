/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { MetricDetail } from './components/KPICard';

const telesalesMetrics: MetricDetail[] = [
  { id: '1', title: 'Create Order', value: '100', logic: 'unique order_id Count', businessLogic: 'Total unique orders created', formula: 'COUNT(DISTINCT order_id)', sqlQuery: 'SELECT COUNT(DISTINCT order_id) FROM orders' },
  { id: '2', title: 'Delivered Order', value: '88', logic: 'unique order_id Count (status = delivered)', businessLogic: 'Total unique orders delivered', formula: 'COUNT(DISTINCT order_id) WHERE status = \'delivered\'', sqlQuery: 'SELECT COUNT(DISTINCT order_id) FROM orders WHERE status = \'delivered\'' },
  { id: '3', title: 'Cancelled Order', value: '12', logic: 'unique order_id Count (status = cancelled)', businessLogic: 'Total unique orders cancelled', formula: 'COUNT(DISTINCT order_id) WHERE status = \'cancelled\'', sqlQuery: 'SELECT COUNT(DISTINCT order_id) FROM orders WHERE status = \'cancelled\'' },
  { id: '4', title: 'Delivered Ratio', value: '88.00%', logic: 'delivered_count / (delivered_count+cancelled_count)', businessLogic: 'Ratio of delivered orders', formula: '88 / (88+12)', sqlQuery: 'SELECT (88 * 100.0 / 100)' },
  { id: '5', title: 'Cancelled Ratio', value: '12%', logic: 'cancelled_count / (delivered_count+cancelled_count)', businessLogic: 'Ratio of cancelled orders', formula: '12 / (88+12)', sqlQuery: 'SELECT (12 * 100.0 / 100)' },
];

const inboundMetrics: MetricDetail[] = [
  { id: '1', title: 'Inbound Orders', value: '950', logic: 'count of inbound_orders', businessLogic: 'Total inbound orders', formula: 'SUM(inbound)', sqlQuery: 'SELECT COUNT(*) FROM inbound' },
];

export default function App() {
  const [activeDashboardId, setActiveDashboardId] = useState<string | null>(null);

  if (!activeDashboardId) {
    return <Home onSelectDashboard={setActiveDashboardId} />;
  }

  return (
    <Dashboard 
      title={activeDashboardId === 'telesales' ? 'Telesales & KAM Team Insights' : 'Inbound & Facebook Team Insights'}
      metrics={activeDashboardId === 'telesales' ? telesalesMetrics : inboundMetrics}
      onBack={() => setActiveDashboardId(null)}
    />
  );
}
