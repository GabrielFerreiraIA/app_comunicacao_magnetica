// Crista heráldica da marca (inline SVG, herda currentColor).

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 2c4 6 11 8 18 8 0 16-6 30-18 36C12 40 6 26 6 10c7 0 14-2 18-8Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity=".08"
      />
      <path
        d="M24 12v22M16 20c4 1 4 1 8 0M16 27c4 1 4 1 8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="9" r="2.2" fill="currentColor" />
    </svg>
  );
}
