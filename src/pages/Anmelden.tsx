import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Mail } from 'lucide-react';
import { DEMO, useApp } from '../lib/app';
import { Btn, Field, LINE, MUTE, IconCircle } from '../ui';

const okMail = (s: string) => /^\S+@\S+\.\S+$/.test(s.trim());

export function AnmeldenPage() {
  const { user, signUp, signIn, magicLink, toast } = useApp();
  const nav = useNavigate();
  const [mode, setMode] = useState<'neu' | 'alt'>('neu');
  const [first, setFirst] = useState(''); const [last, setLast] = useState('');
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [show, setShow] = useState(false);
  const [cons, setCons] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [mail, setMail] = useState<string | null>(null);

  if (user) return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-[30px]">Sie sind angemeldet, {user.first}.</h1>
      <div className="mt-4 flex justify-center gap-3"><Btn to="/">Zu den Angeboten</Btn><Btn to="/profil" kind="outline">Mein Profil</Btn></div>
    </div>
  );

  if (mail) return (
    <div className="mx-auto max-w-lg text-center">
      <div className="flex justify-center"><IconCircle size={96}><Mail size={48} /></IconCircle></div>
      <h1 className="mt-4 text-[30px]">Bitte schauen Sie in Ihr Postfach</h1>
      <p className="mt-2 text-[19px]">Wir haben eine Nachricht an<br /><b>{mail}</b><br />geschickt. Klicken Sie darin auf den Knopf, dann sind Sie angemeldet. Schauen Sie auch im Spam-Ordner nach.</p>
      <div className="mt-4"><Btn kind="text" onClick={() => setMail(null)}>E-Mail ändern</Btn></div>
    </div>
  );

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (mode === 'neu' && !first.trim()) er.first = 'Bitte geben Sie Ihren Vornamen ein.';
    if (!okMail(email)) er.email = 'Bitte geben Sie eine gültige E-Mail ein, zum Beispiel ingrid@mail.de';
    if (!DEMO && pw && pw.length < 6) er.pw = 'Das Passwort braucht mindestens 6 Zeichen.';
    if (mode === 'neu' && !cons) er.cons = 'Bitte stimmen Sie zu, um fortzufahren.';
    setErrs(er); if (Object.keys(er).length) return;
    setBusy(true);
    let res: { error?: string; confirm?: boolean; sent?: boolean };
    if (mode === 'neu') res = pw ? await signUp({ email, password: pw, first, last }) : await magicLink({ email, first });
    else res = pw ? await signIn({ email, password: pw }) : await magicLink({ email });
    setBusy(false);
    if (res.error) { setErrs({ form: res.error }); return; }
    if (res.confirm || res.sent) { setMail(email.trim()); return; }
    toast('Willkommen! Sie sind angemeldet.'); nav('/profil');
  };

  const tab = (id: 'neu' | 'alt', label: string) => (
    <button type="button" role="tab" aria-selected={mode === id} onClick={() => { setMode(id); setErrs({}); }}
      className="min-h-[52px] flex-1 rounded-2xl border-2 font-bold" style={{ borderColor: mode === id ? 'var(--acc)' : LINE, background: mode === id ? 'var(--blush)' : '#fff', color: mode === id ? 'var(--acc)' : MUTE }}>{label}</button>
  );

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-[32px]">{mode === 'neu' ? 'Konto anlegen' : 'Anmelden'}</h1>
      <p style={{ color: MUTE }}>Ein Konto ist freiwillig. Damit bleiben Ihre Termine auf allen Geräten erhalten, und andere erkennen Sie bei Fahrgemeinschaften.</p>
      {DEMO && <p className="mt-3 rounded-2xl p-3 text-[15px]" style={{ background: '#f3ece1' }}>Demo-Modus: Das Konto gilt nur auf diesem Gerät. Es wird keine E-Mail verschickt.</p>}
      <div role="tablist" className="mt-5 flex gap-3">{tab('neu', 'Neu hier')}{tab('alt', 'Ich habe ein Konto')}</div>

      <form onSubmit={submit} noValidate className="mt-2">
        {mode === 'neu' && <>
          <Field label="Vorname" value={first} onChange={setFirst} error={errs.first} autoComplete="given-name" />
          <Field label="Nachname (freiwillig)" value={last} onChange={setLast} autoComplete="family-name" />
        </>}
        <Field label="E-Mail" type="email" value={email} onChange={setEmail} error={errs.email} autoComplete="email" />
        <Field label="Passwort (freiwillig)" hint={DEMO ? 'Im Demo-Modus nicht nötig.' : 'Lassen Sie es leer, dann schicken wir Ihnen einen Anmeldelink per E-Mail. Das ist am einfachsten.'}
          type={show ? 'text' : 'password'} value={pw} onChange={setPw} error={errs.pw} autoComplete={mode === 'neu' ? 'new-password' : 'current-password'} />
        <label className="mt-2 inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[16px]"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-6 w-6" /> Passwort anzeigen</label>

        {mode === 'neu' && <>
          <label className="mt-3 flex min-h-[60px] cursor-pointer items-center gap-3 rounded-2xl border bg-white px-4 py-3" style={{ borderColor: LINE }}>
            <input type="checkbox" checked={cons} onChange={(e) => setCons(e.target.checked)} className="h-7 w-7 shrink-0" />
            <span className="text-[16px]">Ich bin einverstanden, dass andere Angemeldete meinen Vornamen sehen. Es gilt die <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link>.</span>
          </label>
          {errs.cons && <div className="mt-1 text-[15px] text-[#b3261e]" role="alert">{errs.cons}</div>}
        </>}
        {errs.form && <div className="mt-4 rounded-2xl border-2 border-[#b3261e] bg-white p-3 text-[16px] text-[#b3261e]" role="alert">{errs.form}</div>}
        <div className="mt-5"><Btn type="submit" full>{busy ? 'Einen Moment …' : mode === 'neu' ? (pw ? 'Konto anlegen' : 'Konto anlegen, Link per E-Mail') : (pw ? 'Anmelden' : 'Anmeldelink per E-Mail schicken')}</Btn></div>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border bg-white p-4" style={{ borderColor: LINE }}>
        <Check size={24} color="var(--grn)" className="mt-0.5 shrink-0" />
        <p className="text-[16px]"><b>Sie brauchen kein Konto.</b> Angebote ansehen, vormerken und drucken geht auch ohne. <Link to="/" className="font-bold underline">Weiter ohne Konto</Link></p>
      </div>
    </div>
  );
}
