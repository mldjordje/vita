/**
 * Sav tekst landinga na jednom mestu.
 * Profil klinike još nije potvrđen (ginekologija+trudnoća po Instagramu vs šira estetika),
 * pa se zamena copy-ja radi ovde bez diranja komponenti.
 */

export const clinic = {
  name: "Vita Clinic",
  city: "Niš",
  /** Njihov sopstveni slogan sa Instagram grafika. */
  tagline: "Vaša ordinacija poverenja",
  bioLine: "Od prvog dana trudnoće sa vama",
  /** Sa njihove grafike: „SPECIJALISTIČKA ORDINACIJA VITA CLINIC NIŠ". */
  descriptor: "Specijalistička ordinacija · Ginekologija i akušerstvo · Estetska medicina",
  phone: "061 703 6960",
  phoneHref: "tel:+381617036960",
  email: "vitaclinicnis@gmail.com",
  address: "Ćirila i Metodija 14, Niš",
  instagram: "https://www.instagram.com/vitaclinicnis/",
  hours: [
    { days: "Ponedeljak – Petak", time: "08:00 – 20:00" },
    { days: "Subota", time: "09:00 – 14:00" },
    { days: "Nedelja", time: "Ne radimo" },
  ],
} as const;

export const nav = [
  { label: "Trudnoća", href: "#trudnoca" },
  { label: "Tim", href: "#tim" },
  { label: "Paketi", href: "#paketi" },
  { label: "Usluge", href: "#usluge" },
  { label: "Ordinacija", href: "#ordinacija" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const hero = {
  eyebrow: "Ginekologija · Akušerstvo · Ultrazvučna dijagnostika",
  /** Njihov slogan sa objava — jači i istinitiji od bilo čega izmišljenog. */
  title: ["Vaša ordinacija", "poverenja"],
  lead: "Od prvog dana trudnoće sa vama. Specijalistička ordinacija u Nišu.",
  cta: "Zakažite pregled",
  ctaSecondary: "Pogledajte usluge",
} as const;

/**
 * Samo ono što klinika sama tvrdi na svojim objavama.
 * Ordinacija je registrovana 16.03.2026 — nema osnova za brojke tipa
 * „1000+ pacijentkinja" ili ocenu na Google-u, i takve tvrdnje ne smeju da stoje.
 */
export const trust = [
  "Vaša ordinacija poverenja",
  "Ginekologija",
  "Akušerstvo",
  "Ultrazvučna dijagnostika",
  "Estetska i regenerativna ginekologija",
  "Ćirila i Metodija 14, Niš",
] as const;

export const services = [
  {
    id: "ginekologija",
    title: "Ginekološki pregled",
    desc: "Kompletan pregled sa kolposkopijom i PAPA testom, uz nalaz isti dan.",
    duration: "30 min",
    image: "/media/recepcija.jpg",
  },
  {
    id: "trudnoca",
    title: "Vođenje trudnoće",
    desc: "Praćenje od prve nedelje do porođaja, sa jasnim planom kontrola.",
    duration: "45 min",
    image: "/media/cekaonica.jpg",
  },
  {
    id: "ultrazvuk",
    title: "Ultrazvučna dijagnostika",
    desc: "Praćenje rasta i zdravlja bebe — bezbedno i precizno.",
    duration: "30 min",
    image: "/media/mural.jpg",
  },
  {
    id: "estetska",
    title: "Estetska i regenerativna ginekologija",
    desc: "Neinvazivni tretmani za komfor i kvalitet svakodnevice.",
    duration: "60 min",
    image: "/media/enterijer.jpg",
  },
  {
    id: "rf",
    title: "RF hirurgija",
    desc: "Precizno uklanjanje promena uz kratak oporavak.",
    duration: "20 min",
    image: "/media/recepcija.jpg",
  },
  {
    id: "hpv",
    title: "Lečenje HPV infekcije",
    desc: "Tipizacija HPV-a, praćenje i plan terapije.",
    duration: "30 min",
    image: "/media/cekaonica.jpg",
  },
] as const;

/**
 * Lekari sa njihovih zvaničnih Instagram objava — imena, titule i portreti su njihovi.
 * Ništa ovde nije izmišljeno.
 */
export const doctors = [
  {
    id: "ivana",
    name: "Ivana Cvetanović Simeonidis",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva",
    image: "/media/dr-ivana-portret.webp",
  },
  {
    id: "vesna",
    name: "Vesna Krstić",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva",
    image: "/media/dr-vesna-portret.webp",
  },
  {
    id: "tanja",
    name: "Tanja Mladenović",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva · lekar estetske medicine",
    image: "/media/dr-tanja-portret.webp",
  },
] as const;

/** Paketi i cene su tačno onako kako ih klinika objavljuje. */
export const packages = [
  {
    id: "paket-1",
    name: "Vita paket 1",
    price: "7.500",
    currency: "RSD",
    items: ["Ginekološki pregled", "Kolposkopija", "PAPA test"],
    featured: false,
  },
  {
    id: "paket-2",
    name: "Vita paket 2",
    price: "10.000",
    currency: "RSD",
    items: [
      "Ginekološki pregled",
      "Kolposkopija",
      "PAPA test",
      "Ultrazvučni ginekološki pregled",
    ],
    featured: true,
  },
  {
    id: "uzv-dojke",
    name: "Ultrazvuk dojke",
    price: "4.000",
    currency: "RSD",
    items: ["Uz sistematski pregled"],
    featured: false,
  },
] as const;

/**
 * Galerija. Fotografije trudnice, 4D snimka i osoblja su isečene iz njihovih
 * objava — utisnut tekst je odsečen da se ne dupla sa tipografijom sajta.
 */
export const gallery = [
  { id: "cekaonica", src: "/media/cekaonica.jpg", alt: "Čekaonica ordinacije" },
  { id: "trudnica", src: "/media/trudnica.webp", alt: "Trudnica u poslednjem tromesečju" },
  { id: "uzv-4d", src: "/media/uzv-4d.webp", alt: "4D ultrazvučni pregled" },
  { id: "enterijer", src: "/media/enterijer.jpg", alt: "Enterijer ordinacije" },
  { id: "osoblje", src: "/media/osoblje.webp", alt: "Recepcija ordinacije" },
  { id: "mural", src: "/media/mural.jpg", alt: "Cvetni mural u čekaonici" },
  { id: "recepcija", src: "/media/recepcija.jpg", alt: "Pult recepcije" },
] as const;

/** Nedelje trudnoće — horizontalna pinned sekcija. */
export const pregnancy = [
  { week: "6", title: "Prvi otkucaj", text: "Prvi ultrazvuk i potvrda trudnoće." },
  { week: "12", title: "Nuhalni nabor", text: "Prvi skrining i procena rizika." },
  { week: "20", title: "Ekspertski pregled", text: "Detaljan pregled anatomije bebe." },
  { week: "28", title: "4D susret", text: "Prvo lice bebe — snimak nosite kući." },
  { week: "36", title: "Priprema", text: "Plan porođaja i poslednje kontrole." },
  { week: "40", title: "Dobrodošli", text: "Sa vama i posle — kontrola mame i bebe." },
] as const;

export const testimonials = [
  {
    name: "Milica J.",
    text: "Prvi put da sam iz ordinacije izašla mirna. Sve mi je objašnjeno bez žurbe.",
  },
  {
    name: "Ana P.",
    text: "Vodili su mi celu trudnoću. Osećaj je da vas neko stvarno prati, a ne otaljava.",
  },
  {
    name: "Jovana S.",
    text: "4D snimak je bio nešto najlepše. Prostor je predivan i čist.",
  },
  {
    name: "Teodora M.",
    text: "Zakazivanje bez čekanja, termin dobijem isti dan. Ogromna razlika.",
  },
] as const;

/** Demo sadržaj — jasno označen, nisu prave osobe. */
export const DEMO_NOTICE =
  "Demo prikaz. Fotografije i podaci o lekarima su iz ordinacije; recenzije i podaci u portalima su primer.";
