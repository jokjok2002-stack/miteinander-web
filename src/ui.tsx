import type { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Euro, MapPin, UserRound, Users, Car } from 'lucide-react';
import { PEOPLE, type Ev } from './data';
import { useApp } from './lib/app';

export const LINE = '#e2dbd1';
export const MUTE = '#514c45';

type Kind = 'solid' | 'outline' | 'green' | 'text';
const kindCls: Record<Kind, string> = {
  solid: 'bg-[var(--acc)] border-[var(--acc)] text-white',
  green: 'bg-[var(--grn)] border-[var(--grn)] text-white',
  outline: 'bg-white border-[var(--acc)] text-[var(--acc)]',
  text: 'bg-transparent border-transparent text-[#514c45] underline font-normal',
};
const base = 'inline-flex items-center justify-center gap-2 rounded-2xl border-2 font-bold text-center min-h-[52px] px-5 ';

export function Btn({ children, onClick, kind = 'solid', full, to, type = 'button', className = '' }: {
  children: ReactNode; onClick?: () => void; kind?: Kind; full?: boolean; to?: string; type?: 'button' | 'submit'; className?: string;
}) {
  const cls = base + kindCls[kind] + (full ? ' w-full ' : ' ') + className;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

export function Avatar({ name, size = 48, color }: { name: string; size?: number; color?: string }) {
  const col = color || PEOPLE[name]?.col || 'var(--acc)';
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full font-bold text-white" aria-hidden="true"
      style={{ width: size, height: size, background: col, fontSize: size * 0.36 }}>{(name || '?')[0]}</div>
  );
}

export function IconCircle({ children, size = 44 }: { children: ReactNode; size?: number }) {
  return <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size, background: 'var(--blush)', color: 'var(--acc)' }}>{children}</span>;
}

export function Switch({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onClick}
      className="mt-2.5 flex min-h-[60px] w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left" style={{ borderColor: LINE }}>
      <span>{label}</span>
      <span className="relative h-8 w-14 shrink-0 rounded-full" style={{ background: on ? 'var(--grn)' : LINE }}>
        <span className="absolute top-1 h-6 w-6 rounded-full bg-white transition-all" style={{ left: on ? 28 : 4 }} />
      </span>
    </button>
  );
}

export function Field({ label, value, onChange, type = 'text', error, multiline, hint, autoComplete }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; error?: string; multiline?: boolean; hint?: string; autoComplete?: string;
}) {
  const cls = 'mt-1.5 block w-full rounded-[14px] border-2 bg-white p-3.5 font-normal text-[#241f1b]';
  return (
    <label className="mt-4 block font-bold">
      {label}
      {hint && <span className="block text-[15px] font-normal" style={{ color: MUTE }}>{hint}</span>}
      {multiline
        ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={{ borderColor: LINE }} />
        : <input type={type} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} className={cls + ' min-h-[54px]'} style={{ borderColor: error ? '#b3261e' : LINE }} />}
      {error && <span className="mt-1 block text-[15px] font-normal text-[#b3261e]" role="alert">{error}</span>}
    </label>
  );
}

export function SaveBtn({ sv, jn, onClick }: { sv: boolean; jn: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={sv}
      aria-label={jn ? 'Angemeldet, im Kalender' : sv ? 'Vormerkung entfernen' : 'Vormerken'}
      className="absolute right-3 top-3 z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2"
      style={{ borderColor: 'var(--acc)', background: sv ? 'var(--acc)' : '#fff', color: sv ? '#fff' : 'var(--acc)', boxShadow: '0 0 0 5px rgba(255,255,255,.65), 0 3px 12px rgba(36,31,27,.35)' }}>
      <Bookmark size={24} fill={sv ? 'currentColor' : 'none'} />
    </button>
  );
}

export function Status({ jn, sv }: { jn: boolean; sv: boolean }) {
  if (jn) return <div className="my-1 inline-block rounded-full bg-[var(--grn)] px-3 py-0.5 text-[15px] font-bold text-white">✓ Angemeldet</div>;
  if (sv) return <div className="my-1 inline-block rounded-full bg-[#f3ece1] px-3 py-0.5 text-[15px] font-bold" style={{ color: MUTE }}>Vorgemerkt, noch nicht angemeldet</div>;
  return null;
}

export function Meta({ e, jn }: { e: Ev; jn: boolean }) {
  return (
    <>
      <div className="my-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[16px]" style={{ color: MUTE }}>
        <span className="inline-flex items-center gap-1"><MapPin size={18} />{e.o}</span>
        <span className="inline-flex items-center gap-1"><Euro size={18} />{e.p}</span>
        {e.solo && <span className="inline-flex items-center gap-1"><UserRound size={18} />Auch allein gut machbar</span>}
      </div>
      <div className="my-1.5 flex flex-wrap gap-x-4 text-[16px]" style={{ color: MUTE }}>
        <span className="inline-flex items-center gap-1"><Users size={18} />{e.n.length + (jn ? 1 : 0)} angemeldet (Beispiel)</span>
        {e.ride && <span className="inline-flex items-center gap-1"><Car size={18} />Fahrgemeinschaft</span>}
      </div>
    </>
  );
}

export function EventCard({ e }: { e: Ev }) {
  const { data, toggleSave, toggleJoin, toast, user } = useApp();
  const sv = data.saved.includes(e.id), jn = data.joined.includes(e.id);
  const onSave = () => {
    if (jn) { toast('Sie sind angemeldet, darum steht der Termin im Kalender'); return; }
    toggleSave(e.id); toast(sv ? 'Nicht mehr vorgemerkt' : 'Vorgemerkt. Sie sind noch nicht angemeldet.');
  };
  const onJoin = () => {
    toggleJoin(e.id);
    toast(jn ? 'Abgemeldet. Der Termin bleibt vorgemerkt.' : user ? 'Angemeldet. Der Termin steht im Kalender.' : 'Angemeldet. Der Termin steht in Ihrem Kalender auf diesem Gerät.');
  };
  return (
    <article className="relative flex flex-col overflow-hidden rounded-[18px] border bg-white p-4" style={{ borderColor: LINE }}>
      {e.img && <div className="-mx-4 -mt-4 mb-3 h-[170px] bg-[#f3ece1] bg-cover bg-center" style={{ backgroundImage: `url(${e.img})` }} role="img" aria-label={e.t} />}
      <SaveBtn sv={sv} jn={jn} onClick={onSave} />
      <div className="font-bold" style={{ color: 'var(--acc)', marginRight: e.img ? 0 : 60 }}>{e.d}</div>
      <h3 className="mr-12 text-[21px] leading-tight"><Link to={`/angebot/${e.id}`} className="hover:underline">{e.t}</Link></h3>
      {e.note && <p className="mb-1 mt-1 text-[16px]" style={{ color: MUTE }}>{e.note}</p>}
      <Status jn={jn} sv={sv} />
      <Meta e={e} jn={jn} />
      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        <button type="button" onClick={onJoin} className={base + (jn ? kindCls.green : kindCls.solid)}>{jn ? '✓ Angemeldet' : 'Jetzt anmelden'}</button>
        <Link to={`/angebot/${e.id}`} className={base + kindCls.outline}>Mehr erfahren</Link>
      </div>
    </article>
  );
}

export function PageTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-5">
      <h1 className="text-[30px] leading-tight sm:text-[34px]">{children}</h1>
      {sub && <p className="mt-1 max-w-2xl" style={{ color: MUTE }}>{sub}</p>}
    </div>
  );
}

export type Ico = ElementType;
