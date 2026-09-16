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
  { label: "Tim", href: "/preview/tim" },
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
export type DoctorBio = {
  lead: string;
  facts: { label: string; value: string }[];
  /** Hronologija — ide u vertikalnu liniju na stranici lekara. */
  timeline: { year: string; text: string }[];
  /** Edukacije grupisane po oblasti. */
  education: { area: string; items: string[] }[];
  closing?: string;
};

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  prefix: string;
  role: string;
  titles: string[];
  image: string;
  bio?: DoctorBio;
};

export const doctors: Doctor[] = [
  {
    id: "ivana",
    slug: "dr-ivana-cvetanovic-simeonidis",
    name: "Ivana Cvetanović Simeonidis",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva",
    titles: ["Specijalista ginekologije i akušerstva"],
    image: "/media/dr-ivana-portret.webp",
  },
  {
    id: "vesna",
    slug: "dr-vesna-krstic",
    name: "Vesna Krstić",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva",
    titles: ["Specijalista ginekologije i akušerstva"],
    image: "/media/dr-vesna-portret.webp",
    bio: {
      lead: "Više od petnaest godina rada sa pacijentima — od hitne pomoći i kućnog lečenja do specijalističke ginekologije. Od aprila 2026. dostupna je pacijentkinjama Vita Clinic.",
      facts: [
        { label: "Diploma", value: "Medicinski fakultet u Nišu, 2006." },
        { label: "Specijalizacija", value: "Ginekologija i akušerstvo, 2023." },
        { label: "Trenutno", value: "Služba za zdravstvenu zaštitu žena, Dom zdravlja Niš" },
      ],
      timeline: [
        { year: "1980", text: "Rođena u Novom Sadu." },
        {
          year: "2006",
          text: "Diplomirala na Medicinskom fakultetu Univerziteta u Nišu sa prosečnom ocenom 8,16.",
        },
        {
          year: "2006 –",
          text: "Radno iskustvo u Domu zdravlja Bela Palanka, zatim u Domu zdravlja Niš — hitna medicinska pomoć, služba opšte medicine i služba kućnog lečenja.",
        },
        {
          year: "2017",
          text: "Posle dugogodišnjeg rada započinje specijalističke studije ginekologije i akušerstva.",
        },
        {
          year: "2023",
          text: "Stiče zvanje specijaliste ginekologije i akušerstva. Zaposlena u službi za zdravstvenu zaštitu žena Doma zdravlja Niš.",
        },
        { year: "2026", text: "Od aprila prima pacijentkinje u Vita Clinic." },
      ],
      education: [
        {
          area: "Akreditovane škole i kursevi",
          items: [
            "Kolposkopija",
            "Citodijagnostika",
            "Ultrazvučna dijagnostika u perinatologiji",
            "Metode estetske i regenerativne ginekologije",
          ],
        },
      ],
    },
  },
  {
    id: "tanja",
    slug: "dr-tanja-mladenovic",
    name: "Tanja Mladenović",
    prefix: "dr spec. med.",
    role: "specijalista ginekologije i akušerstva · lekar estetske medicine",
    titles: [
      "Specijalista ginekologije i akušerstva",
      "Lekar estetske medicine",
      "Koosnivač Udruženja za estetsku i regenerativnu ginekologiju (U.E.R.G.)",
    ],
    image: "/media/dr-tanja-portret.webp",
    bio: {
      lead: "Ginekolog i lekar estetske medicine sa skoro dve decenije edukacija u Francuskoj, Švajcarskoj, Italiji i Srbiji. Organizator, edukator i predavač na edukacijama iz estetske i regenerativne medicine i ginekologije.",
      facts: [
        { label: "Diploma", value: "Medicinski fakultet u Nišu, 2004." },
        {
          label: "Trenutno",
          value: "Specijalista ginekologije i akušerstva, primarna zdravstvena zaštita žena, Dom zdravlja Niš",
        },
        { label: "Udruženje", value: "Koosnivač U.E.R.G." },
      ],
      timeline: [
        { year: "2004", text: "Diplomirala na Medicinskom fakultetu Univerziteta u Nišu." },
        {
          year: "2005 – 2015",
          text: "Medicinski farmaceutski marketing u kompaniji Hemofarm.",
        },
        {
          year: "2007",
          text: "Uporedo sa radom u marketingu počinje karijeru u estetskoj medicini — evropski kongres estetske medicine EMAA u Parizu.",
        },
        {
          year: "2009/10",
          text: "Završava jedinu zvaničnu školu komplementarne medicine — KME Medicinskog fakulteta u Beogradu, osnove akupunkture I, II i III nivo (prof. dr Ljubica Konstantinović).",
        },
        {
          year: "2021",
          text: "ECAMS — European College of Aesthetic Medicine and Surgery, Cremona, Italija.",
        },
        {
          year: "2022",
          text: "Švajcarska: N-Rose protocol training za hijaluronske filere i radiotalasnu terapiju (dr Piotr Kolcewski, dr Sophie Menkes).",
        },
        {
          year: "2023",
          text: "Aptos niti i Regen Lab PRP procedure u regenerativnoj ginekologiji (dr Ksenija Selih Martinec).",
        },
      ],
      education: [
        {
          area: "Estetska medicina",
          items: [
            "Hijaluronski fileri — Inject Now Academy, Francuska",
            "Superficijalni i srednji pilinzi i mezoterapijski kokteli — Martinex, Beograd (dr Olga Selyaninova)",
            "Mezoterapija u sportskoj i estetskoj medicini — dr Jacques Le Coz, prvi saradnik dr M. Pistora, začetnika mezoterapije",
            "Botulinum toksin — Pharma Swiss (Dysport), KME Beograd (dr Najib Chichacly) i Allergan Medical Institute",
          ],
        },
        {
          area: "Ginekologija i dijagnostika",
          items: [
            "Kolposkopija i citologija",
            "Akreditovane edukacije iz ultrazvučne dijagnostike u ginekologiji i perinatologiji — GAK KCS, u organizaciji Udruženja za fetalnu i neonatalnu medicinu, Beograd",
          ],
        },
        {
          area: "Estetska i regenerativna ginekologija",
          items: [
            "Aptos niti i Regen Lab PRP procedure",
            "Radiotalasna terapija — N-Rose protocol",
            "Aktivni učesnik brojnih internacionalnih i domaćih kongresa i edukacija",
          ],
        },
      ],
    },
  },
];

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

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
