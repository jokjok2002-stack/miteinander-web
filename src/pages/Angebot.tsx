import { Link, useNavigate, useParams } from 'react-router-dom';
import { Car, Check, ChevronLeft } from 'lucide-react';
import { EV, PEOPLE } from '../data';
import { useApp } from '../lib/app';
import { Avatar, Btn, LINE, Meta, MUTE, SaveBtn, Status } from '../ui';

export function AngebotPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, user, toggleSave, toggleJoin, setRide, toast } = useApp();
  const e = EV.find((x) => String(x.id) === id);
  if (!e) return <p>Dieses Angebot gibt es nicht. <Link to="/" className="font-bold underline">Zurück</Link></p>;
  const sv = data.saved.includes(e.id), jn = data.joined.includes(e.id), r = data.rides[e.id];
  const ppl = [...e.n, ...(jn && user ? [user.first] : [])];
  const onSave = () => {
    if (jn) { toast('Sie sind angemeldet, darum steht der Termin im Kalender'); return; }
    toggleSave(e.id); toast(sv ? 'Nicht mehr vorgemerkt' : 'Vorgemerkt. Sie sind noch nicht angemeldet.');
  };
  const onJoin = () => { toggleJoin(e.id); toast(jn ? 'Abgemeldet. Der Termin bleibt vorgemerkt.' : 'Angemeldet. Der Termin steht im Kalender.'); };
  const needAccount = !user && (e.ride);
  return (
    <>
      <button type="button" onClick={() => (window.history.length > 1 ? nav(-1) : nav('/'))} className="mb-3 inline-flex min-h-[44px] items-center font-bold" style={{ color: 'var(--acc)' }}>
        <ChevronLeft size={22} /> Zurück
      </button>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <article className="relative h-fit overflow-hidden rounded-[18px] border bg-white p-5" style={{ borderColor: LINE }}>
          {e.img && <div className="-mx-5 -mt-5 mb-4 h-[240px] bg-[#f3ece1] bg-cover bg-center sm:h-[300px]" style={{ backgroundImage: `url(${e.img})` }} role="img" aria-label={e.t} />}
          <SaveBtn sv={sv} jn={jn} onClick={onSave} />
          <div className="font-bold" style={{ color: 'var(--acc)' }}>{e.d}</div>
          <h1 className="mb-2 mr-14 text-[30px] leading-tight">{e.t}</h1>
          <Status jn={jn} sv={sv} />
          <Meta e={e} jn={jn} />
          {e.note && <p className="mt-2 font-bold">{e.note}</p>}
          <p className="mt-2 text-[19px]">{e.txt}</p>
          <div className="mt-4 max-w-sm"><Btn full kind={jn ? 'green' : 'solid'} onClick={onJoin}>{jn ? '✓ Sie sind angemeldet' : 'Jetzt anmelden'}</Btn></div>
          {!user && <p className="mt-3 text-[15px]" style={{ color: MUTE }}>Ohne Konto wird Ihre Anmeldung nur auf diesem Gerät gemerkt. <Link to="/anmelden" className="font-bold underline">Konto anlegen</Link>, damit Sie Ihre Termine überall sehen.</p>}
        </article>

        <div>
          <h2 className="mb-1 text-[22px]">Wer kommt noch? <span className="text-[15px] font-normal" style={{ color: MUTE }}>{ppl.length} angemeldet (Beispiel)</span></h2>
          {ppl.map((n) => {
            const isMe = user && n === user.first;
            const inner = (
              <>
                <Avatar name={n} color={isMe ? 'var(--acc)' : undefined} />
                <div><b>{n}{isMe ? ' (Sie)' : ''}</b><div className="text-[15px]" style={{ color: MUTE }}>{isMe ? (data.vis.viertel ? data.viertel : 'Viertel nicht sichtbar') : PEOPLE[n]?.v}</div></div>
              </>
            );
            return isMe
              ? <div key={n} className="mt-2.5 flex min-h-[64px] items-center gap-3 rounded-2xl border bg-white px-4 py-2.5" style={{ borderColor: LINE }}>{inner}</div>
              : <Link key={n} to={`/person/${n}`} className="mt-2.5 flex min-h-[64px] items-center gap-3 rounded-2xl border bg-white px-4 py-2.5" style={{ borderColor: LINE }}>{inner}</Link>;
          })}

          {e.ride && (
            <>
              <h2 className="mb-1 mt-7 flex items-center gap-2 text-[22px]"><Car size={22} /> Fahrgemeinschaft</h2>
              <div className="rounded-[18px] border bg-white p-4" style={{ borderColor: LINE }}>
                <Link to="/person/Renate" className="flex items-center gap-3">
                  <Avatar name="Renate" />
                  <div><b>Renate fährt</b><div className="text-[15px]" style={{ color: MUTE }}>2 Plätze frei · Abfahrt 10:15<br />Connewitz → {e.o.split(',')[0]}</div></div>
                </Link>
                {r === 'req' ? <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-[var(--grn)] p-3.5 text-white"><Check size={22} /> Anfrage an Renate gesendet (Beispiel).</div>
                  : r === 'off' ? <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-[var(--grn)] p-3.5 text-white"><Check size={22} /> Danke! Ihr Platz ist für andere sichtbar (Beispiel).</div>
                  : needAccount
                    ? <p className="mt-3 text-[16px]">Für Fahrgemeinschaften brauchen Sie ein Konto, damit andere wissen, wer mitfährt. <Link to="/anmelden" className="font-bold underline">Konto anlegen</Link></p>
                    : <div className="mt-3 flex flex-col gap-2">
                      <Btn full onClick={() => { setRide(e.id, 'req'); toast('Anfrage gesendet (Beispiel)'); }}>Ich möchte mitfahren</Btn>
                      <Btn full kind="outline" onClick={() => { setRide(e.id, 'off'); toast('Danke, Ihr Platz ist eingetragen (Beispiel)'); }}>Ich biete einen Platz an</Btn>
                    </div>}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
