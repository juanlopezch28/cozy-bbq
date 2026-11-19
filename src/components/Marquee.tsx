import { Fragment } from 'react';
import { Flame, Heart } from './illustrations/Illustrations';

/** Decorative scrolling strip (paused for reduced motion). */
export function Marquee({ words, tone = 'black' }: { words: string[]; tone?: 'black' | 'orange' }) {
  const row = (
    <div className="marquee__row">
      {Array.from({ length: 3 }).map((_, r) => (
        <Fragment key={r}>
          {words.map((w, i) => (
            <Fragment key={`${r}-${i}`}>
              <span className="marquee__word">{w}</span>
              {i % 2 === 0 ? <Flame className="marquee__icon" /> : <Heart className="marquee__icon" />}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={`marquee marquee--${tone}`} aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
