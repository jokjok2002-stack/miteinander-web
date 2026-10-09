import { Link } from 'react-router-dom';
import { Bookmark, CalendarDays, Check, Printer } from 'lucide-react';
import { EV, type Ev } from '../data';
import { useApp } from '../lib/app';
import { Btn, LINE, MUTE, PageTitle } from '../ui';

export function KalenderPage() {
  const { data, user, toggleJoin, toast } = useApp();
  const J = EV.filter((e) => data.joined.includes(e.id));
  const V = EV.filter((e) => data.saved.includes(e.id) && !data.joined.includes(e.id));
  const li = (e: Ev) => <li key={e.id} className="mb-3 text-[20px]"><b>{e.t}</b><br />{e.d}<br />{e.o} · {e.p}</li>;
  const row = (e: Ev, isJoined: boolean) => (
    <div key={e.id} className={'mt-3 rounded-2xl bg-white p-3 ' + (isJoined ? 'border-2 border-[var(--grn)]' : 'border')} style={isJoined ? undefined : { borderColor: LINE }}>
      <Link to={`/angebot/${e.id}`} className="flex min-h-[64px] items-center gap-3">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cover bg-center" style={{ background: e.img ? `url(${e.img}) center/cover` : 'var(--blush)', color: 'var(--acc)' }}>{!e.img && <CalendarDays size={24} />}</span>
        <div><b>{e.t}</b><div className="text-[16px]" style={{ color: MUTE }}>{e.d}<br />{e.o}</div></div>
      </Link>
      {isJoined
        ? <div className="ml-[76px] mt-1.5 text-[16px] font-bold text-[var(--grn)]">Angemeldet. Sie sind dabei.</div>
        : <div className="ml-[76px] mt-2"><Btn onClick={() => { toggleJoin(e.id); toast('Angemeldet. Der Termin steht im Kalender.'); }}>Jetzt anmelden</Btn></div>}
    </div>
  );
  return (
    <>
      <div className="no-print">
        <PageTitle>Mein Kalender</PageTitle>
        {!user && <p className="mb-4 max-w-3xl rounded-2xl p-4 text-[16px]" style={{ background: 'var(--blush)' }}>Ihr Kalender ist auf diesem Gerät gespeichert. <Link to="/anmelden" className="font-bold underline">Mit einem Konto</Link> sehen Sie ihn auch auf dem Handy oder an einem anderen Computer.</p>}
        {J.length + V.length === 0 ? (
          <div className="max-w-xl rounded-[18px] border bg-white p-5" style={{ borderColor: LINE }}>
            <p>Noch nichts im Kalender.</p>
            <p className="mb-3 text-[16px]" style={{ color: MUTE }}>Melden Sie sich zu einem Angebot an, dann steht es hier unter „Ich komme“. Mit dem Lesezeichen können Sie Angebote auch erst einmal vormerken.</p>
            <Btn to="/">Angebote ansehen</Btn>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="mb-1 flex items-center gap-2 text-[22px] text-[var(--grn)]"><Check size={24} /> Ich komme <span className="text-[16px] font-normal" style={{ color: MUTE }}>({J.length})</span></h2>
              {J.length ? J.map((e) => row(e, true)) : <p className="text-[16px]" style={{ color: MUTE }}>Hier stehen die Termine, zu denen Sie sich angemeldet haben.</p>}
            </section>
            <section>
              <h2 className="mb-1 flex items-center gap-2 text-[22px]"><Bookmark size={24} /> Vorgemerkt <span className="text-[16px] font-normal" style={{ color: MUTE }}>({V.length})</span></h2>
              <p className="text-[16px]" style={{ color: MUTE }}>Noch nicht angemeldet. Bitte melden Sie sich an, wenn Sie kommen möchten.</p>
              {V.length ? V.map((e) => row(e, false)) : <p className="mt-2 text-[16px]" style={{ color: MUTE }}>Nichts vorgemerkt.</p>}
            </section>
          </div>
        )}
        <div className="mt-8"><Btn kind="outline" onClick={() => window.print()}><Printer size={22} /> Meine Termine drucken</Btn></div>
      </div>

      {/* Nur beim Drucken sichtbar */}
      <div className="print-only text-[#222]">
        <h1 className="mb-3 text-[28px]">Meine Termine{user ? `, ${user.first}` : ''}</h1>
        <h2 className="my-2 text-[20px] font-bold">Ich komme (angemeldet)</h2>
        <ol className="list-decimal pl-6">{J.length ? J.map(li) : <li className="text-[20px]">Noch keine Anmeldung</li>}</ol>
        {V.length > 0 && <><h2 className="my-2 text-[20px] font-bold">Vorgemerkt (noch nicht angemeldet)</h2><ol className="list-decimal pl-6">{V.map(li)}</ol></>}
        <p className="mt-6 text-[12pt]">miteinander. · Leipzig</p>
      </div>
    </>
  );
}
