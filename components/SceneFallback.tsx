/* static stand-in for the 3D corridor: css gradient + svg grid.
   shown when webgl is unavailable or the device is too weak to run
   the scene well. never ship a broken canvas. */

const STROKE = "rgba(143, 217, 251, 0.16)";
const HORIZON_Y = 460;

/* increasing spacing below the horizon fakes floor perspective */
const HORIZONTALS = [6, 16, 30, 50, 78, 116, 168, 240, 336, 440];
const VERTICALS = Array.from({ length: 17 }, (_, i) => i - 8);

export default function SceneFallback() {
  return (
    <div
      className="canvas-layer"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(120% 60% at 50% 52%, rgba(143, 217, 251, 0.05), rgba(5, 8, 11, 0) 60%), var(--bg)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <line
          x1="0"
          y1={HORIZON_Y}
          x2="1440"
          y2={HORIZON_Y}
          stroke="rgba(189, 232, 255, 0.4)"
          strokeWidth="1"
        />
        {HORIZONTALS.map((off) => (
          <line
            key={off}
            x1="0"
            y1={HORIZON_Y + off}
            x2="1440"
            y2={HORIZON_Y + off}
            stroke={STROKE}
            strokeWidth="1"
          />
        ))}
        {VERTICALS.map((i) => (
          <line
            key={i}
            x1={720 + i * 16}
            y1={HORIZON_Y + 2}
            x2={720 + i * 260}
            y2="900"
            stroke={STROKE}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
