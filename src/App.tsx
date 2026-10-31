/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';



export default function App() {
  const [activeDashboardId, setActiveDashboardId] = useState<string | null>(null);

  if (!activeDashboardId) {
    return <Home onSelectDashboard={setActiveDashboardId} />;
  }

  return (
    <Dashboard 
      title={activeDashboardId === 'telesales' ? 'Telesales & KAM Team Insights' : 'Inbound & Facebook Team Insights'}
      dashboardType={activeDashboardId === 'telesales' ? 'telesales' : 'inbound'}
      onBack={() => setActiveDashboardId(null)}
    />
  );
}
