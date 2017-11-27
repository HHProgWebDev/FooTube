FooTube
=======

## Keyrsla verkefnis
Til þess að setja síðuna upp á þinni tölvu þarftu að hafa git og npm sett upp á tölvunni þinni og keyra eftirfarandi skipanir:

```
git clone git@github.com:HHProgWebDev/FooTube.git
cd FooTube
npm install
npm run dev
```
Eftir það þarftu mögulega að opna `styles.scss` skránna og vista hana einu sinni. Þegar þetta hefur verið framkvæmt á verkefnið að vera uppsett og byrjað að keyra.

## Uppsetning verkefnis
Verkefnið samanstendur af sex möppum og rót.

### Rót
 * `styles.scss` skrá sem að heldur utan um alla stílana í verkefninu og importar aðrar nauðsynlegar stílskrár úr scss möppunni.
 * Allar `.html` skrár síðunnar.
 *  `README.md` skráin sem þú ert að lesa.
 * `videos.json` skrá sem inniheldur upplýsingar um öll myndböndin og alla flokkana.
 * `package.json` skrá sem inniheldur upplýsingar fyrir npm til þess að þýða skrár, linta javascript og scss skrár og keyra þróunarumhverfi verkefnis.

 ### Möppur
 * `img` mappa sem inniheldur myndir fyrir myndbandsspilarann.
 * `videos` mappa sem innheldur myndböndin og samsvarandi poster mynd.
 * `src` mappa sem inniheldur javascript sem notar ECMA2015 staðalinn.
 * `lib` mappa sem inniheldur javascript sem er þýtt með babel frá `src` möppunni.
 * `scss` mappa sem inniheldur þær `.scss` skrár sem að `styles.scss` kallar í.

Scss-inu er skipt niður í einingar eftir hlutverki þess og/eða staðsetningu í verkefni. Þannig er útlit myndbanda í index.html með sér `video.scss` skrá sem að sér um flesta þá stíla sem henni við kemur. Þannig reyndum við að brjóta verkefnið niður í sem flestar heildstæðar einingar.

## Hópur
Nemendurnir sem unnu verkefnið eru:

- Hannes Þór Sveinbjörnsson - hths17@hi.is
- Ragnheiður Ásta Karlsdóttir - rak4@hi.is
