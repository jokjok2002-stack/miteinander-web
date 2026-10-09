// Beispieldaten aus dem Prototyp. Später durch echte Angebote ersetzen (siehe README).
// Hinweis: Die Fotos hängen noch am Magic-Patterns-Server. Vor dem Start eigene, lizenzierte Fotos in /public/img legen
// und die Adressen hier ersetzen (z. B. '/img/konzert.jpg'). Quellen stehen im Bildnachweis der Arbeit.
export const IMG = {
  konzert: 'https://cdn.magicpatterns.com/uploads/drb1jFHGVF59FP2TdPou63/Konzert.png',
  toepfern: 'https://cdn.magicpatterns.com/uploads/3u74iyCJLqymK5XyNArLh6/Topferkurs.png',
  flohmarkt: 'https://cdn.magicpatterns.com/uploads/gcJu1No3kP95AH9Pg2CrKM/Flohmarkt.png',
  museum: 'https://cdn.magicpatterns.com/uploads/9Cmpf1mzgHAbJb224Yw12v/Museum_Alleine_machbar_.png',
  haekeln: 'https://cdn.magicpatterns.com/uploads/oamE6kvRuxBb4saz6pU7cr/Hakeln_und_Tee.png',
  kleider: 'https://cdn.magicpatterns.com/uploads/2kN1NaWjPQnnFSBAopTEYh/Kleidertausch.png',
  gruppe: 'https://cdn.magicpatterns.com/uploads/rL8WdmfdbAnSefyGB18Qhq/Gemeinsam_neue_Bekanntschaften_Spaziergang.png',
};

export type CatId = 'aktiv' | 'kultur' | 'tausch' | 'anspruch';

export interface Ev {
  id: number;
  t: string; // Titel
  d: string; // Datum und Uhrzeit
  o: string; // Ort
  p: string; // Preis
  c: CatId;
  solo: boolean; // auch allein gut machbar
  feed: boolean; // erscheint auf der Startseite
  ride?: boolean;
  img?: string;
  note?: string;
  n: string[]; // Beispiel-Teilnehmende
  txt: string;
}

export const EV: Ev[] = [
  { id: 1, t: 'Kleidertausch', d: 'Sa 10.10. · 14:00', o: 'Nachbarschaftsladen Reudnitz', p: 'kostenfrei', c: 'tausch', solo: true, feed: true, img: IMG.kleider, n: ['Helga', 'Uwe'], txt: 'Bringen Sie gut erhaltene Kleidung mit und nehmen Sie mit, was Ihnen gefällt. Kaffee und Kuchen gibt es vor Ort.' },
  { id: 2, t: 'Museumsführung für Senior:innen', d: 'Do 08.10. · 11:00', o: 'Museum Leipzig-Zentrum', p: '4 € ermäßigt', c: 'kultur', solo: false, feed: true, ride: true, img: IMG.museum, n: ['Renate', 'Helga', 'Uwe', 'Gisela'], txt: 'Eine ruhige Führung mit Sitzpausen und Zeit für Fragen. Der Ort ist barrierefrei erreichbar.' },
  { id: 3, t: 'Töpfern für Anfänger', d: 'Mi 14.10. · 10:00', o: 'Kulturhaus Connewitz', p: '8 €', c: 'aktiv', solo: false, feed: true, img: IMG.toepfern, n: ['Peter', 'Gisela'], txt: 'Ton, Werkzeug und Schürzen sind vorhanden. Sie brauchen keine Vorkenntnisse.' },
  { id: 4, t: 'Tee und Häkeln', d: 'Fr 09.10. · 15:00', o: 'Café Nachbarn, Gohlis', p: 'kostenfrei', c: 'aktiv', solo: true, feed: true, img: IMG.haekeln, n: ['Helga', 'Renate', 'Peter'], txt: 'Gemütliche Runde bei Tee. Handarbeit mitbringen oder einfach zuschauen und plaudern.' },
  { id: 5, t: 'Trödelmarkt Kleinzschocher', d: 'Sa 17.10. · 09:00', o: 'Marktplatz Kleinzschocher', p: 'kostenfrei', c: 'tausch', solo: true, feed: true, img: IMG.flohmarkt, n: ['Uwe'], txt: 'Stöbern, tauschen, ins Gespräch kommen. Es gibt Sitzgelegenheiten am Rand.' },
  { id: 6, t: 'Jazz am Nachmittag', d: 'So 11.10. · 16:00', o: 'Peterskirche Leipzig', p: '5 € ermäßigt', c: 'kultur', solo: false, feed: true, ride: true, img: IMG.konzert, n: ['Renate', 'Gisela'], txt: 'Ein Konzert für Zuhörer ohne Eile. Ermäßigung mit Seniorenausweis.' },
  { id: 7, t: 'Rentenberatung im Überblick', d: 'Di 13.10. · 10:00', o: 'Beratungsstelle Mitte', p: 'kostenfrei', c: 'anspruch', solo: true, feed: true, img: IMG.gruppe, n: ['Peter'], txt: 'Kostenlose Beratung zu Grundrente, Wohngeld und weiteren Ansprüchen.' },
  { id: 8, t: 'Infoabend: Präventionskurse erstatten lassen', d: 'Mi 14.10. · 17:00', o: 'Stadtteilbibliothek, Plagwitz', p: 'kostenfrei', c: 'anspruch', solo: true, feed: false, n: ['Helga', 'Uwe', 'Peter'], txt: 'Wir erklären, welche Kurse Ihre Krankenkasse bezahlt und wie Sie die Kosten zurückbekommen. Fragen sind ausdrücklich erwünscht.' },
  { id: 9, t: 'Sprechstunde Grundsicherung', d: 'Do 15.10. · 10:00', o: 'Seniorenbüro, Südvorstadt', p: 'kostenfrei', c: 'anspruch', solo: true, feed: false, note: 'Vertrauliche Beratung, ohne Termin', n: ['Gisela'], txt: 'Eine Beraterin erklärt Ihnen in Ruhe, welche Leistungen Ihnen zustehen und wie der Antrag funktioniert. Sie brauchen keinen Termin.' },
  { id: 10, t: 'Rückenschule (Präventionskurs)', d: 'Mo 19.10. · 10:00', o: 'Gesundheitszentrum, Gohlis', p: '75–100 % erstattungsfähig', c: 'anspruch', solo: true, feed: false, note: '8 Termine, jeweils montags · nach § 20 SGB V', n: ['Renate', 'Helga', 'Uwe', 'Gisela', 'Peter'], txt: 'Sanfte Übungen für einen gesunden Rücken, in kleiner Gruppe. Nach dem Kurs reichen Sie die Teilnahmebescheinigung bei Ihrer Krankenkasse ein.' },
  { id: 11, t: 'Ernährungskurs (Präventionskurs)', d: 'Di 20.10. · 16:00', o: 'Volkshochschule Leipzig, Zentrum-Süd', p: '75–100 % erstattungsfähig', c: 'anspruch', solo: true, feed: false, note: '6 Termine, jeweils dienstags · nach § 20 SGB V', n: ['Peter', 'Gisela', 'Uwe', 'Helga'], txt: 'Gemeinsam kochen und Wissen mitnehmen. Nach dem Kurs reichen Sie die Teilnahmebescheinigung bei Ihrer Krankenkasse ein.' },
];

export const PEOPLE: Record<string, { v: string; a: string; i: string[]; col: string }> = {
  Renate: { v: 'Connewitz', a: 'Ich gehe gern ins Museum und fahre selbst Auto. Mitfahrer sind willkommen.', i: ['Kultur', 'Gärtnern'], col: '#9c3f1c' },
  Helga: { v: 'Gohlis', a: 'Ich häkle seit 50 Jahren und freue mich über neue Gesichter.', i: ['Handarbeit', 'Tee'], col: '#30533b' },
  Uwe: { v: 'Reudnitz', a: 'Ich tausche gern und kenne jeden Flohmarkt der Stadt.', i: ['Flohmarkt', 'Radfahren'], col: '#7a5c8e' },
  Gisela: { v: 'Südvorstadt', a: 'Musik ist meine Leidenschaft, besonders Jazz.', i: ['Musik', 'Kultur'], col: '#a2762a' },
  Peter: { v: 'Plagwitz', a: 'Ich bin neu in der Stadt und suche nette Gesellschaft.', i: ['Wandern', 'Beratung'], col: '#3d6b86' },
};

export const INTERESTS = ['Kultur', 'Handarbeit', 'Musik', 'Gärtnern', 'Wandern', 'Tee', 'Flohmarkt', 'Beratung'];

export const CATS: { id: CatId; name: string; short: string; bg: string; fg: string }[] = [
  { id: 'aktiv', name: 'Aktiv und gesellig', short: 'Aktiv', bg: '#e9f3e0', fg: '#2c4f1f' },
  { id: 'kultur', name: 'Kultur und Ermäßigung', short: 'Kultur', bg: '#e6f0fa', fg: '#1f4768' },
  { id: 'tausch', name: 'Tausch und Flohmarkt', short: 'Tausch', bg: '#faeed9', fg: '#774812' },
  { id: 'anspruch', name: 'Anspruch und Beratung', short: 'Anspruch', bg: '#f1e6f2', fg: '#5b2a6b' },
];
