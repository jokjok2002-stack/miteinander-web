import { PageTitle } from '../ui';

// WICHTIG: Diese Texte sind Platzhalter. Eine öffentliche Website braucht ein vollständiges Impressum
// und eine Datenschutzerklärung. Bitte vor der Veröffentlichung ausfüllen oder mit einem Generator erstellen.
export function RechtPage({ which }: { which: 'datenschutz' | 'impressum' }) {
  if (which === 'impressum') return (
    <div className="max-w-2xl">
      <PageTitle>Impressum</PageTitle>
      <p className="rounded-2xl bg-[#f3ece1] p-4 text-[16px]">[Bitte vor der Veröffentlichung ergänzen]</p>
      <p className="mt-4">Josephine Pöschl<br />[Straße und Hausnummer]<br />[PLZ Ort]<br />E-Mail: [E-Mail-Adresse]</p>
      <p className="mt-4">Dieses Angebot ist ein Studienprojekt (Bachelorarbeit Mediendesign, IU Internationale Hochschule). Alle Inhalte sind Beispiele.</p>
    </div>
  );
  return (
    <div className="max-w-2xl">
      <PageTitle>Datenschutz</PageTitle>
      <p className="rounded-2xl bg-[#f3ece1] p-4 text-[16px]">[Platzhalter: bitte vor der Veröffentlichung vollständig ausfüllen]</p>
      <h2 className="mt-5 text-[20px]">Ohne Konto</h2>
      <p>Ihre Vormerkungen und Anmeldungen werden nur im Speicher Ihres Browsers abgelegt. Es werden keine Daten an uns übertragen.</p>
      <h2 className="mt-5 text-[20px]">Mit Konto</h2>
      <p>Wir speichern Ihre E-Mail-Adresse, Ihren Vornamen und Ihre Angaben im Profil sowie Ihre Vormerkungen und Anmeldungen. Anbieter der Datenbank: [Supabase, Servierstandort bitte eintragen]. Sie können Ihr Konto jederzeit löschen lassen, schreiben Sie dazu an [E-Mail-Adresse].</p>
      <h2 className="mt-5 text-[20px]">Schriften und Bilder</h2>
      <p>Die Schriften werden von Google Fonts geladen. [Bitte prüfen: besser die Schriften selbst auf dem Server ablegen.] Die Fotos werden von [Server] geladen.</p>
    </div>
  );
}
