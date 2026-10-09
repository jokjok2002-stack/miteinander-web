import { useEffect } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { CalendarDays, HelpCircle, Home, LayoutGrid, User } from 'lucide-react';
import { Logo } from './Logo';
import { THEMES, themeVars, type ThemeId } from './theme';
import { useApp, DEMO } from './lib/app';
import { LINE, MUTE } from './ui';
import { HomePage } from './pages/Home';
import { KategorienPage } from './pages/Kategorien';
import { AngebotPage } from './pages/Angebot';
import { KalenderPage } from './pages/Kalender';
import { ProfilPage } from './pages/Profil';
import { AnmeldenPage } from './pages/Anmelden';
import { HilfePage } from './pages/Hilfe';
import { PersonPage } from './pages/Person';
import { RechtPage } from './pages/Recht';

const NAV: [string, string, typeof Home][] = [
  ['/', 'Entdecken', Home],
  ['/kategorien', 'Kategorien', LayoutGrid],
  ['/kalender', 'Kalender', CalendarDays],
  ['/profil', 'Profil', User],
];

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

export function App() {
  const { theme, setTheme, themeFixed, toastMsg, user, data } = useApp();
  const open = data.saved.filter((id) => !data.joined.includes(id)).length;
  const link = ({ isActive }: { isActive: boolean }) =>
    'relative inline-flex min-h-[48px] items-center gap-2 rounded-xl px-3 font-bold ' + (isActive ? 'bg-[var(--blush)] text-[var(--acc)]' : 'text-[#514c45] hover:bg-[#f3ece1]');

  return (
    <div className="flex min-h-screen flex-col" style={themeVars(theme)}>
      <ScrollTop />
      <header className="no-print border-b bg-white" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <Link to="/" aria-label="miteinander., zur Startseite"><Logo height={36} /></Link>
          <nav aria-label="Hauptmenü" className="hidden items-center gap-1 md:flex">
            {NAV.map(([to, label, Ic]) => (
              <NavLink key={to} to={to} end={to === '/'} className={link}>
                <Ic size={22} />{label}
                {to === '/kalender' && open > 0 && <span className="rounded-full bg-[var(--acc)] px-1.5 text-[13px] text-white">{open}</span>}
              </NavLink>
            ))}
            <NavLink to="/hilfe" className={link}><HelpCircle size={22} />Hilfe</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            {user
              ? <Link to="/profil" className="inline-flex min-h-[44px] items-center rounded-2xl border-2 px-4 font-bold" style={{ borderColor: 'var(--acc)', color: 'var(--acc)' }}>{user.first}</Link>
              : <Link to="/anmelden" className="inline-flex min-h-[44px] items-center rounded-2xl border-2 bg-[var(--acc)] px-4 font-bold text-white" style={{ borderColor: 'var(--acc)' }}>Anmelden</Link>}
          </div>
        </div>
      </header>

      <main id="inhalt" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 md:pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kategorien" element={<KategorienPage />} />
          <Route path="/angebot/:id" element={<AngebotPage />} />
          <Route path="/person/:name" element={<PersonPage />} />
          <Route path="/kalender" element={<KalenderPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/anmelden" element={<AnmeldenPage />} />
          <Route path="/hilfe" element={<HilfePage />} />
          <Route path="/datenschutz" element={<RechtPage which="datenschutz" />} />
          <Route path="/impressum" element={<RechtPage which="impressum" />} />
          <Route path="*" element={<div className="py-16 text-center"><h1 className="text-[28px]">Diese Seite gibt es nicht.</h1><p className="mt-2"><Link to="/" className="font-bold underline">Zurück zu den Angeboten</Link></p></div>} />
        </Routes>
      </main>

      <footer className="no-print border-t bg-white" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 pb-24 text-[15px] md:pb-5" style={{ color: MUTE }}>
          <div>
            <b>miteinander.</b> Eine Bachelorarbeit im Fach Mediendesign. Alle Angebote, Namen und Plätze sind Beispieldaten.
            {DEMO && ' Demo-Modus: Konten gelten nur auf diesem Gerät.'}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {!themeFixed && (
              <span className="inline-flex items-center gap-2">Farbe:
                {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                  <button key={id} type="button" aria-pressed={theme === id} aria-label={THEMES[id].name} onClick={() => setTheme(id)}
                    className="h-7 w-7 rounded-full border-2" style={{ background: THEMES[id].acc, borderColor: theme === id ? '#241f1b' : '#fff', boxShadow: '0 0 0 1px ' + LINE }} />
                ))}
              </span>
            )}
            <Link to="/datenschutz" className="underline">Datenschutz</Link>
            <Link to="/impressum" className="underline">Impressum</Link>
          </div>
        </div>
      </footer>

      {/* Menü unten auf dem Handy */}
      <nav aria-label="Hauptmenü" className="no-print fixed inset-x-0 bottom-0 z-30 flex border-t bg-white md:hidden" style={{ borderColor: LINE }}>
        {NAV.map(([to, label, Ic]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'relative flex min-h-[64px] flex-1 flex-col items-center justify-center gap-0.5 text-[14px] ' + (isActive ? 'font-bold text-[var(--acc)]' : 'text-[#514c45]')}>
            <Ic size={24} />{label}
            {to === '/kalender' && open > 0 && <span className="absolute left-[56%] top-1.5 min-w-[20px] rounded-full bg-[var(--acc)] px-1.5 text-center text-[12px] font-bold text-white">{open}</span>}
          </NavLink>
        ))}
      </nav>

      {toastMsg && <div role="status" className="no-print fixed inset-x-4 bottom-24 z-40 mx-auto max-w-md rounded-2xl bg-[#241f1b] px-4 py-3.5 text-center font-bold text-white shadow-lg md:bottom-8">{toastMsg}</div>}
    </div>
  );
}
