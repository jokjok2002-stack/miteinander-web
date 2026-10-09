import { Link } from 'react-router-dom';
import { Bookmark, Car, LayoutGrid } from 'lucide-react';
import { EV } from '../data';
import { useApp } from '../lib/app';
import { EventCard, IconCircle, MUTE, LINE } from '../ui';

const STEPS: [string, string, typeof LayoutGrid][] = [
  ['1. Stöbern', 'Schauen Sie sich Angebote in Ihrer Nähe an. Filtern Sie nach Themen wie Kultur oder Tausch.', LayoutGrid],
  ['2. Anmelden und Kalender', 'Melden Sie sich an, dann steht der Termin im Kalender. Mit dem Lesezeichen merken Sie ihn erst einmal nur vor.', Bookmark],
  ['3. Mitfahren', 'Sehen Sie, wer noch kommt, und fahren Sie zusammen hin.', Car],
];

export function HomePage() {
  const { user } = useApp();
  return (
    <>
      <section className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-[32px] leading-tight sm:text-[40px]">{user ? `Hallo ${user.first}, das ist los in Leipzig` : 'Willkommen. Schön, dass Sie da sind.'}</h1>
          <p className="mt-3 max-w-xl text-[20px]" style={{ color: MUTE }}>
            Angebote in Leipzig: günstig, in der Nähe und auch allein gut machbar. Sie müssen niemanden kennen und können alles ohne Konto ansehen.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/kategorien" className="inline-flex min-h-[56px] items-center rounded-2xl border-2 border-[var(--acc)] bg-[var(--acc)] px-6 font-bold text-white">Nach Thema stöbern</Link>
            <Link to="/hilfe" className="inline-flex min-h-[56px] items-center rounded-2xl border-2 border-[var(--acc)] bg-white px-6 font-bold text-[var(--acc)]">So funktioniert es</Link>
          </div>
        </div>
        <div className="h-[220px] rounded-[22px] bg-cover bg-center md:h-[260px]" style={{ backgroundImage: `url(${EV[6].img})`, backgroundColor: '#f3ece1' }} role="img" aria-label="Menschen bei einem gemeinsamen Spaziergang" />
      </section>

      {!user && (
        <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5" style={{ background: 'var(--blush)' }}>
          <p className="max-w-3xl"><b>Mit Konto oder ohne:</b> Ohne Konto können Sie alles ansehen, vormerken und ausdrucken. Das merkt sich Ihr Gerät. Mit einem kostenlosen Konto bleibt Ihr Kalender auch auf dem Handy und auf anderen Computern erhalten.</p>
          <Link to="/anmelden" className="inline-flex min-h-[52px] items-center rounded-2xl border-2 border-[var(--acc)] bg-white px-5 font-bold text-[var(--acc)]">Konto anlegen oder anmelden</Link>
        </section>
      )}

      <h2 className="mb-4 mt-10 text-[26px]">Das ist los in Leipzig</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EV.filter((e) => e.feed).map((e) => <EventCard key={e.id} e={e} />)}
      </div>

      <h2 className="mb-4 mt-12 text-[26px]">In drei Schritten</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map(([t, d, Ic]) => (
          <div key={t} className="flex gap-4 rounded-2xl border bg-white p-5" style={{ borderColor: LINE }}>
            <IconCircle size={52}><Ic size={26} /></IconCircle>
            <div><h3 className="text-[19px]">{t}</h3><p className="mt-1 text-[16px]" style={{ color: MUTE }}>{d}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}
