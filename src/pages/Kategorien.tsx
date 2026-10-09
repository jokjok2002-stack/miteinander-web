import { useState } from 'react';
import { Check, HandHeart, Music, Shirt, Users } from 'lucide-react';
import { CATS, EV, type CatId } from '../data';
import { EventCard, MUTE, PageTitle } from '../ui';

const ICON: Record<CatId, typeof Users> = { aktiv: Users, kultur: Music, tausch: Shirt, anspruch: HandHeart };

export function KategorienPage() {
  const [cat, setCat] = useState<CatId>('aktiv');
  const list = EV.filter((e) => e.c === cat);
  const cur = CATS.find((c) => c.id === cat)!;
  return (
    <>
      <PageTitle sub="Wählen Sie ein Thema. Darunter sehen Sie die passenden Angebote.">Kategorien</PageTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATS.map((c) => {
          const Ic = ICON[c.id]; const sel = c.id === cat;
          return (
            <button key={c.id} type="button" aria-pressed={sel} onClick={() => setCat(c.id)}
              className="flex min-h-[140px] flex-col items-start gap-2.5 rounded-[22px] border-[3px] p-4 text-left leading-tight"
              style={{ background: c.bg, color: c.fg, borderColor: sel ? c.fg : 'transparent' }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white"><Ic size={24} /></span>
              <b className="font-head text-[18px] font-semibold">{c.name}</b>
              {sel && <span className="mt-auto flex items-center gap-1 text-[15px] font-bold"><Check size={18} /> Ausgewählt</span>}
            </button>
          );
        })}
      </div>
      <h2 className="mt-8 text-[24px]">{cur.name}</h2>
      <p style={{ color: MUTE }}>{list.length} Angebote</p>
      {cat === 'anspruch' && (
        <div className="mt-4 max-w-3xl rounded-2xl p-4" style={{ background: 'var(--blush)' }}>
          <b style={{ color: 'var(--acc)' }}>Präventionskurse nach § 20 SGB V</b>
          <p className="mt-1 text-[16px]">Ihre Krankenkasse erstattet meist 75–100 % der Kursgebühr. Einfach nach dem Kurs die Teilnahmebescheinigung einreichen.</p>
        </div>
      )}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((e) => <EventCard key={e.id} e={e} />)}</div>
    </>
  );
}
