import type { SpecPanel as SpecPanelData } from "@/content/site";

export function SpecPanel({ panel }: { panel: SpecPanelData }) {
  return (
    <div className="panel">
      <div className="panel-hdr">
        <span>{panel.headerLeft}</span>
        <span>{panel.headerRight}</span>
      </div>
      <div className="panel-rows">
        {panel.rows.map((row) => (
          <div key={row.key} className="row">
            <span className="row-k">{row.key}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
