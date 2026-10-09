import type { CSSProperties } from 'react';

export type ThemeId = 'bordeaux' | 'gruen' | 'terra';

export const THEMES: Record<ThemeId, { name: string; acc: string; blush: string; grn: string; lite: string }> = {
  bordeaux: { name: 'Bordeaux', acc: '#7a1f2e', blush: '#f8e9eb', grn: '#30533b', lite: '#e8c6cc' },
  gruen: { name: 'Olivgrün', acc: '#4f5e1a', blush: '#f0f1de', grn: '#4f5e1a', lite: '#d3d9b2' },
  terra: { name: 'Terrakotta', acc: '#9c3f1c', blush: '#fbe9e0', grn: '#30533b', lite: '#e3c9bf' },
};

// Die Standardfarbe der Website. Zum Ändern hier eine andere Variante eintragen.
export const DEFAULT_THEME: ThemeId = 'bordeaux';

// Direktlinks zum Ausprobieren: ?v=bordeaux, ?v=gruen, ?v=terra
export function themeFromUrl(): ThemeId | null {
  try {
    const q = new URLSearchParams(window.location.search).get('v');
    if (q === 'terra' || q === 'bordeaux' || q === 'gruen') return q;
  } catch { /* ignorieren */ }
  return null;
}

export function themeVars(id: ThemeId): CSSProperties {
  const t = THEMES[id];
  return { ['--acc' as string]: t.acc, ['--blush' as string]: t.blush, ['--grn' as string]: t.grn, ['--lite' as string]: t.lite } as CSSProperties;
}
