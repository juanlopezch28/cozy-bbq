/**
 * MENU CONTENT — products, prices and food information.
 *
 * Rules:
 *  - `id` values are stable analytics identifiers: do not rename them.
 *  - Prices are in euro cents and must match the final price in Weeztix.
 *  - Food info (drinks, ingredients, allergens) is only published when
 *    `confirmed: true`. Fill the lists first, then flip the flag.
 */

export type ComboId = 'burger_drink_combo' | 'hotdog_drink_combo';

export interface FoodInfo {
  confirmed: boolean;
  items: string[];
}

export interface Combo {
  id: ComboId;
  name: string;
  shortName: string;
  contents: string;
  priceCents: number;
  includesSpot: string;
  illustration: 'burger' | 'hotdog';
  /**
   * Optional VERIFIED Weeztix deep link that preselects this combo.
   * Leave empty to open the general shop (configured in site.ts).
   */
  shopUrl: string;
  ingredients: FoodInfo;
  allergens: FoodInfo;
}

export const combos: Combo[] = [
  {
    id: 'burger_drink_combo',
    name: 'The Burger Combo',
    shortName: 'Burger + Drink',
    contents: '1 burger + 1 drink',
    priceCents: 599,
    includesSpot: 'Includes a spot for one person at the BBQ',
    illustration: 'burger',
    shopUrl: '',
    ingredients: { confirmed: false, items: [] },
    allergens: { confirmed: false, items: [] },
  },
  {
    id: 'hotdog_drink_combo',
    name: 'The Hot Dog Combo',
    shortName: 'Hot Dog + Drink',
    contents: '1 hot dog + 1 drink',
    priceCents: 499,
    includesSpot: 'Includes a spot for one person at the BBQ',
    illustration: 'hotdog',
    shopUrl: '',
    ingredients: { confirmed: false, items: [] },
    allergens: { confirmed: false, items: [] },
  },
];

/** Drinks available with every combo. PENDING until confirmed. */
export const drinks: FoodInfo = { confirmed: false, items: [] };

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
