# Vita Clinic Niš — Plan demo landinga + admina (2 dana)

Status: PLAN. Nista se ne implementira dok se ne potvrde odluke na dnu.

## 1. Sta znamo o klijentu

| Podatak | Vrednost | Izvor |
|---|---|---|
| Naziv | Vita Clinic Niš | IG @vitaclinicnis |
| Delatnost | Ginekologija, trudnoća, ultrazvuk, estetska i regenerativna ginekologija | IG bio |
| Usluge | RF hirurgija, biopsija, HPV, praćenje trudnoće, UZ dijagnostika, paketi | IG highlights |
| Adresa | Ćirila i Metodija 14, Niš | IG |
| Telefon | 0617036960 | IG |
| Pratioci | ~1.174 | IG |
| Slogan (postojeći) | „Od prvog dana trudnoće sa vama" | IG bio |

Assets u repou: 4 fotografije enterijera + 1 video (30MB, `.mp4`).
Enterijer = beli mermer, roze/lila velur, zlatni detalji, orhideje, antracit metal, cvetni mural.

**Nedostaje:** logo u vektoru, portret lekara, foto ordinacija/UZ aparata, tekstovi, cenovnik, Google recenzije.

## 1b. Provereni podaci i povučene tvrdnje (04.08.2026)

Iz registra privrednih subjekata i sa njihovih Instagram objava:

- Vlasnica: **Miljana Mitrović**, specijalistička ordinacija ginekologije i akušerstva
- Registrovana **16.03.2026** — ordinacija je stara pet meseci
- Mejl `vitaclinicnis@gmail.com`, telefon iz registra 064 163 9963, sa objava 061 703 6960
- Njihov sopstveni slogan: **„Vaša ordinacija poverenja"**
- Njihova podela usluga: **Ginekologija · Akušerstvo · Ultrazvučna dijagnostika**
- Sa objave: „Ultrazvuk u trudnoći — praćenje rasta i zdravlja bebe, bezbedno i precizno"

**Povučeno iz copy-ja:** „1000+ pacijentkinja" i „5.0 na Google recenzijama".
Ordinacija posluje pet meseci i te tvrdnje nemaju osnov — izmišljene brojke o pravoj
ordinaciji ne smeju da stoje ni na demou. Zamenjene su njihovim sopstvenim rečima.

**Još uvek izmišljeno i mora biti označeno na sajtu:** recenzije pacijentkinja.

### Materijal stigao 04.08.2026 (njihove IG objave)

**Lekari — pravi, sa portretima:**
- dr spec. med. Ivana Cvetanović Simeonidis — specijalista ginekologije i akušerstva
- dr spec. med. Vesna Krstić — specijalista ginekologije i akušerstva
- dr spec. med. Tanja Mladenović — spec. ginekologije i akušerstva, lekar estetske medicine

Portreti su marketinške grafike sa utisnutim imenom i telefonom. Isečeni su na čiste
portrete (`*-portret.webp`) — u suprotnom sajt izgleda kao Instagram feed, a tekst se dupla.

**Paketi i cene — njihove, ne izmišljene:**
- Vita paket 1 — 7.500 RSD: ginekološki pregled, kolposkopija, PAPA test
- Vita paket 2 — 10.000 RSD: isto + ultrazvučni ginekološki pregled
- Ultrazvuk dojke — 4.000 RSD, uz sistematski pregled

**Brend:** logo je krug sa linijskim crtežom žene i lotosa, boja vinska crvena.
Paleta je prepravljena po njima — `wine #7B1E3F`, `wine-deep #5A1130`, `rose #A34A6E`,
`blush #F7DCE6`. Moje ranije zlato/orhideja su izbačeni; zlato ostaje samo kao akcenat
(lotos u njihovim grafikama i detalji u enterijeru su zlatni).

**Ostale slike:** soba sa ultrazvukom, trudnica + 4D snimak, recepcija sa osobljem.

## 2. Koncept: „Prvi otkucaj"

Ne generički medicinski sajt. Emotivni luk: *strah → poverenje → prvi otkucaj → briga do kraja*.

Vizuelni jezik direktno iz enterijera — mermer, blush, zlato. Editorial, ne korporativno.
Wow dolazi iz **koreografije i tipografije**, ne iz šarenila. Medicinska ozbiljnost + toplina.

**Signature motiv (nit kroz ceo sajt):** tanka zlatna EKG/otkucaj linija koja se crta po scrollu i povezuje sekcije. Puls kao globalni ritam animacija (easing `cubic-bezier(.16,1,.3,1)`, tempo 1 „otkucaj" = 640ms).

### Dizajn tokeni

```
--marble    #F8F6F4   bg
--blush     #EBD2DB   sekundarna
--mauve     #C9A3B4   akcenat soft
--orchid    #A8447C   akcenat jak (CTA, hover)
--gold      #C9A96A   linije, EKG, detalji
--ink       #232227   tekst / dark sekcije
--muted     #6B6670
```
Tipografija: display serif (Playfair Display / Instrument Serif — proveriti ćirilicu) + Inter za UI.
Skala: hero clamp(3.5rem, 9vw, 11rem), h2 clamp(2.2rem, 5vw, 4.5rem).
Grid 12 kol, maks 1440, gutters 24/40.

## 3. Struktura landinga + motion po sekciji

0. **Preloader** — mark se crta (SVG stroke-dashoffset) + counter 0→100 + EKG puls. Max 1.4s, skip na drugi posetu (sessionStorage). Izlaz: mask wipe naviše u hero.
1. **Hero** — video (kompresovan, muted loop, poster) pod clip-path maskom koja se otvara. Naslov split-text stagger po rečima, `Od prvog dana`. Magnetic CTA „Zakažite pregled". Fina zrnasta tekstura (canvas noise) preko svega. Scroll cue = puls.
2. **Trust traka** — marquee: 5.0 Google · 1000+ pacijentkinja · UZ 4D · Niš. Sporo, beskonačno, pauza na hover.
3. **„Od prvog dana" — horizontalni pinned scroll** (GSAP ScrollTrigger pin + x translate). Timeline trudnoće 6→40 nedelja, kartice sa UZ vizualima, zlatna linija napreduje kao progress. Ovo je glavni wow moment.
4. **Usluge** — lista tipa index (veliki serif redovi). Hover: slika prati kursor (lerp), red se boji, ostali se gase. Kategorije: Ginekologija · Trudnoća i UZ · Estetska i regenerativna ginekologija · RF hirurgija · HPV · Biopsija.
5. **Lekar / tim** — portret sa parallaxom, tekst reveal po linijama, potpis se ispisuje (SVG draw).
6. **Ordinacija** — galerija na scroll: slojevite fotke, različite brzine, klik → lightbox sa Flip animacijom (GSAP Flip).
7. **Recenzije** — auto-scroll kartice, dve trake u suprotnim smerovima, blur na ivicama.
8. **Zakazivanje** — velika sekcija, forma u 3 koraka (usluga → termin → podaci), inline validacija, success stanje sa pulsom.
9. **Kontakt/Footer** — mapa (statična slika + link, ne iframe zbog performansi), radno vreme, veliki kinetic wordmark VITA koji reaguje na kursor.

Sticky mini-CTA se pojavljuje posle heroja (scroll > 80vh), nestaje u sekciji 8.

## 4. Tehnički stack

- Next 15 (App Router) + React 19 — isto kao drigic, nula troška učenja
- GSAP 3 + ScrollTrigger + Flip (+ ručni split-text, bez plaćenog SplitText)
- Lenis (smooth scroll) — već u drigic depsu
- CSS Modules ili Tailwind — **odluka: Tailwind v4** za brzinu, admin ostaje na svom CSS-u
- next/image + AVIF/WebP, video → h264 mp4 + webm, target ≤ 6MB, poster JPG
- Vercel deploy

**Performanse (nije opciono za awwwards nivo):**
- LCP < 2.5s, CLS < 0.05, INP < 200ms
- video lazy + `preload="none"` do heroja u viewportu
- sve animacije transform/opacity, `will-change` samo tokom animacije
- `prefers-reduced-motion` → sve animacije padaju na fade
- mobilni: bez pin-a horizontalne sekcije, prelazi u vertikalni stack

## 5. Admin — owner/staff, vizuelni demo

**Odluka: baza je `dropz/app/admin/`, ne drigic.** Razlog: dropz već ima owner/staff role model
(`role: "owner" | "staff"`, `NAV` vs `STAFF_NAV`, `/api/admin/me`, middleware allow-list),
TS, lucide ikone, čist shell. drigic nema role — imao bi jedan nalog i morali bismo ga graditi od nule.
Iz drigic se uzimaju samo moduli kojih u dropz nema (analitika, media, obaveštenja).

### Šta se kopira

| Izvor | Šta | Zašto |
|---|---|---|
| `dropz/app/admin/AdminShell.tsx` | shell + role-aware nav + mobilni meni | jezgro owner/staff sistema |
| `dropz/app/admin/admin.css` (49KB) | ceo stil | rebrand kroz CSS varijable → blush/gold |
| `dropz/app/admin/CalendarTab.tsx` (35KB) | kalendar | najjači ekran za prezentaciju |
| `dropz/app/admin/StaffScheduleTab.tsx` (18KB) | raspored po članu tima | tačno ono što treba za više lekara |
| `dropz/app/admin/TimTab.tsx`, `DostupnostTab`, `KlijentiTab`, `TerminiTab`, `RequestsTab`, `FinansijeTab`, `PodesavanjaTab`, `DashboardHome` | ostali tabovi | 1:1 |
| `dropz/lib/auth/admin.ts`, `lib/staff.ts` | role helperi | referenca za mock |
| `srdjan/app/admin/radnici`, `smene`, `zarada` | ideje za ekrane | ako fali pokrivenost |
| `drigic/app/admin/analitika`, `media` | grafikoni, galerija | dopuna |

### Trik za 2 dana: mock API sloj umesto baze

Admin stranice zovu `/api/admin/*` na 58 mesta. **Ne diramo nijedan `fetch`.**
Umesto toga pišemo Next route handlere na iste putanje, koje čitaju iz `lib/demo-data.ts`
(module-level in-memory store, seedovan srpskim podacima).

Posledice:
- stranice se kopiraju bez izmena → sati umesto dana
- klik stvarno menja stanje (potvrdi termin → nestane iz „na čekanju") dok se ne refrešuje
- nula baze, nula Neon/Drizzle setupa, nula env varijabli
- prebacivanje owner ↔ staff = promena vrednosti u mock `/api/admin/me`

Demo prekidač: plutajuća pilula dole desno „Prikaz: Owner / dr Jelena", menja rolu bez logina.
Login ekran ostaje (izgled), sa ispisanim demo nalozima kao u srdjan projektu.

### Owner vs Staff (šta ko vidi)

**Owner (vlasnik klinike):** Pregled · Kalendar (svi lekari) · Termini · Upiti · Pacijentkinje ·
Tim/Lekari · Finansije · Analitika · Usluge · Galerija · Sadržaj · Podešavanja

**Staff (lekar):** Moj kalendar · Moji termini · Moja dostupnost · Moje pacijentkinje (samo svoje) · Profil

Rename domenskih pojmova: klijenti → pacijentkinje, tretmani → pregledi, artisti/radnici → lekari,
zahtevi → upiti, portfolio → galerija.

### Seed podaci (izmišljeni, jasno označeni kao demo)

4 lekara sa različitim rasporedima i bojama u kalendaru, ~40 termina kroz 2 nedelje
(potvrđeni/na čekanju/otkazani), ~25 pacijentkinja, 12 usluga sa cenama i trajanjem,
6 upita u inboxu, finansije za 3 meseca.

## 6. Raspored — 2 dana

**Dan 1 (jutro)** — priprema assetsa (kompresija videa 30MB → ~5MB, poster frejmovi, retuš fotki), scaffold Next+Tailwind+GSAP+Lenis, dizajn tokeni, preloader + hero.
**Dan 1 (popodne)** — trust traka, horizontalna timeline sekcija (najskuplja), usluge sa hover slikom.
**Dan 2 (jutro)** — lekar, galerija, recenzije, booking forma (mock, 3 koraka), kontakt/footer, mobilni pass, reduced-motion.
**Dan 2 (popodne)** — kopiranje dropz admina + mock API sloj + seed, rebrand na Vita paletu, owner/staff prekidač, deploy na Vercel, Lighthouse, demo scenario.

Buffer: horizontalna timeline sekcija je prva koja se seče ako kasnimo (fallback = vertikalni stepper sa reveal-om).
Admin može delom da ide paralelno jer ne zavisi od landing dizajna.

## 7. Rizici

| Rizik | Mitigacija |
|---|---|
| Nema logo vektor | Napraviti privremeni wordmark iz serif fonta + monogram V |
| Video 30MB ubija LCP | ffmpeg kompresija + poster + lazy |
| Nema pravih tekstova | Copy iz IG bija + standardni ginekološki sadržaj, označeno kao demo |
| Nema portreta lekara | Sekcija „lekar" postaje sekcija „ordinacija" |
| 2 dana je tesno za pin scroll + admin | Admin ide u paraleli (kopija + mock API, ne novi razvoj), timeline ima fallback |
| Ćirilica/latinica u display fontu | Provera glyph coverage pre izbora fonta |
| Klijent na demou klikne nešto što „ne radi" | Demo baner + mock store koji ipak menja stanje; nefunkcionalna dugmad daju toast „Demo prikaz" |
| Profil klinike nije potvrđen | Copy se piše u odvojenom `content.ts` — zamena teksta je 20 minuta, ne prepravka dizajna |

## 8. Potvrđene odluke (04.08.2026)

- Booking: **mock UI**, bez baze i mejlova
- Admin: **owner/staff sistem**, vizuelni prikaz obe strane, ništa ne mora realno da radi
- Admin baza koda: **dropz** (ima role), dopuna iz drigic i srdjan
- Assets: radi se sa postojeća 4 foto + 1 video, bez logotipa (privremeni wordmark)
- Profil klinike: **čeka se potvrda** → copy izolovan u `content.ts`

## 9. Još otvoreno

1. Profil: ginekologija+trudnoća (po IG) ili šire estetika? — blokira samo finalni tekst, ne dizajn
2. Koliko lekara stvarno radi i kako se zovu? (za demo izmišljam 4, jasno označena kao demo)
3. Da li demo ide na javni URL ili samo localhost za prezentaciju?
