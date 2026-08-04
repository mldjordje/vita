export const demoServices = [
  {
    id: "pregled",
    name: "Ginekološki pregled",
    duration: "30 min",
    price: "4.500 RSD",
    description: "Pregled, razgovor i preporuka narednih koraka.",
  },
  {
    id: "trudnoca",
    name: "Kontrola trudnoće",
    duration: "45 min",
    price: "5.500 RSD",
    description: "Redovna kontrola sa ultrazvučnim pregledom.",
  },
  {
    id: "ultrazvuk",
    name: "4D ultrazvuk",
    duration: "30 min",
    price: "6.000 RSD",
    description: "Detaljan prikaz i snimci koje nosite sa sobom.",
  },
  {
    id: "paket",
    name: "Vita paket 2",
    duration: "60 min",
    price: "10.000 RSD",
    description: "Pregled, kolposkopija, PAPA test i ultrazvuk.",
  },
] as const;
export const demoDoctors = [
  {
    id: "ivana",
    name: "dr Ivana Cvetanović Simeonidis",
    shortName: "dr Ivana",
    role: "Ginekologija i akušerstvo",
    image: "/media/dr-ivana-portret.webp",
    color: "#7b1e3f",
  },
  {
    id: "vesna",
    name: "dr Vesna Krstić",
    shortName: "dr Vesna",
    role: "Ginekologija i akušerstvo",
    image: "/media/dr-vesna-portret.webp",
    color: "#a34a6e",
  },
  {
    id: "tanja",
    name: "dr Tanja Mladenović",
    shortName: "dr Tanja",
    role: "Estetska medicina",
    image: "/media/dr-tanja-portret.webp",
    color: "#c9a96a",
  },
] as const;

export const demoDates = [
  { day: "SRE", date: "05", month: "AVG" },
  { day: "ČET", date: "06", month: "AVG" },
  { day: "PET", date: "07", month: "AVG" },
  { day: "SUB", date: "08", month: "AVG" },
  { day: "PON", date: "10", month: "AVG" },
] as const;

export const demoSlots = [
  "08:30",
  "09:15",
  "10:00",
  "11:30",
  "13:00",
  "15:30",
  "17:00",
  "18:15",
] as const;

export const demoAppointments = [
  {
    id: "V-2841",
    time: "09:00",
    patient: "Milica Jovanović",
    service: "Kontrola trudnoće",
    doctor: "dr Ivana",
    status: "Potvrđen",
  },
  {
    id: "V-2842",
    time: "10:15",
    patient: "Ana Petrović",
    service: "Ginekološki pregled",
    doctor: "dr Vesna",
    status: "Čeka potvrdu",
  },
  {
    id: "V-2843",
    time: "11:30",
    patient: "Jovana Stanković",
    service: "4D ultrazvuk",
    doctor: "dr Ivana",
    status: "Potvrđen",
  },
  {
    id: "V-2844",
    time: "13:00",
    patient: "Teodora Ilić",
    service: "Vita paket 2",
    doctor: "dr Tanja",
    status: "Potvrđen",
  },
  {
    id: "V-2845",
    time: "15:30",
    patient: "Marija Nikolić",
    service: "Kontrola trudnoće",
    doctor: "dr Vesna",
    status: "Čeka potvrdu",
  },
] as const;
