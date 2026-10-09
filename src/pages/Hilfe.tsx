import { Bookmark, CalendarDays, Car, Euro, MapPin, Printer, UserRound, Users } from 'lucide-react';
import { IconCircle, LINE, MUTE, PageTitle } from '../ui';

const SYMS: [typeof Bookmark, string, string][] = [
  [Bookmark, 'Vormerken', 'Klicken Sie auf das Lesezeichen, um sich einen Termin zu merken. Sie sind dadurch noch nicht angemeldet.'],
  [MapPin, 'Ort', 'Wo findet es statt?'],
  [UserRound, 'Auch allein gut machbar', 'Hier müssen Sie niemanden kennen.'],
  [Euro, 'Preis', 'Was es kostet, oder ob es kostenfrei ist.'],
  [CalendarDays, 'Kalender', 'Oben „Ich komme“, darunter „Vorgemerkt“.'],
  [Printer, 'Drucken', 'Ihre Termine auf Papier.'],
  [Car, 'Fahrgemeinschaft', 'Zusammen hinfahren.'],
  [Users, 'Wer kommt noch?', 'Sehen Sie, wer sich angemeldet hat.'],
];

export function HilfePage() {
  return (
    <>
      <PageTitle sub="Alle Zeichen auf einen Blick. Zu jedem Zeichen steht auf der Seite auch ein Wort.">Das bedeuten die Symbole</PageTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {SYMS.map(([Ic, t, d]) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3" style={{ borderColor: LINE }}>
            <IconCircle size={48}><Ic size={26} /></IconCircle>
            <div><b>{t}</b><div className="text-[16px]" style={{ color: MUTE }}>{d}</div></div>
          </div>
        ))}
      </div>
      <h2 className="mb-2 mt-10 text-[24px]">Mit Konto oder ohne</h2>
      <div className="max-w-3xl rounded-2xl border bg-white p-5" style={{ borderColor: LINE }}>
        <p><b>Ohne Konto:</b> Sie können alle Angebote ansehen, vormerken, sich anmelden und Ihre Termine drucken. Ihr Gerät merkt sich das. Wenn Sie den Browser-Verlauf löschen, ist die Liste weg.</p>
        <p className="mt-2"><b>Mit Konto:</b> Ihre Termine bleiben auf jedem Gerät erhalten. Sie können bei Fahrgemeinschaften mitmachen und ein kleines Profil anlegen. Sie entscheiden selbst, was andere sehen.</p>
        <p className="mt-2"><b>Tipp zum Bedienen:</b> Mit der Tab-Taste springen Sie von Knopf zu Knopf. Mit „Strg und Plus“ machen Sie die Schrift größer.</p>
      </div>
    </>
  );
}
