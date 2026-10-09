import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Pencil, Users } from 'lucide-react';
import { INTERESTS } from '../data';
import { useApp } from '../lib/app';
import { Avatar, Btn, Field, LINE, MUTE, PageTitle, Switch } from '../ui';

const toggle = (a: string[], x: string) => (a.includes(x) ? a.filter((y) => y !== x) : [...a, x]);

export function ProfilPage() {
  const { user, data, setData, signOut, toast } = useApp();
  const [edit, setEdit] = useState(false);
  if (!user) return (
    <div className="mx-auto max-w-xl">
      <PageTitle sub="Ein Profil gibt es nur mit Konto. Ohne Konto können Sie trotzdem alles ansehen, vormerken und drucken.">Mein Profil</PageTitle>
      <div className="rounded-[18px] border bg-white p-5" style={{ borderColor: LINE }}>
        <p>Legen Sie ein kostenloses Konto an, wenn Sie</p>
        <ul className="mb-4 mt-2 list-disc pl-6"><li>Ihre Termine auf mehreren Geräten sehen möchten</li><li>bei Fahrgemeinschaften mitmachen möchten</li><li>sich anderen mit einem kleinen Profil zeigen möchten</li></ul>
        <Btn to="/anmelden" full>Konto anlegen oder anmelden</Btn>
      </div>
      <p className="mt-4 text-[16px]" style={{ color: MUTE }}>Auf diesem Gerät gemerkt: {data.saved.length} vorgemerkt, {data.joined.length} Anmeldungen.</p>
    </div>
  );
  const v = data.vis;
  if (edit) return (
    <div className="mx-auto max-w-xl">
      <PageTitle>Profil bearbeiten</PageTitle>
      <div className="flex justify-center"><Avatar name={user.first} size={96} color="var(--acc)" /></div>
      <Field label="Viertel" value={data.viertel} onChange={(x) => setData({ viertel: x })} />
      <Field label="Über mich" multiline value={data.about} onChange={(x) => setData({ about: x })} />
      <h2 className="mt-5 text-[20px]">Meine Interessen</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {INTERESTS.map((t) => {
          const on = data.ints.includes(t);
          return <button key={t} type="button" aria-pressed={on} onClick={() => setData({ ints: toggle(data.ints, t) })} className="min-h-[48px] rounded-full border-2 px-4"
            style={{ background: on ? 'var(--grn)' : '#fff', borderColor: on ? 'var(--grn)' : LINE, color: on ? '#fff' : undefined, fontWeight: on ? 700 : 400 }}>{t}</button>;
        })}
      </div>
      <div className="mt-5"><Btn kind="green" full onClick={() => { setEdit(false); toast('Profil gespeichert'); }}>Speichern</Btn></div>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <div>
        <div className="text-center">
          <div className="flex justify-center"><Avatar name={user.first} size={96} color="var(--acc)" /></div>
          <h1 className="mt-2 text-[30px]">{user.first} {user.last}</h1>
          <div className="inline-flex items-center gap-1 text-[16px]" style={{ color: MUTE }}><MapPin size={18} />{data.viertel}</div>
          <div className="text-[15px]" style={{ color: MUTE }}>{user.email}</div>
        </div>
        <div className="mt-4 rounded-[18px] border bg-white p-4" style={{ borderColor: LINE }}>
          <b>Über mich</b><p className="mb-2 mt-1.5">{data.about}</p>
          {data.ints.map((t) => <span key={t} className="mr-1 inline-block rounded-full px-3 py-0.5 text-[15px]" style={{ background: 'var(--blush)' }}>{t}</span>)}
        </div>
        <div className="mt-3"><Btn kind="outline" full onClick={() => setEdit(true)}><Pencil size={20} /> Profil bearbeiten</Btn></div>
      </div>
      <div>
        <h2 className="text-[21px]">Das sehen andere</h2>
        <Switch on={v.others} label="Andere Angemeldete sehen mein Profil" onClick={() => setData({ vis: { ...v, others: !v.others } })} />
        <Switch on={v.photo} label="Foto zeigen" onClick={() => setData({ vis: { ...v, photo: !v.photo } })} />
        <Switch on={v.viertel} label="Viertel zeigen" onClick={() => setData({ vis: { ...v, viertel: !v.viertel } })} />
        <div className="mt-4 rounded-[18px] border bg-white p-4 text-[16px]" style={{ borderColor: LINE }}>
          <b>Mein Alltag</b>
          <div className="mt-1 flex gap-4" style={{ color: MUTE }}><span className="inline-flex items-center gap-1"><Bookmark size={18} />{data.saved.length} vorgemerkt</span><span className="inline-flex items-center gap-1"><Users size={18} />{data.joined.length} Anmeldungen</span></div>
          <Link to="/kalender" className="mt-2 inline-block font-bold underline">Zum Kalender</Link>
        </div>
        <div className="mt-4"><Btn kind="text" onClick={async () => { await signOut(); toast('Abgemeldet'); }}>Abmelden</Btn></div>
      </div>
    </div>
  );
}
