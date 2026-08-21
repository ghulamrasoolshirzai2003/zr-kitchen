/**
 * ZR Kitchen — menu data, transcribed from physical menu board photos.
 *
 * Every item name, variant note, and price below is copied exactly as printed.
 * Short one-line "description" copy on signature items is original site copy
 * written for this build (the physical boards print names + prices only, no
 * descriptions) — edit freely in `signature: true` items below.
 *
 * Consolidation notes (no prices/items invented, only how boards were grouped
 * into site nav tabs):
 * - "Nasi Briyani/Pulau", "Set Talam" and "Ayam Salan" appeared on one board
 *   titled "NASI BRIYANI / PULAU & AYAM SALAN" — kept as one tab, three
 *   subsections, matching the board's own title.
 * - "Roti Naan Kema / Roti Naan Arab / Roti Naan Special / Seekh Kebab" (RM12
 *   / RM5 / RM12 / RM8) appeared on a separate promo board with no section
 *   title of its own. Folded into the "Masakan Aneka Roti" tab as a fourth
 *   subsection "Roti Naan Specialities" since it's the same roti/naan/kebab
 *   family — these are ADDITIONAL items, not price conflicts, with the
 *   existing "Roti Naan" subsection (different item names: Biasa, Cheese,
 *   Cheese Garlic, Garlic, Cheese Leleh, Ayam Tandoori).
 * - "Snacks", "Kerabu Megi", "Combos" shared one board (fried-chicken/fries
 *   quick-bites) — kept together as one tab, three subsections.
 * - "Nasi & Lauk", "Tomyam", "Sup", "Sayur", "Telur" shared one board with no
 *   umbrella title — each kept as its own tab since each is a printed
 *   section header in its own right.
 *
 * TODO(owner): the "Nasi & Lauk / Tomyam / Sup / Sayur / Telur" board footer
 * reads "21 PILIHAN" (21 options) but only 19 line items are printed
 * (4+5+3+3+4). Left as-is rather than guessing at 2 missing items — please
 * confirm if anything was cropped out of the photo.
 *
 * TODO(owner): "Jus Minuman" (fruit juices) on the drinks board is printed
 * with both a Panas (hot) and Sejuk (cold) price column, which is unusual for
 * juice. Transcribed exactly as printed — confirm hot juice is intentional.
 */

export const restaurantInfo = {
  name: 'ZR Kitchen',
  tagline: 'Flavor That Stays.',
  ownerContact: 'Izazkhan',
  phone: '+60 16-883 5414',
  phoneOrders: '013-520 2651',
  email: 'izazkhan01688@gmail.com',
  address: {
    line1: 'Lot 133, Jalan Kangar Jaya, Kampung Seriab',
    line2: '01000 Kangar, Perlis, Malaysia',
    mapUrl: 'https://maps.app.goo.gl/9Gzk8iaJduGzBene8',
    lat: 6.4414,
    lng: 100.1986,
  },
  hours: [
    { days: 'Monday', time: '1:30 PM – 12:30 AM' },
    { days: 'Tuesday – Saturday', time: '1:30 PM – 12:00 AM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  closedDay: 0,
  hoursNote: 'Hot kitchen service (masakan panas) begins 4:00 PM daily.',
  googleReviewUrl: 'https://maps.app.goo.gl/9Gzk8iaJduGzBene8',
  social: {
    instagram: 'https://www.instagram.com/ijaz_sagar_kkkkkkk?igsh=MXE4cWxocHBzdWhiNg%3D%3D&utm_source=qr',
    facebook: 'https://www.facebook.com/share/19VbVqHNz1/?mibextid=wwXIfr',
    tiktok: 'https://www.tiktok.com/@zr_kitchenperlis001000?_r=1&_t=ZS-98jlpJhgSI8',
  },
  delivery: {
    foodpanda: 'https://www.foodpanda.my/restaurant/kbav',
    grabfood: 'https://r.grab.com/g/6-20260822_034346_7D357A75373446EFA9F5BC72D6588BCB_MEXMPS-1-C4CCDAMKKB5XJE',
  },
}

export const menu = [
  {
    id: 'briyani',
    name: 'Nasi Briyani, Pulau & Ayam Salan',
    intro: 'Slow-cooked basmati, tandoor-roasted meats, and rich karahi curries.',
    subsections: [
      {
        id: 'briyani-pulau',
        name: 'Nasi Briyani / Pulau',
        items: [
          { id: 'briyani-ayam', name: 'Nasi Briyani Ayam', price: 'RM 15.00', photo: 'briyani-ayam', signature: true, description: 'Fragrant basmati layered with slow-braised bone-in chicken.' },
          { id: 'briyani-daging', name: 'Nasi Briyani Daging', price: 'RM 17.00', photo: 'briyani-daging', signature: true, description: 'Saffron rice with tender braised beef.' },
          { id: 'briyani-kambing', name: 'Nasi Briyani Kambing', price: 'RM 20.00', photo: 'briyani-kambing-photo', description: 'Slow-cooked basmati rice with tender braised mutton and warm whole spices.' },
          { id: 'briyani-ayam-tandori', name: 'Nasi Briyani Ayam Tandori', price: 'RM 17.00', photo: 'briyani-ayam-tandori', signature: true, description: 'Char-grilled tandoori chicken over saffron rice with kurma and boiled egg.' },
          { id: 'briyani-lamb-shank', name: 'Nasi Briyani Lamb Shank', price: 'RM 40.00', photo: 'briyani-lamb-shank', signature: true, description: 'Whole braised lamb shank over saffron rice, carrot and raisins.' },
          { id: 'briyani-pulau-kosong', name: 'Nasi Briyani / Pulau Kosong', price: 'RM 5.00', note: 'Plain rice', photo: 'pulau-kosong-photo', description: 'Plain fragrant basmati or pulau rice, served on its own.' },
          { id: 'pulau-ayam', name: 'Nasi Pulau Ayam', price: 'RM 15.00', photo: 'pulau-ayam', signature: true, description: 'Pulau rice with carrot, raisin, garlic and bone-in chicken.' },
          { id: 'pulau-daging', name: 'Nasi Pulau Daging', price: 'RM 17.00', photo: 'pulau-daging', signature: true, description: 'Pulau rice with beef curry chunks, black olives and raisins.' },
          { id: 'pulau-kambing', name: 'Nasi Pulau Kambing', price: 'RM 20.00', photo: 'pulau-kambing', signature: true, description: 'Fragrant pulau rice with mutton, shredded carrot and raisins.' },
          { id: 'pulau-ayam-tandori', name: 'Nasi Pulau Ayam Tandori', price: 'RM 17.00', photo: 'pulau-ayam-tandori-photo', description: 'Fragrant pulau rice topped with tandoor-grilled chicken, carrot and raisins.' },
          { id: 'pulau-lamb-shank', name: 'Nasi Pulau Lamb Shank', price: 'RM 40.00', photo: 'pulau-lamb-shank-photo', description: 'Whole braised lamb shank resting on fragrant pulau rice with raisins.' },
        ],
      },
      {
        id: 'set-talam',
        name: 'Set Talam',
        items: [
          {
            id: 'set-talam',
            name: 'Set Talam',
            price: 'RM 65.00',
            signature: true,
            photo: 'set-talam',
            description: 'The whole table: briyani/pulau, lamb shank, beef, chicken, vegetables, mint gravy and curry.',
            note: 'Includes Nasi Briyani/Pulau, Lamb Shank, Daging, Ayam, Sayur, Kuah Pudina, Kari',
          },
        ],
      },
      {
        id: 'ayam-salan',
        name: 'Ayam Salan (Karahi)',
        note: 'Masa Penyediaan: 20 Minit (20-minute prep time)',
        items: [
          { id: 'ayam-karahi', name: 'Ayam Karahi', price: 'RM 25.00', note: '2–5 Orang', photo: 'ayam-karahi', signature: true, description: 'Wok-tossed chicken karahi in a rich tomato-ginger gravy.' },
          { id: 'daging-karahi', name: 'Daging Karahi', price: 'RM 28.00', note: '2–5 Orang', photo: 'daging-karahi-photo', description: 'Tender beef chunks wok-tossed in a bold tomato-ginger karahi gravy.' },
          { id: 'kambing-karahi', name: 'Kambing Karahi', price: 'RM 35.00', note: '2–5 Orang', photo: 'kambing-karahi-photo', description: 'Mutton on the bone simmered in a rich, spiced karahi curry.' },
        ],
      },
    ],
  },
  {
    id: 'berkuah',
    name: 'Aneka Masakan Berkuah',
    intro: 'Noodle soups and stir-fries, wok-tossed to order.',
    subsections: [
      {
        id: 'kuetiau-kungfu',
        name: 'Kuetiau Kungfu / Ladna',
        items: [
          { id: 'kk-ayam', name: 'Ayam', price: 'RM 8.00', photo: 'kuetiau-gravy', description: 'Flat rice noodles in a savoury chicken gravy, wok-tossed to order.' },
          { id: 'kk-daging', name: 'Daging', price: 'RM 9.00', photo: 'kk-daging-photo', description: 'Silky flat rice noodles in a rich, hearty beef gravy.' },
          { id: 'kk-udang-sotong', name: 'Udang @ Sotong', price: 'RM 10.00', photo: 'kk-udang-sotong-photo', description: 'Flat rice noodles with fresh prawn or squid in a thick savoury gravy.' },
          { id: 'kk-seafood', name: 'Seafood', price: 'RM 12.00', photo: 'kk-seafood', signature: true, description: 'Silky rice noodles in a savory gravy with mixed seafood.' },
          { id: 'kk-campur', name: 'Campur', price: 'RM 15.00', photo: 'kk-campur-photo', description: 'Flat rice noodles with a generous mix of meats in a rich savoury gravy.' },
        ],
      },
      {
        id: 'mee-bihun-kuetiau',
        name: 'Mee / Bihun / Kuetiau',
        note: 'Kuah / Hailam / Tom Yam — one price for all noodle types and styles',
        items: [
          { id: 'mbk-ayam', name: 'Ayam', price: 'RM 8.00', photo: 'mbk-ayam-photo', description: 'Your choice of noodle in a light chicken broth — kuah, hailam or tom yam style.' },
          { id: 'mbk-daging', name: 'Daging', price: 'RM 9.00', photo: 'mbk-daging-photo', description: 'Your choice of noodle in a rich beef broth — kuah, hailam or tom yam style.' },
          { id: 'mbk-udang-sotong', name: 'Udang @ Sotong', price: 'RM 10.00', photo: 'mbk-udang-sotong-photo', description: 'Your choice of noodle with prawn or squid in a fragrant broth.' },
          { id: 'mbk-seafood', name: 'Seafood', price: 'RM 12.00', photo: 'mbk-seafood-photo', description: 'Your choice of noodle with mixed seafood in a full-flavoured broth.' },
          { id: 'mbk-campur', name: 'Campur', price: 'RM 15.00', photo: 'mbk-campur-photo', description: 'Your choice of noodle with a generous mix of meats and seafood.' },
        ],
      },
    ],
  },
  {
    id: 'roti',
    name: 'Masakan Aneka Roti',
    intro: 'Hand-stretched capati, roti arab and tandoor naan, baked to order.',
    subsections: [
      {
        id: 'capati',
        name: 'Capati',
        items: [
          { id: 'capati-dhal', name: 'Capati Kuah Dhal', price: 'RM 4.00', photo: 'capati-dhal', signature: true, description: 'Griddle-fried capati with lentil dhal curry and green chutney.' },
          { id: 'capati-ayam', name: 'Capati Kuah Ayam', price: 'RM 5.00', photo: 'capati-ayam', signature: true, description: 'Griddle-fried capati served with a rich chicken curry.' },
          { id: 'capati-daging', name: 'Capati Kuah Daging', price: 'RM 6.00', photo: 'capati-daging-photo', description: 'Griddle-fried capati paired with a slow-braised beef curry.' },
          { id: 'capati-kambing', name: 'Capati Kuah Kambing', price: 'RM 7.00', photo: 'capati-kambing', signature: true, description: 'Griddle-fried capati served with a rich mutton gravy and mint chutney.' },
        ],
      },
      {
        id: 'roti-arab',
        name: 'Roti Arab',
        items: [
          { id: 'arab-ayam', name: 'Roti Arab Kuah Ayam', price: 'RM 4.00', photo: 'roti-arab-stock', description: 'Thin, soft Arabic flatbread served with a mild chicken curry for dipping.' },
          { id: 'arab-daging', name: 'Roti Arab Kuah Daging', price: 'RM 5.00', photo: 'arab-daging-photo', description: 'Thin Arabic flatbread paired with a slow-cooked beef curry.' },
          { id: 'arab-kambing', name: 'Roti Arab Kuah Kambing', price: 'RM 6.00', photo: 'arab-kambing-photo', description: 'Thin Arabic flatbread with a fragrant mutton curry on the side.' },
        ],
      },
      {
        id: 'kambing',
        name: 'Kambing',
        items: [
          { id: 'kambing-semangkuk', name: 'Semangkuk', price: 'RM 10.00', note: 'Mutton curry, served by the bowl', photo: 'kambing-semangkuk', signature: true, description: 'Slow-braised mutton in a rich red gravy, garnished with cilantro and lemon.' },
        ],
      },
      {
        id: 'roti-naan',
        name: 'Roti Naan',
        items: [
          { id: 'naan-biasa', name: 'Roti Naan Biasa', price: 'RM 3.00', photo: 'naan-biasa', signature: true, description: 'Plain, buttery tandoor-baked naan.' },
          { id: 'naan-cheese', name: 'Roti Naan Cheese', price: 'RM 5.00', photo: 'naan-cheese', signature: true, description: 'Naan baked with a layer of melted cheese.' },
          { id: 'naan-cheese-garlic', name: 'Roti Naan Cheese Garlic', price: 'RM 7.00', photo: 'naan-cheese-garlic', signature: true, description: 'Cheese naan finished with garlic and chopped herbs.' },
          { id: 'naan-garlic', name: 'Roti Naan Garlic', price: 'RM 5.00', photo: 'naan-garlic', signature: true, description: 'Naan brushed with garlic butter and fresh herbs, straight from the tandoor.' },
          { id: 'naan-cheese-leleh', name: 'Roti Naan Cheese Leleh', note: 'Cheese Mozarella', price: 'RM 10.00', photo: 'naan-cheese-leleh', signature: true, description: 'Tandoor-baked naan pulled apart to reveal melted mozzarella.' },
          { id: 'ayam-tandoori-roti', name: 'Ayam Tandoori', price: 'RM 10.00', photo: 'ayam-tandoori-roti', signature: true, description: 'Char-grilled chicken marinated in yoghurt and tandoori spice.' },
        ],
      },
      {
        id: 'roti-naan-specialities',
        name: 'Roti Naan Specialities',
        items: [
          { id: 'naan-kema', name: 'Roti Naan Kema', price: 'RM 12.00', note: 'Spiced minced-meat naan', photo: 'naan-kema-photo', description: 'Tandoor-baked naan stuffed with spiced minced meat and fresh herbs.' },
          { id: 'naan-arab', name: 'Roti Naan Arab', price: 'RM 5.00', photo: 'naan-arab-photo', description: 'A flat, lightly baked Arabic-style naan — soft, slightly chewy and simple.' },
          { id: 'naan-special', name: 'Roti Naan Special', price: 'RM 12.00', photo: 'naan-special', signature: true, description: 'Herb and nigella-seed naan wedges with green chutney and red curry dip.' },
          { id: 'seekh-kebab-naan-board', name: 'Seekh Kebab', price: 'RM 8.00', photo: 'seekh-kebab-naan-board', signature: true, description: 'Char-grilled minced-lamb skewer with a turmeric dip and pickled onion.' },
        ],
      },
      {
        id: 'kebab',
        name: 'Kebab',
        items: [
          { id: 'set-kebab', name: 'Set Kebab', note: 'Roti + Daging', price: 'RM 10.00', photo: 'set-kebab-photo', description: 'Grilled kebab meat served with roti and a savoury dipping sauce.' },
          { id: 'kebab-special-telur', name: 'Kebab Special + Telur', price: 'RM 8.00', photo: 'kebab-telur-photo', description: 'A special kebab topped with a fried egg for extra richness.' },
          { id: 'chapli-kebab', name: 'Chapli Kebab', price: 'RM 7.00', photo: 'chapli-kebab', signature: true, description: 'Spiced, hand-pressed minced patties, pan-seared with fresh chillies.' },
        ],
      },
    ],
  },
  {
    id: 'nasi-goreng',
    name: 'Aneka Nasi Goreng',
    intro: 'Wok-fried rice, 15 ways.',
    subsections: [
      {
        id: 'nasi-goreng-all',
        name: 'Nasi Goreng',
        items: [
          { id: 'ng-biasa', name: 'Nasi Goreng Biasa', price: 'RM 7.00', photo: 'ng-biasa-photo', description: 'Classic wok-fried rice with egg, light soy and aromatics.' },
          { id: 'ng-cina', name: 'Nasi Goreng Cina', price: 'RM 7.00', photo: 'ng-cina-photo', description: 'Chinese-style fried rice seasoned with soy sauce and plenty of wok hei.' },
          { id: 'ng-cili-padi', name: 'Nasi Goreng Cili Padi', price: 'RM 8.00', photo: 'ng-goreng-spicy', description: "Fiery bird's-eye chilli fried rice — for those who like it seriously hot." },
          { id: 'ng-kampung', name: 'Nasi Goreng Kampung', price: 'RM 8.00', photo: 'ng-kampung-photo', description: 'Rustic village-style fried rice with dried anchovies, belacan and greens.' },
          { id: 'ng-ikan-masin', name: 'Nasi Goreng Ikan Masin', price: 'RM 8.00', photo: 'ng-ikan-masin-photo', description: 'Wok-fried rice tossed with salty, aromatic salted fish.' },
          { id: 'ng-pattaya', name: 'Nasi Goreng Pattaya', price: 'RM 8.00', photo: 'ng-pattaya-photo', description: 'Fried rice folded inside a golden omelette parcel, drizzled with chilli sauce.' },
          { id: 'ng-udang', name: 'Nasi Goreng Udang', price: 'RM 9.00', photo: 'ng-goreng-udang', description: 'Wok-fried rice loaded with fresh whole prawns.' },
          { id: 'ng-sotong', name: 'Nasi Goreng Sotong', price: 'RM 9.00', photo: 'ng-sotong-photo', description: 'Fried rice tossed with tender squid rings and strong wok hei.' },
          { id: 'ng-seafood', name: 'Nasi Goreng Seafood', price: 'RM 10.00', photo: 'ng-seafood', signature: true, description: 'Wok-fried rice with prawns, topped with a fried egg.' },
          { id: 'ng-daging', name: 'Nasi Goreng Daging', price: 'RM 8.00', photo: 'ng-daging-photo', description: 'Savoury fried rice with wok-tossed sliced beef.' },
          { id: 'ng-ayam', name: 'Nasi Goreng Ayam', price: 'RM 9.00', photo: 'ng-ayam', signature: true, description: 'Chicken fried rice served with fried chicken and a clear soup.' },
          { id: 'ng-tom-yam', name: 'Nasi Goreng Tom Yam', price: 'RM 9.00', photo: 'ng-tom-yam-photo', description: 'Fried rice with lemongrass, lime leaf and a bold tom yam punch.' },
          { id: 'ng-ayam-daging', name: 'Nasi Goreng Ayam/Daging', note: 'Merah, Paprik, Kunyit', price: 'RM 10.00', photo: 'ng-ayam-daging-photo', description: 'Fried rice with chicken or beef, available merah, paprik or kunyit style.' },
          { id: 'ng-udang-sotong', name: 'Nasi Goreng Udang/Sotong', note: 'Merah, Paprik, Kunyit, Tom Yam', price: 'RM 12.00', photo: 'ng-udang-sotong-photo', description: 'Prawn and squid fried rice — merah, paprik, kunyit or tom yam style.' },
          { id: 'ng-usa', name: 'Nasi Goreng USA', note: 'Udang + Sotong + Ayam', price: 'RM 13.00', photo: 'ng-usa', signature: true, description: 'The works — prawn, squid and chicken wok-fried with rice, topped with a folded omelette.' },
        ],
      },
    ],
  },
  {
    id: 'nasi-lauk',
    name: 'Nasi & Lauk',
    intro: 'Steamed rice and everyday side dishes.',
    subsections: [
      {
        id: 'nasi-lauk-items',
        name: 'Nasi & Lauk',
        items: [
          { id: 'nasi-putih', name: 'Nasi Putih', price: 'RM 2.50', note: 'Steamed white rice', photo: 'nasi-putih-stock', description: 'Plain steamed white rice — the perfect base for any lauk.' },
          { id: 'ayam-daging-merah', name: 'Ayam @ Daging', note: 'Merah / Paprik / Kunyit', price: 'RM 8.00', photo: 'ayam-daging-merah', signature: true, description: 'Wok-tossed chicken with mixed vegetables in a savoury red gravy.' },
          { id: 'nasi-bujang', name: 'Nasi Bujang', price: 'RM 6.00', photo: 'nasi-bujang-photo', description: 'A simple solo rice plate with lauk of the day — the everyday Malaysian meal.' },
          { id: 'ayam-kicap', name: 'Ayam Kicap', price: 'RM 8.00', photo: 'ayam-kicap-stock', description: 'Braised chicken in a glossy, savoury-sweet soy and ginger sauce.' },
        ],
      },
    ],
  },
  {
    id: 'tomyam',
    name: 'Tomyam',
    intro: 'Hot and sour Thai-style soup.',
    subsections: [
      {
        id: 'tomyam-items',
        name: 'Tomyam',
        items: [
          { id: 'tomyam-ayam', name: 'Tomyam Ayam', price: 'RM 8.00', photo: 'tomyam-ayam', signature: true, description: 'Hot and sour tomyam broth with chicken.' },
          { id: 'tomyam-daging', name: 'Tomyam Daging', price: 'RM 9.00', photo: 'tomyam-daging-photo', description: 'Spicy lemongrass broth with tender beef — hot, sour and full of depth.' },
          { id: 'tomyam-udang-sotong', name: 'Tomyam Udang @ Sotong', price: 'RM 10.00', photo: 'tomyam-udang-sotong-photo', description: 'Classic tomyam with plump prawns or squid, bold and aromatic.' },
          { id: 'tomyam-seafood', name: 'Tomyam Seafood', price: 'RM 12.00', photo: 'tomyam-seafood', signature: true, description: 'Lemongrass-scented broth, chilli-lime heat and mixed seafood.' },
          { id: 'tomyam-campur', name: 'Tomyam Campur', price: 'RM 15.00', photo: 'tomyam-campur-photo', description: 'Tomyam with a generous mix of meats and seafood — the most complete bowl.' },
        ],
      },
    ],
  },
  {
    id: 'sup',
    name: 'Sup',
    intro: 'Slow-simmered broths.',
    subsections: [
      {
        id: 'sup-items',
        name: 'Sup',
        items: [
          { id: 'sup-daging', name: 'Sup Daging', price: 'RM 10.00', photo: 'sup-daging', signature: true, description: 'A clear beef broth with cauliflower, carrot and kailan greens.' },
          { id: 'sup-tulang', name: 'Sup Tulang', price: 'RM 15.00', photo: 'sup-tulang', signature: true, description: 'A clear, slow-simmered bone broth.' },
          { id: 'sup-sayur', name: 'Sup Sayur', price: 'RM 8.00', photo: 'sup-sayur-stock', description: 'A light, clear vegetable soup with seasonal greens.' },
        ],
      },
    ],
  },
  {
    id: 'sayur',
    name: 'Sayur',
    intro: 'Wok-tossed vegetables.',
    subsections: [
      {
        id: 'sayur-items',
        name: 'Sayur',
        items: [
          { id: 'kailan-ikan-masin', name: 'Kailan Ikan Masin', price: 'RM 8.00', photo: 'kailan-stock', description: 'Kailan greens wok-tossed with fragrant, salty salted fish.' },
          { id: 'kangkung-belacan', name: 'Kangkung Belacan', price: 'RM 8.00', photo: 'kangkung-belacan', signature: true, description: 'Wok-tossed water spinach with chilli and shrimp paste.' },
          { id: 'sayur-campur', name: 'Sayur Campur', price: 'RM 9.00', photo: 'sayur-campur', signature: true, description: 'A stir-fried medley of seasonal vegetables.' },
        ],
      },
    ],
  },
  {
    id: 'telur',
    name: 'Telur',
    intro: 'Egg dishes, simple to indulgent.',
    subsections: [
      {
        id: 'telur-items',
        name: 'Telur',
        items: [
          { id: 'telur-mata', name: 'Telur Mata', price: 'RM 1.50', note: 'Fried egg, sunny-side up', photo: 'telur-mata', signature: true, description: 'A simple fried egg, sunny-side up.' },
          { id: 'telur-dadar', name: 'Telur Dadar', price: 'RM 2.50', note: 'Omelette', photo: 'telur-dadar-stock', description: 'A simple golden omelette, lightly seasoned and pan-fried.' },
          { id: 'telur-bungkus', name: 'Telur Bungkus', price: 'RM 12.00', photo: 'telur-bungkus', signature: true, description: 'A folded omelette wrapped around a savoury filling, drizzled with ketchup.' },
          { id: 'telur-bistik', name: 'Telur Bistik', price: 'RM 15.00', note: 'Egg "beef steak" style, in a savoury sauce', photo: 'telur-bistik-photo', description: 'Fried egg cooked in a rich, savoury brown bistik gravy.' },
        ],
      },
    ],
  },
  {
    id: 'minuman',
    name: 'Menu Minuman Istimewa',
    intro: 'Hot and iced drinks, sirap, and fresh juices.',
    subsections: [
      {
        id: 'minuman',
        name: 'Minuman',
        note: 'Panas (hot) / Sejuk (cold)',
        items: [
          { id: 'teh-o', name: "Teh 'O'", price: 'RM2.20 / RM2.50', photo: 'teh-o-photo', description: 'Black tea without milk — clear, lightly sweetened and refreshing.' },
          { id: 'teh', name: 'Teh', price: 'RM2.50 / RM3.00', photo: 'teh', signature: true, description: 'Hot milk tea, served the traditional way.' },
          { id: 'teh-o-limau', name: "Teh 'O' Limau", price: 'RM2.50 / RM3.00', photo: 'teh-o-limau-photo', description: 'Black tea with a squeeze of fresh lime over ice, light and tangy.' },
          { id: 'teh-o-laici', name: "Teh 'O' Laici", price: 'RM3.50 / RM4.00', photo: 'teh-o-laici-photo', description: 'Black tea infused with lychee syrup, sweet and floral over ice.' },
          { id: 'kopi-o', name: "Kopi 'O'", price: 'RM2.20 / RM2.50', photo: 'kopi-o-stock', description: 'Strong black Malaysian coffee, no milk — served hot or iced.' },
          { id: 'kopi', name: 'Kopi', price: 'RM2.50 / RM3.00', photo: 'kopi-stock', description: 'Malaysian white coffee with condensed milk — rich and slightly sweet.' },
          { id: 'sirap', name: 'Sirap', price: 'RM2.20 / RM2.50', photo: 'sirap-stock', description: 'Classic rose syrup cordial, served hot or chilled over ice.' },
          { id: 'sirap-limau', name: 'Sirap Limau', price: 'RM2.50 / RM3.00', photo: 'sirap-limau-photo', description: 'Rose syrup with fresh lime — sweet, tangy and perfectly iced.' },
          { id: 'sirap-bandung', name: 'Sirap Bandung', price: 'RM2.50 / RM3.00', photo: 'sirap-bandung-photo', description: 'Pink rose syrup blended with milk — the classic Malaysian crowd pleaser.' },
          { id: 'sirap-laici', name: 'Sirap Laici', price: 'RM3.50 / RM4.00', photo: 'sirap-laici-photo', description: 'Rose syrup with lychee — sweet, floral and served cold.' },
          { id: 'milo-o', name: "Milo 'O'", price: 'RM3.50 / RM3.80', photo: 'milo-o-photo', description: 'Milo chocolate malt without milk — strong, dark and full-flavoured.' },
          { id: 'milo', name: 'Milo', price: 'RM3.50 / RM4.00', photo: 'milo-stock', description: 'Milo chocolate malt with condensed milk — comforting hot or iced.' },
          { id: 'nescafe-o', name: "Nescafe 'O'", price: 'RM3.50 / RM3.80', photo: 'nescafe-o-photo', description: 'Black Nescafe without milk — bold, simple and straightforward.' },
          { id: 'nescafe', name: 'Nescafe', price: 'RM3.50 / RM4.00', photo: 'nescafe-photo', description: 'Nescafe with condensed milk — a sweet, creamy Malaysian coffee fix.' },
          { id: 'limau', name: 'Limau', price: 'RM2.20 / RM2.50', photo: 'limau-stock', description: 'Fresh lime juice over ice — simple, clean and refreshing.' },
          { id: 'limau-asam-boi', name: 'Limau Asam Boi', price: 'RM2.50 / RM3.00', photo: 'limau-asam-boi-photo', description: 'Lime juice with salted plum for a tangy, sweet-and-sour contrast.' },
          { id: 'asam-boi', name: 'Asam Boi', price: 'RM2.20 / RM2.50', photo: 'asam-boi-photo', description: 'Salted plum drink, cold and umami-sweet.' },
          { id: 'laici', name: 'Laici', price: 'RM3.50 / RM4.00', photo: 'laici-photo', description: 'Sweet lychee juice drink, chilled and tropical.' },
          { id: 'asam', name: 'Asam', price: 'RM2.20 / RM2.50', photo: 'asam-photo', description: 'A tart, refreshing tamarind-based drink.' },
          { id: 'oren-sunquick', name: 'Oren Sunquick', price: 'RM2.50 / RM3.00', photo: 'oren-sunquick-photo', description: 'Orange Sunquick cordial, diluted and served cold.' },
          { id: 'blackcurrant', name: 'Blackcurrant', price: 'RM2.50 / RM3.00', photo: 'blackcurrant-photo', description: 'Deep purple blackcurrant cordial — sweet and slightly tart.' },
          { id: 'mango', name: 'Mango', price: 'RM2.50 / RM3.00', photo: 'mango-photo', description: 'Tropical mango cordial drink, sweet and fruity.' },
          { id: 'jagung', name: 'Jagung', price: 'RM2.20 / RM2.50', photo: 'jagung-photo', description: 'Sweet corn cold drink — lightly sweet and unique.' },
          { id: 'horlicks', name: 'Horlicks', price: 'RM3.80 / RM4.50', photo: 'horlicks-photo', description: 'Malted milk Horlicks — warm and comforting, hot or iced.' },
          { id: 'neslo', name: 'Neslo', price: 'RM4.50 / RM5.00', photo: 'neslo-photo', description: 'A Malaysian classic — Nescafe and Milo blended together, hot or iced.' },
        ],
      },
      {
        id: 'lain-lain-minuman',
        name: 'Lain-lain Minuman',
        note: 'Panas (hot) / Sejuk (cold)',
        items: [
          { id: 'air-paket-kosong', name: 'Air Paket Kosong', price: 'RM3.00 / RM3.50', photo: 'air-kosong-photo', description: 'A plain packaged water drink — clean and simple.' },
          { id: 'air-paket-susu', name: 'Air Paket Susu', price: 'RM3.50 / RM4.00', photo: 'air-susu-photo', description: 'A packaged milk drink — creamy and cold.' },
          { id: 'barbican', name: 'Barbican', price: 'RM6.50', note: 'Sejuk Sahaja (cold only)', photo: 'barbican-photo', description: 'Barbican non-alcoholic malt drink, served chilled.' },
          { id: 'barli', name: 'Barli', price: 'RM2.50 / RM3.00', photo: 'barli-stock', description: 'Chilled barley water — light, slightly earthy and very refreshing.' },
          { id: 'teh-hijau', name: 'Teh Hijau', price: 'RM3.80 / RM4.50', photo: 'teh-hijau-stock', description: 'Green tea, delicately brewed and subtly sweet.' },
        ],
      },
      {
        id: 'jus-minuman',
        name: 'Jus Minuman',
        note: 'Panas (hot) / Sejuk (cold), as printed',
        items: [
          { id: 'jus-oren', name: 'Oren', price: 'RM5.00 / RM5.50', photo: 'jus-oren', signature: true, description: 'Fresh-pressed juice, made to order.' },
          { id: 'jus-epal', name: 'Epal', price: 'RM5.00 / RM5.50', photo: 'juice-epal', description: 'Fresh apple juice, pressed and served chilled.' },
          { id: 'jus-epal-asam-boi', name: 'Epal Asam Boi', price: 'RM5.50 / RM6.00', photo: 'jus-epal-asam-boi-photo', description: 'Apple juice with salted plum asam boi — sweet, sour and addictive.' },
          { id: 'jus-tembikai', name: 'Tembikai', price: 'RM5.00 / RM5.50', photo: 'juice-tembikai', description: 'Fresh watermelon juice, naturally sweet and thirst-quenching.' },
          { id: 'jus-carrot', name: 'Carrot', price: 'RM5.00 / RM5.50', photo: 'juice-carrot', description: 'Freshly pressed carrot juice — earthy-sweet and vibrant.' },
        ],
      },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks, Kerabu Megi & Combos',
    intro: 'Crispy fried chicken, fries, maggi salad and combo trays.',
    subsections: [
      {
        id: 'snacks-items',
        name: 'Snacks',
        items: [
          { id: 'nuget-tempura', name: 'Nuget Tempura', price: 'RM 6.00', photo: 'nuget-stock', description: 'Crispy tempura-battered chicken nuggets, golden and light.' },
          { id: 'popcorn-chicken', name: 'Popcorn Chicken', price: 'RM 7.00', photo: 'popcorn-chicken', signature: true, description: 'Crispy bite-sized fried chicken pieces.' },
          { id: 'fries', name: 'Fries', price: 'RM 5.00', photo: 'fries', signature: true, description: 'Crinkle-cut fries, fried fresh to order.' },
          { id: 'wedges', name: 'Wedges', price: 'RM 7.00', photo: 'wedges-stock', description: 'Thick-cut potato wedges, seasoned and fried golden.' },
          { id: 'enoki-cheese', name: 'Enoki Cheese', price: 'RM 2.50', note: 'per piece', photo: 'enoki-stock', description: 'Enoki mushroom bundles grilled with melted cheese.' },
        ],
      },
      {
        id: 'kerabu-megi',
        name: 'Kerabu Megi',
        items: [
          { id: 'kerabu-megi-biasa', name: 'Kerabu Megi Biasa', price: 'RM 6.00', photo: 'kerabu-megi-biasa', signature: true, description: 'Cold tossed maggi noodle salad with chilli, lime and herbs.' },
          { id: 'kerabu-megi-seafood', name: 'Kerabu Megi Seafood', price: 'RM 9.00', photo: 'kerabu-megi-seafood', signature: true, description: 'Chilled maggi noodle salad, tossed with lime, chilli, herbs and seafood.' },
        ],
      },
      {
        id: 'combos',
        name: 'Combos',
        items: [
          { id: 'combo-chicken-2in1', name: 'Combo Chicken 2in1', note: 'Ayam & Fries', price: 'RM 10.00', photo: 'combo-chicken-2in1-photo', description: 'Fried chicken paired with crispy fries — the perfect quick combo.' },
          { id: 'combo-4in1', name: 'Combo 4in1', note: 'Nuget, Fries, Popcorn & Sosej', price: 'RM 12.00', photo: 'combo-4in1', signature: true, description: 'Fried chicken tenders, nuggets, fries and sausage on one tray.' },
        ],
      },
    ],
  },
  {
    id: 'nasi-ayam-mee-kari',
    name: 'Nasi Ayam, Mee Kari & Bihun Sup',
    intro: 'A taste of Malaysia, made with heart.',
    subsections: [
      {
        id: 'nasi-ayam-items',
        name: 'Hawker Favourites',
        items: [
          { id: 'nasi-ayam', name: 'Nasi Ayam', price: 'RM 8.00', photo: 'nasi-ayam-stock', description: 'Poached chicken over fragrant rice with clear broth and chilli sauce.' },
          { id: 'mee-kari', name: 'Mee Kari', price: 'RM 7.00', photo: 'mee-kari', signature: true, description: 'Curry noodle soup with egg, tofu puff and greens.' },
          { id: 'bihun-sup', name: 'Bihun Sup', price: 'RM 7.00', photo: 'bihun-sup', signature: true, description: 'Rice vermicelli in a light broth with tender braised beef.' },
        ],
      },
    ],
  },
]

export const signatureDishIds = menu
  .flatMap((cat) => cat.subsections.flatMap((sub) => sub.items))
  .filter((item) => item.signature)
  .map((item) => item.id)
