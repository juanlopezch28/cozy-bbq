/**
 * Placeholder sticker illustrations drawn in the Cozy BBQ visual language
 * (thick black outline, brand oranges, cream). Replace any of them with the
 * team's own artwork by swapping the component for an <img>.
 */
import type { SVGProps } from 'react';

const INK = '#000';
const O1 = '#FE7743';
const O2 = '#ED8159';
const CREAM = '#FFF1E8';
const W = '#FFFFFF';
const SW = 5;

type P = SVGProps<SVGSVGElement> & { title?: string };

function Svg({ title, children, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const line = { stroke: INK, strokeWidth: SW, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

export function Burger(props: P) {
  return (
    <Svg viewBox="0 0 240 210" {...props}>
      {/* bottom bun */}
      <path d="M38 158h164c0 22-14 34-34 34H72c-20 0-34-12-34-34z" fill={O2} {...line} />
      {/* patty */}
      <rect x="30" y="122" width="180" height="36" rx="18" fill="#2A1209" {...line} />
      <path d="M58 134c8 4 16 4 24 0M110 138c8 4 16 4 24 0M160 133c8 4 14 4 20 0" stroke="#5A2A14" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* cheese */}
      <path d="M30 116h180l-14 18-14-10-16 22-16-20-18 14-16-16-16 18-18-16-16 12-14-10z" fill="#FFC23D" {...line} />
      {/* lettuce */}
      <path d="M24 112c12-12 20 6 32-4s20 8 32-2 20 8 32-2 20 8 32-2 20 8 32-2 18 6 26 4v12H24z" fill="#8BC34A" {...line} />
      {/* top bun */}
      <path d="M28 104C28 52 72 22 120 22s92 30 92 82z" fill={O1} {...line} />
      <path d="M56 70c8-16 22-28 40-34" stroke={W} strokeWidth="6" strokeLinecap="round" fill="none" opacity=".75" />
      {[
        [96, 50, -20],
        [128, 44, 15],
        [154, 62, 30],
        [110, 76, -10],
        [80, 82, 20],
        [140, 86, -25],
        [172, 86, 10],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="3.6" fill={CREAM} stroke={INK} strokeWidth="2.5" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </Svg>
  );
}

export function HotDog(props: P) {
  return (
    <Svg viewBox="0 0 280 170" {...props}>
      {/* back bun */}
      <path d="M40 70c0-14 12-22 26-22h148c14 0 26 8 26 22v6H40z" fill={O2} {...line} />
      {/* sausage */}
      <rect x="14" y="66" width="252" height="44" rx="22" fill="#B53A1B" {...line} />
      <path d="M40 80c20-6 40-6 60 0" stroke="#E8704A" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* mustard */}
      <path d="M48 88l16-12 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 12" fill="none" stroke="#FFC23D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* front bun */}
      <path d="M30 98h220c0 24-16 40-40 40H70c-24 0-40-16-40-40z" fill={O1} {...line} />
      <path d="M62 120c10 4 22 6 34 6" stroke={W} strokeWidth="6" strokeLinecap="round" fill="none" opacity=".7" />
    </Svg>
  );
}

export function Cup(props: P) {
  return (
    <Svg viewBox="0 0 120 190" {...props}>
      <path d="M70 34l18-30" {...line} fill="none" />
      <path d="M24 46h72l-10 132H34z" fill={W} {...line} />
      <path d="M28 90h64l-4 48H32z" fill={O1} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 106l6 8 14-16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="32" width="88" height="16" rx="8" fill={INK} />
    </Svg>
  );
}

export function Flame(props: P) {
  return (
    <Svg viewBox="0 0 100 130" {...props}>
      <path d="M50 6c6 22 36 36 36 72a36 36 0 0 1-72 0c0-18 10-28 18-36 2 12 8 18 14 20-6-20 0-40 4-56z" fill={O1} {...line} />
      <path d="M50 66c4 10 18 16 18 34a18 18 0 0 1-36 0c0-10 6-16 10-18 0 8 4 10 8 10-2-10-2-18 0-26z" fill="#FFC23D" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </Svg>
  );
}

export function Heart(props: P) {
  return (
    <Svg viewBox="0 0 120 110" {...props}>
      <path d="M60 100S8 70 8 36C8 18 22 6 38 6c10 0 18 6 22 14 4-8 12-14 22-14 16 0 30 12 30 30 0 34-52 64-52 64z" fill={O1} {...line} />
      <path d="M26 30c2-6 8-10 14-10" stroke={W} strokeWidth="6" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Tongs(props: P) {
  return (
    <Svg viewBox="0 0 200 80" {...props}>
      <path d="M8 40c30-8 80-30 150-34" fill="none" {...line} strokeWidth={7} />
      <path d="M8 40c30 8 80 30 150 34" fill="none" {...line} strokeWidth={7} />
      <rect x="140" y="26" width="54" height="28" rx="12" fill={INK} />
      <path d="M8 40l14-10M8 40l14 10" {...line} />
    </Svg>
  );
}

export function Sparkle(props: P) {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M30 4c3 14 12 23 26 26-14 3-23 12-26 26-3-14-12-23-26-26 14-3 23-12 26-26z" fill={INK} />
    </Svg>
  );
}

/** Come together — two cups clinking. */
export function ComeTogether(props: P) {
  return (
    <Svg viewBox="0 0 220 180" {...props}>
      <circle cx="110" cy="96" r="78" fill={CREAM} />
      <g transform="rotate(-16 80 110)">
        <path d="M50 60h56l-8 96H58z" fill={W} {...line} />
        <path d="M54 92h48l-3 36H57z" fill={O1} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <rect x="44" y="50" width="68" height="14" rx="7" fill={INK} />
        <path d="M90 50l12-26" {...line} />
      </g>
      <g transform="rotate(16 140 110)">
        <path d="M114 60h56l-8 96h-40z" fill={W} {...line} />
        <path d="M118 92h48l-3 36h-42z" fill={O2} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <rect x="108" y="50" width="68" height="14" rx="7" fill={INK} />
        <path d="M130 50l-10-26" {...line} />
      </g>
      <path d="M110 20v-12M88 28l-8-10M132 28l8-10" {...line} />
      <path d="M110 70s-12-8-12-16c0-5 4-8 7-8 3 0 5 2 5 4 0-2 2-4 5-4 3 0 7 3 7 8 0 8-12 16-12 16z" fill={O1} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    </Svg>
  );
}

/** Give back — donation jar with a heart. */
export function GiveBack(props: P) {
  return (
    <Svg viewBox="0 0 220 180" {...props}>
      <circle cx="110" cy="96" r="78" fill={CREAM} />
      <circle cx="122" cy="26" r="13" fill="#FFC23D" {...line} strokeWidth={4} />
      <text x="122" y="32" textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif" fill={INK}>€</text>
      <rect x="62" y="56" width="96" height="16" rx="6" fill={INK} />
      <rect x="96" y="52" width="28" height="6" rx="3" fill={W} />
      <path d="M68 72h84c6 0 10 6 10 12v64c0 10-8 18-18 18H76c-10 0-18-8-18-18V84c0-6 4-12 10-12z" fill={W} {...line} />
      <path d="M110 140s-26-14-26-32c0-9 7-15 14-15 6 0 10 4 12 8 2-4 6-8 12-8 7 0 14 6 14 15 0 18-26 32-26 32z" fill={O1} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M72 92v44" stroke={O2} strokeWidth="6" strokeLinecap="round" opacity=".6" />
    </Svg>
  );
}

/** Stay safe — a tree in the park, cared for. */
export function StaySafe(props: P) {
  return (
    <Svg viewBox="0 0 220 180" {...props}>
      <circle cx="110" cy="96" r="78" fill={CREAM} />
      <path d="M30 164h160" {...line} />
      <path d="M102 164v-46h16v46" fill="#7A3B1A" {...line} />
      <path d="M110 22c30 0 52 20 52 46 0 8-2 14-6 20 8 6 10 14 10 20 0 18-16 28-32 28H84c-16 0-32-10-32-28 0-6 2-14 10-20-4-6-6-12-6-20 0-26 22-46 54-46z" fill="#6BAF3D" {...line} />
      <path d="M110 108s-18-10-18-22c0-6 5-10 9-10s7 3 9 6c2-3 5-6 9-6s9 4 9 10c0 12-18 22-18 22z" fill={O1} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M150 164v-18M144 152l6-6 6 6" {...line} />
    </Svg>
  );
}

/** Map pin used in the location section. */
export function Pin(props: P) {
  return (
    <Svg viewBox="0 0 100 130" {...props}>
      <path d="M50 124S12 78 12 48a38 38 0 0 1 76 0c0 30-38 76-38 76z" fill={O1} {...line} />
      <circle cx="50" cy="48" r="15" fill={W} {...line} strokeWidth={4} />
    </Svg>
  );
}
