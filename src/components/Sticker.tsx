import type { ReactNode } from 'react';

/** Round, slowly spinning sticker badge with circular text. */
export function SpinSticker({ text, children, className = '' }: { text: string; children?: ReactNode; className?: string }) {
  const id = `sticker-${text.replace(/\W+/g, '-').toLowerCase()}`;
  const ring = `${text} • ${text} • `;
  return (
    <div className={`spin-sticker ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="spin-sticker__ring">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--black)" />
        <text className="spin-sticker__text">
          <textPath href={`#${id}`} startOffset="0" textLength="460">
            {ring}
          </textPath>
        </text>
      </svg>
      <div className="spin-sticker__center">{children}</div>
    </div>
  );
}

/** Small rotated label, like a sticker slapped on the layout. */
export function Tag({ children, tone = 'black', rotate = -4, className = '' }: { children: ReactNode; tone?: 'black' | 'orange' | 'white'; rotate?: number; className?: string }) {
  return (
    <span className={`tag tag--${tone} ${className}`} style={{ ['--rot' as string]: `${rotate}deg` }}>
      {children}
    </span>
  );
}
