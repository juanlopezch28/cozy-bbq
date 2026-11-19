import { fundraising } from '../config/site';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: fundraising.currency, maximumFractionDigits: 0 }).format(n);

/**
 * Shows the goal. A raised amount and progress bar appear ONLY when a real,
 * verified net amount and its update date are configured in site.ts.
 */
export function FundraisingProgress() {
  const { goal, raisedVerified, raisedUpdatedAt } = fundraising;
  const hasVerified = typeof raisedVerified === 'number' && raisedVerified >= 0 && !!raisedUpdatedAt;
  const pct = hasVerified ? Math.min(100, Math.round((raisedVerified! / goal) * 100)) : 0;
  const updated = hasVerified
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(raisedUpdatedAt!))
    : '';

  return (
    <div className="goal">
      <p className="goal__label">Our fundraising goal</p>
      <p className="goal__amount">{fmt(goal)}</p>
      <p className="goal__sub">net, after event costs</p>
      {hasVerified && (
        <div className="goal__progress">
          <div
            className="goal__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={raisedVerified!}
            aria-label="Verified amount raised"
          >
            <span style={{ width: `${pct}%` }} />
          </div>
          <p>
            <strong>{fmt(raisedVerified!)}</strong> raised so far ({pct}%) · Updated {updated}
          </p>
        </div>
      )}
    </div>
  );
}
