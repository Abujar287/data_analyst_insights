/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { MetricDetail } from './components/KPICard';

const telesalesMetrics: MetricDetail[] = [
  { id: '1', title: 'Create Order', value: '0', logic: 'COUNT(order_id)', businessLogic: 'Total orders created', formula: 'SUM(orders)', sqlQuery: 'SELECT COUNT(*) FROM orders' },
  { id: '2', title: 'Acquisition Create Order', value: '0', logic: 'COUNT(order_id) WHERE type=acquisition', businessLogic: 'Acquisition team orders', formula: 'SUM(acquisition_orders)', sqlQuery: 'SELECT COUNT(*) FROM orders WHERE type = \'acquisition\'' },
  { id: '3', title: 'Retention Create Order', value: '0', logic: 'COUNT(order_id) WHERE type=retention', businessLogic: 'Retention team orders', formula: 'SUM(retention_orders)', sqlQuery: 'SELECT COUNT(*) FROM orders WHERE type = \'retention\'' },
  { id: '4', title: 'KAM Create Order', value: '0', logic: 'COUNT(order_id) WHERE type=KAM', businessLogic: 'KAM team orders', formula: 'SUM(KAM_orders)', sqlQuery: 'SELECT COUNT(*) FROM orders WHERE type = \'KAM\'' },
  { id: '5', title: 'Order Rate', value: '0%', logic: 'Total Orders / Total Leads', businessLogic: 'Order conversion rate', formula: 'Orders / Leads', sqlQuery: 'SELECT (CAST(COUNT(*) AS FLOAT) / (SELECT COUNT(*) FROM leads)) * 100' },
  { id: '6', title: 'Delivered Value', value: '0', logic: 'SUM(value) WHERE status=delivered', businessLogic: 'Total value of delivered orders', formula: 'SUM(value_delivered)', sqlQuery: 'SELECT SUM(value) FROM orders WHERE status = \'delivered\'' },
  { id: '7', title: 'Net Profit', value: '0', logic: 'SUM(profit)', businessLogic: 'Total net profit', formula: 'SUM(profit)', sqlQuery: 'SELECT SUM(profit) FROM orders' },
  { id: '8', title: 'Project Create Order', value: '0', logic: 'COUNT(order_id) WHERE type=project', businessLogic: 'Project-based orders', formula: 'SUM(project_orders)', sqlQuery: 'SELECT COUNT(*) FROM orders WHERE type = \'project\'' },
  { id: '9', title: 'Project Net Profit', value: '0', logic: 'SUM(profit) WHERE type=project', businessLogic: 'Net profit from projects', formula: 'SUM(project_profit)', sqlQuery: 'SELECT SUM(profit) FROM orders WHERE type = \'project\'' },
  { id: '10', title: 'Bucket Size', value: '0', logic: 'AVG(value)', businessLogic: 'Average bucket size', formula: 'AVG(order_value)', sqlQuery: 'SELECT AVG(value) FROM orders' },
  { id: '11', title: 'Net Profit Ratio', value: '0%', logic: '(SUM(profit)/SUM(value))*100', businessLogic: 'Ratio of net profit', formula: '(Profit / Value) * 100', sqlQuery: 'SELECT (SUM(profit) / SUM(value)) * 100 FROM orders' },
  { id: '12', title: 'Average Order Value', value: '0', logic: 'AVG(value)', businessLogic: 'Average value of an order', formula: 'AVG(order_value)', sqlQuery: 'SELECT AVG(value) FROM orders' },
  { id: '13', title: 'Team-wise Delivered Value', value: '0', logic: 'SUM(value) GROUP BY team', businessLogic: 'Delivered value per team', formula: 'SUM(value_per_team)', sqlQuery: 'SELECT team, SUM(value) FROM orders WHERE status = \'delivered\' GROUP BY team' },
  { id: '14', title: 'Team-wise Net Profit', value: '0', logic: 'SUM(profit) GROUP BY team', businessLogic: 'Net profit per team', formula: 'SUM(profit_per_team)', sqlQuery: 'SELECT team, SUM(profit) FROM orders GROUP BY team' },
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
