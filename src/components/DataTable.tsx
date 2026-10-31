interface DataRow {
  name: string;
  value1: string;
  value2: string;
  ratio: string;
}

interface DataTableProps {
  title: string;
  headers: string[];
  data: DataRow[];
}

export function DataTable({ title, headers, data }: DataTableProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-400 border-b border-slate-800">
            <tr>
              {headers.map(h => <th key={h} className="pb-3 px-2">{h}</th>)}
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-800 last:border-0">
                <td className="py-3 px-2 font-medium">{row.name}</td>
                <td className="py-3 px-2">{row.value1}</td>
                <td className="py-3 px-2">{row.value2}</td>
                <td className="py-3 px-2">{row.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
