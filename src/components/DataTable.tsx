interface DataTableProps {
  title: string;
  headers: string[];
  data: (string | number)[][];
}

export function DataTable({ title, headers, data }: DataTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              {headers.map(h => <th key={h} className="pb-3 px-2 whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="py-3 px-2 whitespace-nowrap">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
