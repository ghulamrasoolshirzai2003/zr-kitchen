import briyaniAyam from '../assets/dishes/briyani-ayam.jpg'
import briyaniDaging from '../assets/dishes/briyani-daging.jpg'
import briyaniAyamTandori from '../assets/dishes/briyani-ayam-tandori.jpg'
import briyaniLambShank from '../assets/dishes/briyani-lamb-shank.jpg'
import pulauKambing from '../assets/dishes/pulau-kambing.jpg'
import pulauAyam from '../assets/dishes/pulau-ayam.jpg'
import pulauDaging from '../assets/dishes/pulau-daging.jpg'
import setTalam from '../assets/dishes/set-talam.jpg'
import ayamKarahi from '../assets/dishes/ayam-karahi.jpg'
import capatiDhal from '../assets/dishes/capati-dhal.jpg'
import capatiAyam from '../assets/dishes/capati-ayam.jpg'
import naanBiasa from '../assets/dishes/naan-biasa.jpg'
import naanGarlic from '../assets/dishes/naan-garlic.jpg'
import naanCheese from '../assets/dishes/naan-cheese.jpg'
import naanCheeseGarlic from '../assets/dishes/naan-cheese-garlic.jpg'
import naanCheeseLeleh from '../assets/dishes/naan-cheese-leleh.jpg'
import naanSpecial from '../assets/dishes/naan-special.jpg'
import ayamTandooriRoti from '../assets/dishes/ayam-tandoori-roti.jpg'
import chapliKebab from '../assets/dishes/chapli-kebab.jpg'
import ngAyam from '../assets/dishes/ng-ayam.jpg'
import ngSeafood from '../assets/dishes/ng-seafood.jpg'
import ngUsa from '../assets/dishes/ng-usa.jpg'
import meeKari from '../assets/dishes/mee-kari.jpg'
import kerabuMegiBiasa from '../assets/dishes/kerabu-megi-biasa.jpg'
import ayamDagingMerah from '../assets/dishes/ayam-daging-merah.jpg'
import supDaging from '../assets/dishes/sup-daging.jpg'
import tomyamSeafood from '../assets/dishes/tomyam-seafood.jpg'
import telurBungkus from '../assets/dishes/telur-bungkus.jpg'
import kambingSemangkuk from '../assets/dishes/kambing-semangkuk.jpg'
import wholeFish from '../assets/dishes/whole-fish.jpg'
import woodFiredPizza from '../assets/dishes/wood-fired-pizza.jpg'
import aboutExterior from '../assets/dishes/about-exterior.jpg'
import aboutTandoorPrep from '../assets/dishes/about-tandoor-prep.jpg'
import tehTarik from '../assets/dishes/teh-tarik.jpg'
import gallary from '../assets/dishes/gallary.jpeg'
import gallary2 from '../assets/dishes/gallary2.jpeg'
import gallary3 from '../assets/dishes/gallary3.jpeg'
import gallary4 from '../assets/dishes/gallary4.jpeg'

const u = (id, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

export const dishPhotos = {
  // ─── Real ZR Kitchen photos ───────────────────────────────────────────────
  'briyani-ayam':         { src: briyaniAyam,       alt: 'Saffron biryani rice topped with roasted bone-in chicken, garnished with star anise, cinnamon and lime' },
  'briyani-daging':       { src: briyaniDaging,     alt: 'Sesame-crusted beef briyani with lettuce, cucumber and onion' },
  'briyani-ayam-tandori': { src: briyaniAyamTandori, alt: 'Tandoori chicken legs over saffron rice with kurma and boiled egg' },
  'briyani-lamb-shank':   { src: briyaniLambShank,  alt: 'A whole braised lamb shank over rice' },
  'pulau-kambing':        { src: pulauKambing,      alt: 'Pulau rice with shredded carrot and raisins, topped with bone-in mutton curry' },
  'pulau-ayam':           { src: pulauAyam,         alt: 'Pulau rice with carrot, raisin, garlic and bone-in chicken' },
  'pulau-daging':         { src: pulauDaging,       alt: 'Pulau rice with black olives, raisins and beef curry chunks' },
  'set-talam':            { src: setTalam,          alt: 'A large mixed platter of briyani rice, lamb shank, beef, chicken, vegetables and curry dips' },
  'ayam-karahi':          { src: ayamKarahi,        alt: 'Bone-in chicken karahi curry with sesame and herb garnish' },
  'capati-dhal':          { src: capatiDhal,        alt: 'Capati flatbread with two curry dipping bowls and green chutney' },
  'capati-ayam':          { src: capatiAyam,        alt: 'Capati flatbread with a chicken curry dipping bowl' },
  'naan-biasa':           { src: naanBiasa,         alt: 'Plain buttery tandoor-baked naan' },
  'naan-garlic':          { src: naanGarlic,        alt: 'Naan topped with herbs and sesame seeds' },
  'naan-cheese':          { src: naanCheese,        alt: 'Cheese naan plates with curry dipping bowls' },
  'naan-cheese-garlic':   { src: naanCheeseGarlic,  alt: 'Naan with melted cheese and garlic, chopped herbs on top' },
  'naan-cheese-leleh':    { src: naanCheeseLeleh,   alt: 'A hand pulling naan apart to reveal long, stretchy melted cheese' },
  'naan-special':         { src: naanSpecial,       alt: 'Herb and nigella-seed naan wedges with green chutney and red curry dip' },
  'ayam-tandoori-roti':   { src: ayamTandooriRoti,  alt: 'Tandoori chicken pieces with lime, onion and cucumber' },
  'chapli-kebab':         { src: chapliKebab,       alt: 'Spiced minced-meat chapli kebab patties with green chillies and naan' },
  'ng-ayam':              { src: ngAyam,            alt: 'Chicken fried rice served with fried chicken and a clear soup' },
  'ng-seafood':           { src: ngSeafood,         alt: 'Wok-fried rice with prawns, topped with a fried egg' },
  'ng-usa':               { src: ngUsa,             alt: 'Fried rice topped with a folded omelette and chilli sauce' },
  'mee-kari':             { src: meeKari,           alt: 'Curry noodle soup with egg, tofu puff and greens' },
  'kerabu-megi-biasa':    { src: kerabuMegiBiasa,   alt: 'Cold tossed maggi noodle salad with chilli and herbs' },
  'ayam-daging-merah':    { src: ayamDagingMerah,   alt: 'Stir-fried chicken with mixed vegetables in a savoury red sauce' },
  'sup-daging':           { src: supDaging,         alt: 'Clear beef soup with cauliflower, carrot and kailan greens' },
  'tomyam-seafood':       { src: tomyamSeafood,     alt: 'Hot and sour tomyam soup with seafood' },
  'telur-bungkus':        { src: telurBungkus,      alt: 'A folded stuffed omelette drizzled with ketchup' },
  'kambing-semangkuk':    { src: kambingSemangkuk,  alt: 'Mutton curry in a bowl, garnished with cilantro and lemon' },
  teh:                    { src: tehTarik,          alt: 'Three cups of milk tea in cup and saucer' },

  // ─── Stock photos — Unsplash (verified search results) ───────────────────
  // Existing verified
  'capati-kambing':       { src: u('photo-1678969406353-ead12b1f258a'), alt: 'A basket of griddle-fried flatbread beside a bowl of curry gravy' },
  'seekh-kebab-naan-board': { src: u('photo-1781332143834-19a40f746cd9'), alt: 'Grilled minced-meat seekh kebab skewer' },
  'kk-seafood':           { src: u('photo-1555126634-323283e090fa'), alt: 'A bowl of rice noodles in savoury broth with seafood' },
  'kerabu-megi-seafood':  { src: u('photo-1584913394604-47399f277ad4'), alt: 'A chilled spicy noodle salad tossed with chilli, lime and herbs' },
  'combo-4in1':           { src: u('photo-1694853651800-3e9b4aa96a42'), alt: 'A tray of fried chicken tenders, nuggets and crinkle-cut fries' },
  'jus-oren':             { src: u('photo-1600271886742-f049cd451bba'), alt: 'A glass of fresh-pressed fruit juice' },
  'bihun-sup':            { src: u('photo-1512003867696-6d5ce6835040'), alt: 'A bowl of beef noodle soup' },
  'kangkung-belacan':     { src: u('photo-1707270686208-5d1fc168dd7b'), alt: 'Stir-fried water spinach with chilli and shrimp paste' },
  'sayur-campur':         { src: u('photo-1628025114288-1693ac3bcac1'), alt: 'A plate of stir-fried mixed vegetables' },
  'popcorn-chicken':      { src: u('photo-1767469576675-0c02a8d66f4c'), alt: 'Crispy bite-sized popcorn chicken' },
  fries:                  { src: u('photo-1630384060421-cb20d0e0649d'), alt: 'A basket of crispy fries' },
  'sup-tulang':           { src: u('photo-1469307517101-0b99d8fb0c33'), alt: 'A bowl of clear bone soup' },
  'telur-mata':           { src: u('photo-1691480184494-d9f822edd4d1'), alt: 'A sunny-side-up fried egg' },
  'tomyam-ayam':          { src: u('photo-1628428798909-75a2d42a557e'), alt: 'A bowl of hot and sour tomyam soup with chicken' },

  // New — Nasi Goreng variants
  'ng-goreng':            { src: u('photo-1603133872878-684f208fb84b'), alt: 'Wok-fried rice with egg and spring onion' },
  'ng-goreng-spicy':      { src: u('photo-1687020836451-41977907509e'), alt: 'Spicy red chilli fried rice' },
  'ng-goreng-udang':      { src: u('photo-1609570324378-ec0c4c9b6ba8'), alt: 'Fried rice with fresh prawns' },

  // New — Noodle dishes
  'kuetiau-gravy':        { src: u('photo-1504669221159-56caf7b07f57'), alt: 'Flat rice noodles in a rich savoury gravy' },

  // New — Roti Arab
  'roti-arab-stock':      { src: u('photo-1584806902439-32dc4c142aee'), alt: 'Round flatbread served alongside a curry dipping bowl' },

  // New — Rice & Chicken
  'nasi-ayam-stock':      { src: u('photo-1569058242252-623df46b5025'), alt: 'Poached chicken on steamed rice with a clear broth and chilli sauce' },
  'ayam-kicap-stock':     { src: u('photo-1602253057119-44d745d9b860'), alt: 'Soy-glazed chicken pieces glistening in a dark sauce' },
  'nasi-putih-stock':     { src: u('photo-1536304929831-ee1ca9d44906'), alt: 'A bowl of steamed white rice' },

  // New — Soup & Vegetables
  'sup-sayur-stock':      { src: u('photo-1547592166-23ac45744acd'), alt: 'A bowl of clear vegetable soup with greens' },
  'kailan-stock':         { src: u('photo-1490474418585-ba9bad8fd0ea'), alt: 'Wok-tossed kailan greens' },

  // New — Eggs
  'telur-dadar-stock':    { src: u('photo-1525351484163-7529414344d8'), alt: 'A golden folded omelette on a plate' },

  // New — Snacks
  'wedges-stock':         { src: u('photo-1580442151529-343f2f6e0e27'), alt: 'Crispy golden potato wedges' },
  'nuget-stock':          { src: u('photo-1619881590738-a111d176d906'), alt: 'Crispy golden chicken nuggets on a plate' },
  'enoki-stock':          { src: u('photo-1604908176997-125f25cc6f3d'), alt: 'Enoki mushroom skewers with melted cheese' },

  // New — Drinks
  'kopi-stock':           { src: u('photo-1497935586351-b67a49e012bf'), alt: 'A cup of hot Malaysian white coffee' },
  'kopi-o-stock':         { src: u('photo-1512568400610-62da28bc8a13'), alt: 'A cup of strong black coffee' },
  'sirap-stock':          { src: u('photo-1601390395693-364c0e22031a'), alt: 'A tall glass of chilled rose syrup drink over ice' },
  'milo-stock':           { src: u('photo-1562878424-0da674456d33'), alt: 'A glass of iced chocolate malt drink' },
  'limau-stock':          { src: u('photo-1619032580077-6160b89e2398'), alt: 'A glass of iced lime juice' },
  'teh-hijau-stock':      { src: u('photo-1556679343-c7306c1976bc'), alt: 'A glass of green tea' },
  'barli-stock':          { src: u('photo-1614887065001-06c958a7cddd'), alt: 'A glass of cold barley water drink' },
  'juice-epal':           { src: u('photo-1727989815707-1b9e8f376775'), alt: 'A glass of fresh clear apple juice' },
  'juice-tembikai':       { src: u('photo-1683531658992-b78c311900a3'), alt: 'A glass of fresh red watermelon juice' },
  'juice-carrot':         { src: u('photo-1577680716097-9a565ddc2007'), alt: 'A glass of fresh orange carrot juice' },

  // ─── Unique photos — every item that previously shared ───────────────────

  // Biryani & Pulau variants
  'briyani-kambing-photo':     { src: u('photo-1631515243349-e0cb75fb8d3a'), alt: 'Lamb biryani rice with slow-braised lamb' },
  'pulau-ayam-tandori-photo':  { src: u('photo-1757715377796-2a368ec7499e'), alt: 'Tandoori chicken over fragrant pulau rice' },
  'pulau-lamb-shank-photo':    { src: u('photo-1634324092526-91f5e878b72f'), alt: 'Braised lamb shank resting on pulau rice' },

  // Karahi variants
  'daging-karahi-photo':       { src: u('photo-1604908177453-7462950a6a3b'), alt: 'Beef karahi curry simmering in a wok' },
  'kambing-karahi-photo':      { src: u('photo-1708782341987-907388a22b40'), alt: 'Mutton karahi curry with tomato-ginger gravy' },

  // Kuetiau Kungfu / Ladna variants
  'kk-daging-photo':           { src: u('photo-1659948754009-7cd47619a550'), alt: 'Flat rice noodles with beef in rich savoury gravy' },
  'kk-udang-sotong-photo':     { src: u('photo-1623302046309-e3a02006df80'), alt: 'Kuetiau noodles with prawn and squid in thick gravy' },
  'kk-campur-photo':           { src: u('photo-1619371042685-827b1c646923'), alt: 'Mixed meat kuetiau noodles in savoury gravy' },

  // Mee / Bihun / Kuetiau soup variants
  'mbk-ayam-photo':            { src: u('photo-1511910849309-0dffb8785146'), alt: 'Chicken noodle soup bowl' },
  'mbk-daging-photo':          { src: u('photo-1631709497146-a239ef373cf1'), alt: 'Beef noodle soup with tender meat slices' },
  'mbk-udang-sotong-photo':    { src: u('photo-1569718212165-3a8278d5f624'), alt: 'Prawn noodle soup with fresh prawns' },
  'mbk-seafood-photo':         { src: u('photo-1558985212-324add95595a'), alt: 'Seafood noodle soup with mixed seafood' },
  'mbk-campur-photo':          { src: u('photo-1628430043175-0e8820df47c3'), alt: 'Mixed noodle soup with assorted proteins' },

  // Capati & Roti Arab variants
  'capati-daging-photo':       { src: u('photo-1708782343717-be4ea260249a'), alt: 'Capati flatbread with a beef curry dipping bowl' },
  'arab-daging-photo':         { src: u('photo-1664155941389-9adf7c1e07b3'), alt: 'Arabic flatbread served with beef curry' },
  'arab-kambing-photo':        { src: u('photo-1565557623262-b51c2513a641'), alt: 'Arabic flatbread with mutton curry on the side' },

  // Naan specialities & Kebab variants
  'naan-kema-photo':           { src: u('photo-1638872934635-34e7dbe08247'), alt: 'Keema stuffed naan with spiced minced meat' },
  'naan-arab-photo':           { src: u('photo-1710444448930-85ce405eb20f'), alt: 'Arabic-style naan, soft and freshly baked' },
  'set-kebab-photo':           { src: u('photo-1653982960203-c8361d7bed96'), alt: 'Kebab set plate with roti and daging' },
  'kebab-telur-photo':         { src: u('photo-1668283653825-37b80f055b05'), alt: 'Special kebab served with a fried egg' },

  // Nasi Goreng variants
  'ng-biasa-photo':            { src: u('photo-1540100716001-4b432820e37f'), alt: 'Plain egg fried rice, simply wok-tossed' },
  'ng-cina-photo':             { src: u('photo-1551326844-4df70f78d0e9'), alt: 'Chinese-style fried rice with soy sauce' },
  'ng-pattaya-photo':          { src: u('photo-1664717698774-84f62382613b'), alt: 'Fried rice wrapped in a folded omelette' },
  'ng-kampung-photo':          { src: u('photo-1647093953000-9065ed6f85ef'), alt: 'Kampung-style fried rice with anchovies and belacan' },
  'ng-ikan-masin-photo':       { src: u('photo-1637759079728-3f900db7a782'), alt: 'Fried rice tossed with salted fish' },
  'ng-sotong-photo':           { src: u('photo-1630914441929-0d8ea69f95e6'), alt: 'Squid fried rice with wok hei' },
  'ng-daging-photo':           { src: u('photo-1705088293300-8fc8c7be90e2'), alt: 'Beef fried rice wok-tossed with onion' },
  'ng-tom-yam-photo':          { src: u('photo-1627703737110-4b6c2633cc16'), alt: 'Tom yam fried rice, spicy and aromatic' },
  'ng-ayam-daging-photo':      { src: u('photo-1715854501867-5533189a5e71'), alt: 'Chicken and beef fried rice with merah or paprik sauce' },
  'ng-udang-sotong-photo':     { src: u('photo-1612755637313-9517f17d84b5'), alt: 'Prawn and squid fried rice, wok-tossed' },

  // Nasi & Lauk
  'nasi-bujang-photo':         { src: u('photo-1536304993881-ff6e9eefa2a6'), alt: 'Single rice plate with side dishes' },

  // Tomyam variants
  'tomyam-daging-photo':       { src: u('photo-1571809839227-b2ac3d261257'), alt: 'Beef tomyam spicy lemongrass soup' },
  'tomyam-udang-sotong-photo': { src: u('photo-1631030576925-18b2ca443738'), alt: 'Prawn and squid tomyam soup' },
  'tomyam-campur-photo':       { src: u('photo-1720786913374-d9c9da9f21a3'), alt: 'Mixed tomyam spicy soup' },

  // Telur & Combo
  'telur-bistik-photo':        { src: u('photo-1634564381313-52941f3c7512'), alt: 'Egg cooked bistik-style in rich brown gravy' },
  'combo-chicken-2in1-photo':  { src: u('photo-1644882725268-30f1cd6c36ca'), alt: 'Fried chicken and fries combo' },

  // Tea variants
  'teh-o-photo':               { src: u('photo-1646288401762-632357729f59'), alt: 'Plain black tea, hot, without milk' },
  'teh-o-limau-photo':         { src: u('photo-1555949366-819808d99159'), alt: 'Iced black tea with a slice of fresh lime' },
  'teh-o-laici-photo':         { src: u('photo-1599767431130-41b1c51d9a7b'), alt: 'Iced black tea with lychee syrup' },

  // Nescafe variants
  'nescafe-photo':             { src: u('photo-1584286595398-a59f21d313f5'), alt: 'Iced Nescafe with condensed milk in a glass' },
  'nescafe-o-photo':           { src: u('photo-1514432324607-a09d9b4aefdd'), alt: 'Black Nescafe, no milk' },

  // Sirap variants
  'sirap-bandung-photo':       { src: u('photo-1591014312135-723311d1aebb'), alt: 'Pink sirap bandung — rose milk drink over ice' },
  'sirap-limau-photo':         { src: u('photo-1592483648228-b35146a4330c'), alt: 'Rose syrup iced drink with lime' },
  'sirap-laici-photo':         { src: u('photo-1786783506790-180cd60f83ed'), alt: 'Rose syrup lychee drink over crushed ice' },

  // Other cold drinks
  'laici-photo':               { src: u('photo-1629201951991-97db4f24c61c'), alt: 'A cold glass of lychee juice' },
  'blackcurrant-photo':        { src: u('photo-1542518392-13317b1ee2a2'), alt: 'Dark purple blackcurrant juice drink' },
  'mango-photo':               { src: u('photo-1546173159-315724a31696'), alt: 'A chilled glass of tropical mango drink' },
  'jagung-photo':              { src: u('photo-1741242950435-080c7e981de0'), alt: 'Sweet corn cold drink in a glass' },

  // Milo / Horlicks / Neslo
  'milo-o-photo':              { src: u('photo-1661529548674-8dae0330fe04'), alt: 'Milo iced — chocolate malt drink without milk' },
  'horlicks-photo':            { src: u('photo-1662528567037-42551f98dfe9'), alt: 'A warm cup of Horlicks malted milk drink' },
  'neslo-photo':               { src: u('photo-1627998691167-4dab0dfcae9f'), alt: 'Neslo — a blend of Nescafe and Milo' },

  // Lime / Asam variants
  'limau-asam-boi-photo':      { src: u('photo-1651993737174-6890c1daef5b'), alt: 'Iced lime drink with salted plum asam boi' },
  'asam-boi-photo':            { src: u('photo-1760709880294-e7d46790a86f'), alt: 'Salted plum asam boi cold iced drink' },
  'asam-photo':                { src: u('photo-1613518972312-267f92ae4aa2'), alt: 'Tangy tamarind asam drink' },

  // Packet drinks & Others
  'air-kosong-photo':          { src: u('photo-1534616042650-80f5c9b61f09'), alt: 'A plain cold glass of water' },
  'air-susu-photo':            { src: u('photo-1550583724-b2692b85b150'), alt: 'A glass of fresh cold milk' },
  'barbican-photo':            { src: u('photo-1701438841298-676390b468b8'), alt: 'Chilled non-alcoholic malt drink bottle' },
  'jus-epal-asam-boi-photo':   { src: u('photo-1640213505284-21352ee0d76b'), alt: 'Apple juice with salted plum asam boi' },

  // Last two unique photos to eliminate all duplicates
  'pulau-kosong-photo':        { src: u('photo-1516684732162-798a0062be99'), alt: 'A bowl of plain steamed basmati or pulau rice' },
  'oren-sunquick-photo':       { src: u('photo-1613478223719-2ab802602423'), alt: 'A glass of orange squash Sunquick cold drink' },
}

export const unlistedDishPhotos = {
  'whole-fish':      { src: wholeFish,      alt: 'Whole fried fish topped with a sweet chilli and mango salsa' },
  'wood-fired-pizza': { src: woodFiredPizza, alt: 'A BBQ chicken pizza with melted cheese, onion and mushroom' },
}

export const ambiencePhotos = {
  hero:              { src: u('photo-1583354608715-177553a4035e', 2400), alt: 'Moody, warmly lit fine-dining restaurant interior' },
  statement:         { src: u('photo-1600565193348-f74bd3c7ccdf', 2400), alt: 'A chef tending a live tandoor flame' },
  aboutExterior:     { src: aboutExterior,   alt: "A briyani platter on the table at ZR Kitchen, with the restaurant's outdoor seating visible behind" },
  aboutTandoorPrep:  { src: aboutTandoorPrep, alt: 'A rack of whole tandoori chickens roasting on skewers' },
  aboutNaanBasket:   { src: u('photo-1553683374-242e9f9567f1'), alt: 'A basket of fresh-baked naan bread' },
  aboutSpices:       { src: u('photo-1663325265966-0d17de3e85c5'), alt: 'Whole spices scattered on a dark surface' },
  galleryInterior2:  { src: gallary,  alt: 'Fried fish served with steamed rice, sambal and fresh ulam' },
  galleryCandle:     { src: gallary2, alt: 'Whole fried fish with steamed rice, sambal and curry' },
  galleryNaanBasket2: { src: gallary3, alt: 'Whole prawns in rich spicy sambal sauce with steamed rice' },
  gallerySpices2:    { src: gallary4, alt: 'Chilled Malaysian dessert with sago pearls, lychee and peanuts' },
  galleryTandoor2:   { src: u('photo-1670819916552-67698b1c86ae'), alt: 'Flames inside a clay tandoor oven' },
}
