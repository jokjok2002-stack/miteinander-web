import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, MessageSquare } from 'lucide-react';
import { PEOPLE } from '../data';
import { useApp } from '../lib/app';
import { Avatar, Btn, LINE, MUTE } from '../ui';

export function PersonPage() {
  const { name = '' } = useParams();
  const nav = useNavigate();
  const { toast, user } = useApp();
  const p = PEOPLE[name];
  if (!p) return <p>Diese Person gibt es nicht. <Link to="/" className="font-bold underline">Zurück</Link></p>;
  return (
    <div className="mx-auto max-w-xl">
      <button type="button" onClick={() => nav(-1)} className="mb-3 inline-flex min-h-[44px] items-center font-bold" style={{ color: 'var(--acc)' }}><ChevronLeft size={22} /> Zurück</button>
      <div className="text-center">
        <div className="flex justify-center"><Avatar name={name} size={96} /></div>
        <h1 className="mt-3 text-[30px]">{name}</h1>
        <div className="inline-flex items-center gap-1 text-[16px]" style={{ color: MUTE }}><MapPin size={18} />{p.v}</div>
      </div>
      <div className="mt-4 rounded-[18px] border bg-white p-4" style={{ borderColor: LINE }}>
        <b>Über mich</b><p className="mb-2 mt-1.5">{p.a}</p>
        {p.i.map((t) => <span key={t} className="mr-1 inline-block rounded-full px-3 py-0.5 text-[15px]" style={{ background: 'var(--blush)' }}>{t}</span>)}
      </div>
      <p className="mt-3 text-[15px]" style={{ color: MUTE }}>Dies ist eine Beispiel-Person. Es wird nichts gesendet.</p>
      {user
        ? <div className="mt-3"><Btn full onClick={() => toast('Nachricht an ' + name + ' (Beispiel, nichts wird gesendet)')}><MessageSquare size={22} /> Nachricht schreiben</Btn></div>
        : <p className="mt-3">Nachrichten schreiben geht mit Konto. <Link to="/anmelden" className="font-bold underline">Konto anlegen</Link></p>}
    </div>
  );
}
