# miteinander. als Website

Die App aus dem Prototyp als echte Website, für Laptop, Tablet und Handy. Mit Konto und ohne.

**Was die Seite kann**
- Angebote ansehen, nach Kategorie stöbern, Details und „Wer kommt noch?“ ansehen.
- **Ohne Konto:** vormerken, sich anmelden, Kalender führen, Termine drucken. Das merkt sich der Browser auf diesem Gerät.
- **Mit Konto** (E-Mail, mit oder ohne Passwort, oder Anmeldelink per E-Mail): Der Kalender bleibt auf allen Geräten. Dazu Profil, Sichtbarkeit und Fahrgemeinschaften. Was jemand ohne Konto schon vorgemerkt hat, wird beim Anlegen des Kontos übernommen.
- Große Schrift, große Knöpfe, Tastatur-Bedienung, „Zum Inhalt springen“-Link, Bordeaux als Grundfarbe (`?v=gruen` oder `?v=terra` zum Ausprobieren).

## 1. Auf Vercel veröffentlichen (ohne echte Konten, Demo-Modus)

1. Diesen Ordner auf GitHub hochladen (neues Repository, alles außer `node_modules` und `dist`).
2. Auf vercel.com anmelden, **Add New → Project**, das Repository auswählen.
3. Vercel erkennt Vite automatisch. Nichts ändern, **Deploy** klicken.

Das war es. Die Seite läuft dann im **Demo-Modus**: Konten gelten nur auf dem Gerät, auf dem sie angelegt wurden, und es werden keine E-Mails verschickt. Gut zum Zeigen und Testen.

## 2. Echte Konten mit Supabase (kostenlos für den Anfang)

1. Auf supabase.com ein Projekt anlegen (Region: Frankfurt, wegen Datenschutz).
2. **SQL Editor** öffnen, den Inhalt von `supabase/schema.sql` einfügen, **Run**.
3. **Authentication → URL Configuration:** bei „Site URL“ die Vercel-Adresse eintragen (z. B. `https://miteinander.vercel.app`).
4. **Project Settings → API:** die „Project URL“ und den „anon public“ Key kopieren.
5. In Vercel: **Settings → Environment Variables** zwei Werte anlegen:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon public key
6. In Vercel unter **Deployments** das letzte Deployment erneut ausführen (Redeploy).

Ab jetzt schickt Supabase echte Bestätigungs- und Anmelde-E-Mails. Der „anon“ Key darf öffentlich sein, die Datenbank schützt sich selbst: Jede Person sieht nur die eigene Zeile (Row Level Security in `schema.sql`).
Für viele Nutzerinnen und Nutzer sollten Sie in Supabase unter **Authentication → SMTP** einen eigenen E-Mail-Absender eintragen, der Standard-Versand ist stark begrenzt.

## 3. Lokal ausprobieren

```
npm install
npm run dev
```
Dann `http://localhost:5173` öffnen. Ohne `.env` läuft der Demo-Modus. Für Supabase `.env.example` nach `.env` kopieren und die zwei Werte eintragen.

## Was noch fehlt, bevor die Seite öffentlich werden darf

- **Impressum und Datenschutz** (`src/pages/Recht.tsx`) enthalten Platzhalter. Eine öffentliche Seite braucht beides vollständig.
- **Fotos:** Sie hängen noch an Bildern vom Prototyp-Server. Eigene, lizenzierte Fotos in `public/img/` legen und die Adressen in `src/data.ts` ersetzen. Die Quellen stehen im Bildnachweis der Arbeit.
- **Echte Angebote:** Alle Angebote, Namen und Teilnehmenden in `src/data.ts` sind Beispiele. „Wer kommt noch?“ und die Fahrgemeinschaften sind nur Anzeige, es wird nichts an andere gesendet. Als nächster Schritt kommen die Angebote aus einer Supabase-Tabelle, die Vereine selbst pflegen, und Anmeldungen werden dort gezählt.
- **Google Fonts** werden von Google geladen. Für strengen Datenschutz die Schriften (Atkinson Hyperlegible, Lexend) selbst hosten.
- Termine in den Beispieldaten liegen im Oktober 2026.

## Aufbau

```
src/
  App.tsx            Kopfzeile, Menü, Routen
  lib/app.tsx        Konto, Speicher (Gerät oder Supabase), Farbthema
  lib/supabase.ts    Verbindung (nur aktiv, wenn die zwei Werte gesetzt sind)
  data.ts            Beispiel-Angebote und Kategorien
  theme.ts           Farbvarianten (Bordeaux ist Standard)
  ui.tsx             Knöpfe, Karten, Schalter, Felder
  pages/             Entdecken, Kategorien, Angebot, Kalender, Profil, Anmelden, Hilfe, Person, Recht
supabase/schema.sql  Tabelle und Zugriffsregeln
vercel.json          damit direkte Links wie /kalender funktionieren
```
