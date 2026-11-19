import { images, event } from '../config/site';
import { Flame } from './illustrations/Illustrations';

/** Uses the custom logo file when configured, otherwise the built-in wordmark. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  if (images.logoSrc) {
    return <img className="logo-img" src={images.logoSrc} alt={event.name} height={44} />;
  }
  return (
    <span className={`logo${inverted ? ' logo--inverted' : ''}`}>
      <span className="logo__mark">
        <Flame />
      </span>
      <span className="logo__text">
        Cozy <span>BBQ</span>
      </span>
    </span>
  );
}
