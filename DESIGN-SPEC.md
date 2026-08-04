# Vita Clinic — dizajn spec landinga

Prati `PLAN-DEMO.md`. Ovde su konkretni layouti, tipografija i tajminzi, sekcija po sekcija.
Sve vrednosti su implementabilne, ne "atmosfera".

## Pravila koja važe svuda

**Tempo.** Osnovna jedinica je `--beat: 640ms`. Sve trajanje je 0.5×, 1× ili 1.5× otkucaja.
Nema nasumičnih 300ms/500ms vrednosti — zbog toga sajt deluje komponovano a ne sklepano.

**Easing.** Ulazi `--ease-out-expo` (0.16, 1, 0.3, 1). Izlazi i transformacije stanja
`--ease-in-out-soft`. Nikad `linear` osim za marquee i EKG liniju.

**Stagger.** Reč u naslovu 45ms, red u listi 70ms, kartica u gridu 90ms.

**Trigger.** Sekcija animira na `start: "top 78%"`, jednom (`once: true`).
Ništa se ne re-animira pri povratku naviše — to je najbrži put u jeftin osećaj.

**Kursor.** Nema custom kursora preko celog sajta (dosadno, sporo, loše na tabletu).
Umesto toga: magnetni CTA + slika koja prati kursor samo u sekciji Usluge.

**Boja po sekciji** — ritam svetlo/tamno da scroll ima puls:
hero TAMAN → trust SVETAO → trudnoća TAMAN → usluge SVETAO → lekar SVETAO →
ordinacija TAMAN → iskustva SVETAO → zakazivanje BLUSH → footer TAMAN

**Mobilni.** Ispod 900px: nema pina, nema horizontalnog scrolla, nema parallaxa.
Ostaju reveal i stagger. Cilj je da mobilni bude brz, ne da bude ista predstava.

---

## 0. Preloader

Trajanje 1.5 otkucaja (960ms), ne duže. Drugi put u sesiji se preskače (`sessionStorage`).

- Ekran `--color-ink`, centrirano.
- Zlatna EKG linija (SVG path, `stroke-dasharray` → `dashoffset` 0) crta se levo-desno, 640ms.
- Ispod nje brojač 0→100, tabularne cifre, isti tajming.
- Izlaz: ceo panel ide naviše `clip-path: inset(0 0 100% 0)`, 640ms, expo.
  Hero je već iza njega i ne animira ponovo — deluje kao da se zavesa diže.

Fallback: ako se video ne učita za 2s, preloader svejedno izlazi (nikad ne blokira).

## 1. Hero

Layout: fullbleed video, sadržaj sidren dole-levo, `padding-bottom: 8vh`.
Overlay gradijent odozdo `ink/70 → ink/20` da tekst uvek ima kontrast (WCAG AA na `marble`).

Tipografija: `u-h1`, clamp(3.25rem, 9vw, 10.5rem), Playfair 400, line-height 0.94.
Dve linije: „Od prvog" / „otkucaja" — druga u `gold-soft`, to je jedina zlatna reč na ekranu.

Motion:
- Naslov: split po rečima, svaka u `overflow:hidden` masci, `y: 110% → 0`, 960ms, stagger 45ms.
- Video: `scale 1.08 → 1` kroz 1.5s, plus vrlo spor parallax na scroll (`y: 12%`).
- Eyebrow i lead: fade-up, kreću 320ms posle naslova.
- CTA „Zakažite pregled": magnetan u radijusu 80px, `strength 0.35`, vraća se elastično.
- Scroll cue: tanka vertikalna linija koja pulsira u ritmu otkucaja (scaleY 0→1, 640ms, infinite).

Video pravila: `muted loop playsInline`, `poster` uvek, `preload="metadata"`.
Na mobilnom se video **ne pušta** — ide poster. Štedi ~3MB i bateriju.

## 2. Trust traka

Visina 88px, `marble`, gornja i donja hairline `ink/10`.
Marquee, 40s po krugu, `linear`, pauza na hover. Separator je zlatna tačka 4px.
Duplira se u DOM-u dva puta za beskonačnu petlju. `aria-hidden` na kopiji.

## 3. „Od prvog otkucaja" — horizontalna pinned sekcija

**Ovo je glavni wow. Ako rok gori, ovo se seče prvo (fallback niže).**

Pin na `100vh`, scroll dužine `6 × 100vh`. GSAP ScrollTrigger `pin: true, scrub: 1`.
Track se pomera `x: 0 → -(track.width - vw)`.

Šest kartica: nedelje 6, 12, 20, 28, 36, 40. Svaka:
- ogroman broj nedelje, Playfair, `clamp(6rem, 14vw, 16rem)`, `ink/8` — vodeni žig iza sadržaja
- naslov `u-h3`, tekst `u-lead`, maks 34ch
- kartica širine `clamp(320px, 42vw, 560px)`, razmak 6vw

Kroz celu sekciju prolazi zlatna EKG linija na dnu: `stroke-dashoffset` vezan za isti scrub.
Na svakoj kartici linija napravi jedan otkucaj (peak u SVG path-u) — otud ime sekcije.

Progres indikator gore desno: `06 / 40`, cifre se menjaju na svakoj kartici.

**Fallback (mobilni i ako se seče):** vertikalni stepper, ista sadržina, zlatna linija ide odozgo
nadole kao progress, kartice fade-up sa stagger 90ms.

## 4. Usluge

Ne grid od kartica. Editorial index — šest redova preko cele širine.

Svaki red: broj `01`–`06` (mono, `muted`), naziv `u-h3` Playfair, trajanje desno (`30 min`).
Hairline `ink/10` između redova. Visina reda 116px desktop.

Hover (samo desktop, `pointer: fine`):
- red se podigne `y: -2px`, naziv pređe u `orchid`
- ostali redovi padnu na `opacity: 0.35`, 320ms
- slika 380×480 prati kursor sa `lerp 0.12`, `rotate` prati brzinu miša (maks 6°)
- slika ulazi `clip-path: inset(100% 0 0 0) → inset(0)`, 480ms

Klik ne vodi nigde (demo) → toast „Demo prikaz".

## 5. Lekar / ordinacija

Dve kolone 5/7. Levo portret u `4:5` sa parallaxom (`y: -8%` kroz viewport).
Desno: eyebrow, `u-h2`, dva pasusa, potpis.

Potpis se ispisuje SVG `stroke-dashoffset` animacijom, 1280ms, kreće kad sekcija uđe.

**Ako nema portreta lekara** (trenutno stanje): kolona levo postaje `recepcija.jpg`,
naslov se menja u „Prostor koji smiruje", tekst o ordinaciji. Sekcija ne pada.

## 6. Ordinacija — galerija

Tamna sekcija (`ink`). Četiri fotografije u razbijenom gridu, ne u ravnoj liniji:
```
[ cekaonica  60% ]        [ mural 34% ]
        [ recepcija 40% ] [ enterijer 46% ]
```
Svaka ima svoju parallax brzinu (`-4%`, `+6%`, `-8%`, `+3%`) — dubina bez WebGL-a.

Klik → lightbox preko GSAP Flip: slika fizički odleti iz grida u centar, 640ms.
Zatvaranje `Esc` ili klik van. Fokus se vraća na pokrenutu sliku (a11y).

## 7. Iskustva

Dve trake kartica koje klize u suprotnim smerovima, 60s i 75s.
Kartica: `blush-soft` pozadina, tekst `u-lead` maks 30ch, ime dole u `u-eyebrow`.
Maskiranje ivica `mask-image: linear-gradient` da kartice nestaju umesto da se seku.

Iznad: Google ocena 5.0 sa pet zlatnih zvezdica koje se popune stagger 90ms.

## 8. Zakazivanje (mock)

Pozadina `blush`. Forma u tri koraka, jedan ekran, prelazi klizanjem `x` ±40px + fade.

1. **Usluga** — šest pilula, izbor jedne
2. **Termin** — sedam dana horizontalno, ispod slotovi u gridu; zauzeti su prekriženi
3. **Podaci** — ime, telefon, poruka

Progress: tanka zlatna linija na vrhu forme, širina 33/66/100%.
Submit → success stanje: krug se nacrta pa se u njemu pojavi kvačica, puls u ritmu otkucaja,
tekst „Poslato — javljamo se u roku od 2h". Ništa se realno ne šalje (demo).

Validacija inline, na `blur`, poruka ispod polja, `aria-invalid` postavljen.

## 9. Kontakt i footer

Tamna sekcija. Tri kolone: adresa + mapa (statična slika, link ka Google Maps), radno vreme, kontakt.
Mapa je **slika, ne iframe** — iframe Google Maps košta ~900KB i ubija Lighthouse.

Ispod svega: `VITA CLINIC` preko cele širine, Playfair, `font-size: 22vw`, `ink-soft`.
Reaguje na poziciju kursora vrlo blago (`skewX` maks 2°, `lerp 0.06`).

Sticky mini-CTA: pojavljuje se kad scroll pređe 80vh, nestaje u sekciji 8.
Dole desno, pilula `orchid`, tekst „Zakažite" + telefon ikonica.

---

## Šta ovaj sajt NEĆE imati

Namerno izostavljeno, jer troši sate a ne donosi wow:

- WebGL / shader-e — zrno i maske daju 90% efekta za 5% vremena
- custom kursor preko celog sajta
- page transitions (jednostranični sajt)
- dark mode toggle
- scroll-jacking između sekcija (samo pin na jednoj sekciji, i to sa scrub-om)

## Budžet performansi

| Metrika | Cilj |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| JS bundle (bez fontova) | < 180KB gz |
| Hero video | < 4MB |
| Lighthouse Performance (mobile) | ≥ 85 |

Sve animacije samo `transform` i `opacity`. `will-change` se postavlja pri ulasku u trigger
i skida po završetku. `ScrollTrigger.refresh()` na resize sa debounce 200ms.
