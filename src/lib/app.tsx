import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { supabase, DEMO } from './supabase';
import { DEFAULT_THEME, themeFromUrl, type ThemeId } from '../theme';

/* ---------- Typen ---------- */
export interface User { id: string; email: string; first: string; last: string }
export interface Vis { others: boolean; photo: boolean; viertel: boolean }
export interface UserData {
  saved: number[];
  joined: number[];
  rides: Record<number, 'req' | 'off'>;
  viertel: string;
  about: string;
  ints: string[];
  vis: Vis;
}
export const EMPTY: UserData = {
  saved: [], joined: [], rides: {}, viertel: 'Reudnitz',
  about: 'Ich freue mich auf neue Begegnungen in der Nachbarschaft.',
  ints: ['Kultur', 'Tee'], vis: { others: true, photo: true, viertel: false },
};
const toggle = <T,>(arr: T[], x: T) => (arr.includes(x) ? arr.filter((y) => y !== x) : [...arr, x]);
const union = <T,>(a: T[], b: T[]) => Array.from(new Set([...a, ...b]));

/* ---------- Speicher auf dem Gerät ---------- */
const read = <T,>(k: string, fb: T): T => { try { const v = localStorage.getItem(k); return v ? { ...(fb as object), ...JSON.parse(v) } as T : fb; } catch { return fb; } };
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* voll oder gesperrt */ } };
const GUEST_KEY = 'miteinander.gast';
const DEMO_USERS = 'miteinander.demo.konten';
const DEMO_NOW = 'miteinander.demo.aktuell';

interface Ctx {
  user: User | null;
  ready: boolean;
  data: UserData;
  setData: (p: Partial<UserData>) => void;
  toggleSave: (id: number) => void;
  toggleJoin: (id: number) => void;
  setRide: (id: number, r: 'req' | 'off') => void;
  signUp: (a: { email: string; password: string; first: string; last: string }) => Promise<{ error?: string; confirm?: boolean }>;
  signIn: (a: { email: string; password: string }) => Promise<{ error?: string }>;
  magicLink: (a: { email: string; first?: string }) => Promise<{ error?: string; sent?: boolean }>;
  signOut: () => Promise<void>;
  theme: ThemeId; setTheme: (t: ThemeId) => void; themeFixed: boolean;
  toast: (m: string) => void; toastMsg: string;
}
const C = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(C);

export function AppProvider({ children }: { children: ReactNode }) {
  const fixed = themeFromUrl();
  const [theme, setTheme] = useState<ThemeId>(fixed || DEFAULT_THEME);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [data, setDataState] = useState<UserData>(() => read(GUEST_KEY, EMPTY));
  const [toastMsg, setToastMsg] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const saveTimer = useRef<number | undefined>(undefined);
  const userRef = useRef<User | null>(null);
  userRef.current = user;

  const toast = useCallback((m: string) => {
    setToastMsg(m); window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastMsg(''), 2600);
  }, []);

  /* Daten laden, sobald ein Konto bekannt ist; Gastdaten werden dabei zusammengeführt */
  const loadFor = useCallback(async (u: User | null) => {
    if (!u) { setDataState(read(GUEST_KEY, EMPTY)); return; }
    let remote: UserData | null = null;
    if (supabase) {
      const { data: row } = await supabase.from('user_state').select('state').eq('user_id', u.id).maybeSingle();
      if (row?.state) remote = { ...EMPTY, ...(row.state as UserData) };
    } else {
      remote = read<UserData | null>('miteinander.demo.daten.' + u.email, null);
    }
    const guest = read(GUEST_KEY, EMPTY);
    const merged: UserData = remote
      ? { ...remote, saved: union(remote.saved, guest.saved), joined: union(remote.joined, guest.joined), rides: { ...guest.rides, ...remote.rides } }
      : { ...guest };
    setDataState(merged);
    persist(u, merged);
    try { localStorage.removeItem(GUEST_KEY); } catch { /* egal */ }
  }, []);

  const persist = (u: User | null, d: UserData) => {
    if (!u) { write(GUEST_KEY, d); return; }
    const sb = supabase;
    if (sb) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        sb.from('user_state').upsert({ user_id: u.id, state: d, updated_at: new Date().toISOString() }).then(() => undefined);
      }, 600);
    } else write('miteinander.demo.daten.' + u.email, d);
  };

  /* Anmeldestatus beobachten */
  useEffect(() => {
    let alive = true;
    const fromSession = (s: { user: { id: string; email?: string; user_metadata?: Record<string, string> } } | null): User | null =>
      s ? { id: s.user.id, email: s.user.email || '', first: s.user.user_metadata?.first || (s.user.email || '').split('@')[0], last: s.user.user_metadata?.last || '' } : null;
    if (supabase) {
      supabase.auth.getSession().then(async ({ data: d }) => {
        const u = fromSession(d.session); if (!alive) return;
        setUser(u); await loadFor(u); setReady(true);
      });
      const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
        const u = fromSession(s); setUser(u); await loadFor(u);
      });
      return () => { alive = false; sub.subscription.unsubscribe(); };
    }
    const now = read<{ email: string } | null>(DEMO_NOW, null);
    const users = read<Record<string, { first: string; last: string }>>(DEMO_USERS, {});
    const u = now && users[now.email] ? { id: now.email, email: now.email, ...users[now.email] } : null;
    setUser(u); loadFor(u).then(() => setReady(true));
    return () => { alive = false; };
  }, [loadFor]);

  const setData = (p: Partial<UserData>) => setDataState((d) => { const n = { ...d, ...p }; persist(userRef.current, n); return n; });
  const toggleSave = (id: number) => setData({ saved: toggle(data.saved, id) });
  const toggleJoin = (id: number) => {
    const had = data.joined.includes(id);
    setData({ joined: toggle(data.joined, id), saved: !had && !data.saved.includes(id) ? [...data.saved, id] : data.saved });
  };
  const setRide = (id: number, r: 'req' | 'off') => setData({ rides: { ...data.rides, [id]: r } });

  /* ---------- Konto ---------- */
  const signUp: Ctx['signUp'] = async ({ email, password, first, last }) => {
    email = email.trim().toLowerCase();
    if (supabase) {
      const { data: d, error } = await supabase.auth.signUp({ email, password, options: { data: { first: first.trim(), last: last.trim() }, emailRedirectTo: window.location.origin } });
      if (error) return { error: nice(error.message) };
      return { confirm: !d.session };
    }
    const users = read<Record<string, { first: string; last: string }>>(DEMO_USERS, {});
    users[email] = { first: first.trim(), last: last.trim() }; write(DEMO_USERS, users); write(DEMO_NOW, { email });
    const u = { id: email, email, first: first.trim(), last: last.trim() }; setUser(u); await loadFor(u);
    return {};
  };
  const signIn: Ctx['signIn'] = async ({ email, password }) => {
    email = email.trim().toLowerCase();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: nice(error.message) } : {};
    }
    const users = read<Record<string, { first: string; last: string }>>(DEMO_USERS, {});
    if (!users[email]) return { error: 'Zu dieser E-Mail gibt es im Demo-Modus kein Konto auf diesem Gerät. Bitte zuerst ein Konto anlegen.' };
    write(DEMO_NOW, { email }); const u = { id: email, email, ...users[email] }; setUser(u); await loadFor(u); return {};
  };
  const magicLink: Ctx['magicLink'] = async ({ email, first }) => {
    email = email.trim().toLowerCase();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { data: first ? { first: first.trim() } : undefined, emailRedirectTo: window.location.origin } });
      return error ? { error: nice(error.message) } : { sent: true };
    }
    const r = await signUp({ email, password: '', first: first || email.split('@')[0], last: '' });
    return r.error ? r : {};
  };
  const signOut = async () => {
    if (supabase) await supabase.auth.signOut(); else { try { localStorage.removeItem(DEMO_NOW); } catch { /* egal */ } }
    setUser(null); setDataState(read(GUEST_KEY, EMPTY));
  };

  const value = useMemo<Ctx>(() => ({
    user, ready, data, setData, toggleSave, toggleJoin, setRide, signUp, signIn, magicLink, signOut,
    theme, setTheme, themeFixed: !!fixed, toast, toastMsg,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, ready, data, theme, toastMsg]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

function nice(m: string): string {
  const s = m.toLowerCase();
  if (s.includes('invalid login')) return 'E-Mail oder Passwort stimmt nicht. Sie können sich auch einen Anmeldelink per E-Mail schicken lassen.';
  if (s.includes('already registered')) return 'Zu dieser E-Mail gibt es schon ein Konto. Bitte melden Sie sich an.';
  if (s.includes('password') && s.includes('6')) return 'Das Passwort braucht mindestens 6 Zeichen.';
  if (s.includes('rate limit')) return 'Zu viele Versuche. Bitte warten Sie einige Minuten.';
  if (s.includes('not confirmed')) return 'Bitte bestätigen Sie zuerst Ihre E-Mail über den Link in der Nachricht.';
  return 'Das hat leider nicht geklappt. Bitte versuchen Sie es noch einmal.';
}

export { DEMO };
