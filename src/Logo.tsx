// Zwei Menschen Arm in Arm als M. Farben kommen aus dem gewählten Farbthema.
export function Logo({ height = 34 }: { height?: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: height * 0.14 }} role="img" aria-label="miteinander.">
      <svg width={height} height={height} viewBox="0 0 389 389" aria-hidden="true">
        <g transform="translate(193.5 194) scale(.9744) translate(-199.5 -200.2)">
          <circle style={{ fill: 'var(--acc)' }} cx="199.5" cy="200.2" r="195.7" />
          <polygon fill="#ffffff" points="68.5,170.5 126.5,170.5 196.5,249.5 196.5,307.5 185.5,307.5 112.5,231.5 112.5,316.5 68.5,316.5" />
          <circle fill="#ffffff" cx="90.5" cy="118.5" r="34.5" />
          <polygon style={{ fill: 'var(--lite)' }} points="330.5,170.5 272.5,170.5 202.5,249.5 202.5,307.5 213.5,307.5 286.5,231.5 286.5,316.5 330.5,316.5" />
          <circle style={{ fill: 'var(--lite)' }} cx="308.5" cy="118.5" r="34.5" />
        </g>
      </svg>
      <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 700, fontSize: height * 0.82, lineHeight: 1, letterSpacing: '-0.02em', color: '#241f1b' }}>
        miteinander.
      </span>
    </span>
  );
}
