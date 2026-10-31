interface DashboardInfo {
  id: string;
  name: string;
}

const dashboards: DashboardInfo[] = [
  { id: 'telesales', name: 'Telesales & KAM Team Insights & Performance Dashboard' },
  { id: 'inbound', name: 'Inbound & Facebook Team Insights & Performance Dashboard' },
];

interface HomeProps {
  onSelectDashboard: (id: string) => void;
}

export function Home({ onSelectDashboard }: HomeProps) {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <h1 className="text-3xl font-bold text-white mb-10">Select Dashboard</h1>
      <div className="grid gap-6">
        {dashboards.map(d => (
          <button 
            key={d.id}
            onClick={() => onSelectDashboard(d.id)}
            className="bg-slate-900 p-8 rounded-xl text-left border border-slate-800 hover:border-sky-500 transition-all text-xl text-white font-medium"
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}
