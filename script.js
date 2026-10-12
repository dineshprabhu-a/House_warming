(function () {
  'use strict';

  /* =====================================================================
     EVENT CONFIGURATION — edit these values for your own event
     ===================================================================== */
  /* Text shown to guests, per language. Single source of truth for names/places. */
  const LOCALIZED = {
    family: { ta: 'அழகர்சாமி குடும்பம்', en: 'Alagarsamy Family' },
    venue: { ta: 'எங்கள் புதிய இல்லம்', en: 'Our New Home' },
    address: {
      ta: 'அம்பலகாரன்பட்டி (கருங்காலக்குடி நிறுத்தம் அருகில்), வஞ்சிநகரம் அஞ்சல், மேலூர், மதுரை - 625101',
      en: 'Ambalakaranpatti (near Karungalakudi Stop), Vanjinagaram Post, Melur, Madurai - 625101',
    },
    landmark: { ta: 'டெம்பிள் சிட்டி ஹோட்டல்', en: 'Temple City Hotel' },
  };

  /* Language-aware getters: always return text for the active language */
  const EVENT_CONFIG = {
    get familyName() { return LOCALIZED.family[currentLang]; },
    get venue() { return LOCALIZED.venue[currentLang]; },
    get address() { return LOCALIZED.address[currentLang]; },
    get landmark() { return LOCALIZED.landmark[currentLang]; },
    date: '2026-10-25',
    time: '05:00 AM',
    durationHours: 4,
    rsvpPhone: '', /* digits with country code, e.g. '919XXXXXXXXX'. Leave empty to hide the RSVP button. */
    /* Exact pin of the new house (short link resolves to these coordinates) */
    coords: { lat: 10.142569, lng: 78.352095 },
    mapsUrl: 'https://maps.app.goo.gl/nVppNf6JFdQU1y5SA',
    directionsUrl:
'https://www.google.com/maps/dir/?api=1&destination=10.142569,78.352095',
    /* Landmark: Temple City Hotel, Karungalakudi, Melur, Madurai 625101 */
    landmarkMapsUrl:
'https://www.google.com/maps/search/?api=1&query=' +
encodeURIComponent('Temple City Hotel, Karungalakudi, Melur, Madurai 625101'),
    /* Strip query/hash so a personalised ?guest= link never leaks a name when re-shared */
    websiteUrl: window.location.href.split(/[?#]/)[0], /* (origin is "null" on file://, so don't build from it) */
  };

  const CEREMONY_EVENTS = [
    {
      time: '05:00 AM',
      taTitle: 'கணபதி ஹோமம்',
      enTitle: 'Ganapathy Homam',
      taDescription: 'இல்லத்தில் நல்வாழ்வும் வளமும் வேண்டி விநாயகர் வழிபாடு.',
      enDescription: 'Seeking blessings for prosperity, peace and happiness in the new home.',
    },
    {
      time: '06:15 AM',
      taTitle: 'புதுமனை புகுவிழா',
      enTitle: 'Griha Pravesham',
      taDescription: 'புதிய இல்லத்தில் மங்களகரமான நுழைவு.',
      enDescription: 'Auspicious entry into our new home.',
    },
    {
      time: '07:00 AM',
      taTitle: 'பால் காய்ச்சுதல்',
      enTitle: 'Milk Boiling Ceremony',
      taDescription: 'பெருகும் வளத்தையும் இனிமையான வாழ்வையும் குறிக்கும் பாரம்பரியம்.',
      enDescription: 'A traditional ceremony symbolizing abundance and prosperity.',
    },
    {
      time: '08:00 AM',
      taTitle: 'ஆசீர்வாதம்',
      enTitle: 'Family Blessings',
      taDescription: 'குடும்பத்தினர் மற்றும் பெரியோர்களின் ஆசீர்வாதம்.',
      enDescription: 'Blessings from family and elders.',
    },
    {
      time: '09:00 AM',
      taTitle: 'மதிய விருந்து',
      enTitle: 'Traditional Lunch',
      taDescription: 'அன்புடன் வழங்கப்படும் பாரம்பரிய விருந்து.',
      enDescription: 'A traditional lunch served with love.',
    },
  ];

  const TRADITIONAL_ELEMENTS = [
    {
      ta: 'விளக்கு', en: 'Light',
      taDesc: 'அன்பும் நல்வாழ்வும் நிறைந்த இல்லத்தின் அடையாளம்.',
      enDesc: 'A symbol of a home filled with love and wellbeing.',
      icon: 'lamp',
    },
    {
      ta: 'கோலம்', en: 'Kolam',
      taDesc: 'வரவேற்பும் வளமும் குறிக்கும் பாரம்பரிய அலங்காரம்.',
      enDesc: 'A traditional decoration symbolizing welcome and prosperity.',
      icon: 'kolam',
    },
    {
      ta: 'மாவிலைத் தோரணம்', en: 'Mango Leaf Thoranam',
      taDesc: 'நல்ல ஆற்றலையும் வளத்தையும் வரவேற்கும் பாரம்பரியம்.',
      enDesc: 'A tradition that welcomes good energy and abundance.',
      icon: 'leaf',
    },
    {
      ta: 'பால் காய்ச்சுதல்', en: 'Milk Boiling',
      taDesc: 'பெருகும் வளத்தையும் இனிமையான வாழ்வையும் குறிக்கும்.',
      enDesc: 'Symbolizes abundance and a sweet, prosperous life.',
      icon: 'pot',
    },
  ];

  /* =====================================================================
     TRANSLATIONS
     ===================================================================== */
  const TRANSLATIONS = {
    ta: {
      meta: {
        title: 'புதுமனை புகுவிழா | ' + LOCALIZED.family.ta,
        description: 'மதுரையில் எங்கள் புதிய இல்லத்தின் புதுமனை புகுவிழா நிகழ்விற்கு உங்களை அன்புடன் அழைக்கிறோம்.',
      },
      brand: { name: 'ஸ்ரீ ஸ்ரீ புதுமனை புகுவிழா', short: 'புகுவிழா' },
      nav: {
        home: 'முகப்பு', ourHome: 'எங்கள் இல்லம்', ceremony: 'நிகழ்ச்சி',
        schedule: 'நேரம்', location: 'அமைவிடம்',
        invitation: 'அழைப்பிதழ்',
      },
      hero: {
        sri: 'ஸ்ரீ',
        title: 'புதுமனை புகுவிழா',
        subtitle: 'எங்கள் புதிய இல்லத்தின் புதுமனை புகுவிழா நிகழ்வில் தங்களையும் தங்கள் குடும்பத்தினரையும் அன்புடன் அழைக்கிறோம்.',
        btnInvite: 'அழைப்பிதழைக் காண்க',
        btnDirections: 'வழி காண்க',
      },
      ourHome: {
        eyebrow: 'எங்கள் புதிய இல்லம்',
        title: 'ஒரு புதிய தொடக்கம்',
        desc: 'கனவுகளால் உருவான எங்கள் புதிய இல்லம், அன்பும் மகிழ்ச்சியும் நிறைந்த இனிய நினைவுகளின் தொடக்கமாகட்டும்.',
      },
      countdown: {
        title: 'இனிய தொடக்கத்தை நோக்கி...',
        days: 'நாட்கள்', hours: 'மணிநேரம்', minutes: 'நிமிடங்கள்',
seconds: 'விநாடிகள்',
        done: 'இனிய புதுமனை புகுவிழா நல்வாழ்த்துகள்!',
      },
      schedule: { eyebrow: 'நிகழ்ச்சி நேரம்', title: 'சடங்கு நிகழ்ச்சிகள்' },
      elements: { title: 'பாரம்பரிய அடையாளங்கள்' },
      inviteMsg: {
        greeting: 'அன்புடையீர்,',
        body1: 'எங்கள் புதிய இல்லத்தின் புதுமனை புகுவிழா நிகழ்வில் தங்களையும் தங்கள் குடும்பத்தினரையும் அன்புடன் வரவேற்கிறோம்.',
        body2: 'தங்களின் வருகையும் ஆசீர்வாதமும் எங்கள் இல்லத்திற்கு மகிழ்ச்சியையும் நிறைவையும் தரும்.',
        signoff: 'அன்புடன்,',
      },
      location: {
        title: 'அமைவிடம்',
        nearby: 'அருகிலுள்ள இடம்:',
        viewMaps: 'Google Maps-ல் காண்க',
        getDirections: 'வழி பெறுக',
        copyAddress: 'முகவரியை நகலெடுக்க',
        copied: 'முகவரி நகலெடுக்கப்பட்டது',
      },
      a11y: {
        language: 'மொழி தேர்வு', menu: 'மெனு',
        heroBg: 'சூரிய உதயத்தில் மதுரை கோயில் நிழல்',
        house: 'பாரம்பரிய தென்னிந்திய இல்லத்தின் ஓவியம்',
        schedule: 'நிகழ்ச்சி நிரல்',
      },
      banner: {
        label: 'தேதியைக் குறித்துக்கொள்ளுங்கள்',
        cta: 'நாள்காட்டியில் சேர்க்க',
        close: 'மூடு',
        daysLeft: '{n} நாட்கள் மீதம்',
        today: 'இன்றே விழா!',
      },
      guest: { greeting: '{name}, உங்களுக்கு அன்பான அழைப்பு' },
      actions: { title: 'தங்கள் வருகையை உறுதிசெய்யுங்கள்' },
      rsvp: {
        button: 'வருகையை உறுதிசெய்ய',
        message: 'வணக்கம்! {name}புதுமனை புகுவிழா நிகழ்வில் கலந்துகொள்கிறேன்/கிறோம். 🙏',
      },
      calendar: { ics: 'நாள்காட்டியில் சேர்க்க', title: 'புதுமனை புகுவிழா' },
      share: {
        button: 'அழைப்பிதழைப் பகிரவும்',
        message: '🪔 புதுமனை புகுவிழா\n\n' + LOCALIZED.family.ta +
          '\n\n📅 {date}\n⏰ {time}\n📍 {venue}\n\nஎங்கள் புதிய இல்லத்தின் புதுமனை புகுவிழா நிகழ்வில் தங்களையும் தங்கள் குடும்பத்தினரையும் அன்புடன் அழைக்கிறோம்.\n\nஅழைப்பிதழ்:\n{url}',
      },
      footer: {
        signoff: 'அன்புடன்,',
        message: 'எங்கள் இல்லத்திற்கு தங்களின் வருகையை அன்புடன் எதிர்நோக்குகிறோம்.',
      },
      backToTop: { label: 'மேலே செல்ல' },
      music: { play: 'இசையை இயக்க', pause: 'இசையை நிறுத்த' },
    },
    en: {
      meta: {
        title: 'Grand Housewarming Ceremony | ' + LOCALIZED.family.en,
        description: 'You are warmly invited to the housewarming ceremony of our new home in Madurai.',
      },
      brand: { name: 'Griha Pravesham', short: 'Griha Pravesham' },
      nav: {
        home: 'Home', ourHome: 'Our Home', ceremony: 'Ceremony',
        schedule: 'Schedule', location: 'Location', invitation: 'Invitation',
      },
      hero: {
        sri: 'Sri',
        title: 'GRAND HOUSEWARMING CEREMONY',
        subtitle: 'With the blessings of our elders, we warmly invite you and your family to celebrate the beginning of our new home.',
        btnInvite: 'View Invitation',
        btnDirections: 'Get Directions',
      },
      ourHome: {
        eyebrow: 'Our New Home',
        title: 'A New Beginning',
        desc: 'A home built with dreams, filled with love, happiness and memories yet to be made.',
      },
      countdown: {
        title: 'Counting down to our auspicious beginning',
        days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
        done: 'The celebration has begun!',
      },
      schedule: { eyebrow: 'Order of Events', title: 'Ceremony Schedule' },
      elements: { title: 'Traditional Elements' },
      inviteMsg: {
        greeting: 'Dear Family & Friends,',
        body1: 'We warmly welcome you and your family to the housewarming ceremony of our new home.',
        body2: 'Your presence and blessings will bring joy and fulfillment to our home.',
        signoff: 'With love,',
      },
      location: {
        title: 'Location',
        nearby: 'Nearby Landmark:',
        viewMaps: 'View on Google Maps',
        getDirections: 'Get Directions',
        copyAddress: 'Copy Address',
        copied: 'Address copied',
      },
      a11y: {
        language: 'Language selector', menu: 'Menu',
        heroBg: 'Madurai temple silhouette at sunrise',
        house: 'Illustration of a traditional South Indian home',
        schedule: 'Ceremony schedule',
      },
      banner: {
        label: 'Save the Date',
        cta: 'Add to calendar',
        close: 'Close',
        daysLeft: '{n} days to go',
        today: 'The celebration is today!',
      },
      guest: { greeting: 'A warm invitation for you, {name}' },
      actions: { title: 'Plan Your Visit' },
      rsvp: {
        button: 'RSVP on WhatsApp',
        message: 'Namaste! {name}I will be attending the housewarming ceremony. 🙏',
      },
      calendar: { ics: 'Add to Calendar', title: 'Griha Pravesham' },
      share: {
        button: 'Share Invitation',
        message: '🪔 Housewarming Ceremony\n\n' + LOCALIZED.family.en +
          '\n\n📅 {date}\n⏰ {time}\n📍 {venue}\n\nWe warmly invite you and your family to celebrate the housewarming of our new home.\n\nInvitation:\n{url}',
      },
      footer: {
        signoff: 'With love,',
        message: 'We look forward to welcoming you to our new home.',
      },
      backToTop: { label: 'Back to top' },
      music: { play: 'Play music', pause: 'Pause music' },
    },
  };

  const ICONS = {
    lamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 21h6M10 18h4M7 10c0-3 2-6 5-6s5 3 5 6-2 5-5 5-5-2-5-5Z"/><path d="M12 6v2"/></svg>',
    kolam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.4"/><circle cx="12" cy="20" r="1.4"/><circle cx="4" cy="12" r="1.4"/><circle cx="20" cy="12" r="1.4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20c8 0 16-8 16-16-8 0-16 8-16 16Z"/><path d="M6 18c4-4 8-8 12-12"/></svg>',
    pot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9h12l-1.5 9a2 2 0 0 1-2 1.7h-5a2 2 0 0 1-2-1.7L6 9Z"/><path d="M4 9h16M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
  };

  const TIMELINE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>';

  /* =====================================================================
     LANGUAGE STATE
     ===================================================================== */
  /* The language is asked on the first screen every time the site opens. */
  /* A link can skip that question with ?lang=ta or ?lang=en. */
  function readLangFromUrl() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    return fromUrl === 'en' || fromUrl === 'ta' ? fromUrl : null;
  }
  const savedLang = readLangFromUrl();
  let currentLang = savedLang || 'ta';

  function t(path) {
    const parts = path.split('.');
    let node = TRANSLATIONS[currentLang];
    for (const p of parts) {
      if (!node) return path;
      node = node[p];
    }
    return node || path;
  }

  function formatDate(lang) {
    try {
      const d = new Date(EVENT_CONFIG.date + 'T00:00:00');
      const locale = lang === 'ta' ? 'ta-IN' : 'en-IN';
      return d.toLocaleDateString(locale, { day: 'numeric', month:
'long', year: 'numeric' });
    } catch (e) {
      return EVENT_CONFIG.date;
    }
  }

  /* "05:00 AM" -> "5:00 AM" (en) / "அதிகாலை 5:00" (ta) */
  function formatTime(str) {
    const [clock, meridiem = ''] = str.split(' ');
    let [hh, mm] = clock.split(':').map(Number);
    const pm = meridiem.toUpperCase() === 'PM';
    if (pm && hh !== 12) hh += 12;
    if (!pm && meridiem && hh === 12) hh = 0;
    const mins = String(mm).padStart(2, '0');
    if (currentLang === 'en') {
      return (hh % 12 || 12) + ':' + mins + ' ' + (hh < 12 ? 'AM' : 'PM');
    }
    const part = hh < 6 ? 'அதிகாலை' : hh < 12 ? 'காலை' : hh < 16 ?
'மதியம்' : hh < 19 ? 'மாலை' : 'இரவு';
    return part + ' ' + (hh % 12 || 12) + ':' + mins;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, t(key));
      });
    });


    /* Dynamic event info */
    const dateStr = formatDate(currentLang);
    document.getElementById('heroFamily').textContent = EVENT_CONFIG.familyName;
    document.getElementById('heroDate').textContent = dateStr;
    document.getElementById('heroTime').textContent =
formatTime(EVENT_CONFIG.time);
    document.getElementById('heroVenue').textContent = EVENT_CONFIG.venue;

    document.getElementById('inviteNoteFamily').textContent =
EVENT_CONFIG.familyName;

    document.getElementById('cardFamily').textContent = EVENT_CONFIG.familyName;
    document.getElementById('cardDate').textContent = dateStr;
    document.getElementById('cardTime').textContent =
formatTime(EVENT_CONFIG.time);
    document.getElementById('cardVenue').textContent = EVENT_CONFIG.venue;
    document.getElementById('cardAddress').textContent = EVENT_CONFIG.address;

    document.getElementById('locVenue').textContent = EVENT_CONFIG.venue;
    document.getElementById('locAddress').textContent = EVENT_CONFIG.address;
    const landmarkEl = document.getElementById('locLandmark');
    landmarkEl.textContent = EVENT_CONFIG.landmark;
    landmarkEl.href = EVENT_CONFIG.landmarkMapsUrl;

    document.getElementById('footerFamily').textContent =
EVENT_CONFIG.familyName;
    document.getElementById('footerYear').textContent = String(new
Date().getFullYear());

    renderTimeline();
    renderElements();
    refreshActionLinks();
    renderBanner(dateStr);

    const musicBtn = document.getElementById('musicToggle');
    const isPlaying = musicBtn.classList.contains('is-playing');
    musicBtn.setAttribute('aria-label', isPlaying ? t('music.pause') :
t('music.play'));
  }

  function renderTimeline() {
    const list = document.getElementById('timelineList');
    list.innerHTML = CEREMONY_EVENTS.map((ev) => `
      <li class="timeline__item">
        <span class="timeline__icon">${TIMELINE_ICON}</span>
        <p class="timeline__time">${formatTime(ev.time)}</p>
        <h3 class="timeline__title">${currentLang === 'ta' ?
ev.taTitle : ev.enTitle}</h3>
        <p class="timeline__desc">${currentLang === 'ta' ?
ev.taDescription : ev.enDescription}</p>
      </li>
    `).join('');
  }

  function renderElements() {
    const grid = document.getElementById('elementsGrid');
    grid.innerHTML = TRADITIONAL_ELEMENTS.map((el) => `
      <div class="element-card">
        <div class="element-card__icon">${ICONS[el.icon] || ''}</div>
        <h3 class="element-card__title">${currentLang === 'ta' ? el.ta
: el.en}</h3>
        <p class="element-card__desc">${currentLang === 'ta' ?
el.taDesc : el.enDesc}</p>
      </div>
    `).join('');
  }

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'ta';
    applyTranslations();
  }

  /* =====================================================================
     PRELOADER
     ===================================================================== */
  const preloader = document.getElementById('preloader');
  const langGate = document.getElementById('langGate');
  const hidePreloader = () => preloader.classList.add('is-hidden');

  /* Returning visitors: lamp intro, then straight in. */
  /* New visitors: language gate first; the lamp intro plays after they choose. */
  if (savedLang) {
    window.addEventListener('load', () => setTimeout(hidePreloader, 1300));
    setTimeout(hidePreloader, 4000); /* never block the page if a font/image stalls */
  } else {
    langGate.querySelector('button').focus({ preventScroll: true });
  }

  /* =====================================================================
     FIRST-VISIT LANGUAGE GATE
     ===================================================================== */
  function closeLangGate() {
    langGate.classList.add('is-hidden');
    document.body.classList.remove('is-locked');
  }
  if (savedLang) {
    langGate.hidden = true;
  } else {
    document.body.classList.add('is-locked');
    langGate.querySelectorAll('[data-pick-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-pick-lang'));
        closeLangGate();
        setTimeout(hidePreloader, 2000); /* gate fades (0.6s), lamp blessing shows, then the invitation */
      });
    });
  }

  /* =====================================================================
     MOBILE NAV
     ===================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* =====================================================================
     COUNTDOWN
     ===================================================================== */
  function parseEventDateTime() {
    /* time like "06:00 AM" */
    const [time, meridiem] = EVENT_CONFIG.time.split(' ');
    let [hh, mm] = time.split(':').map(Number);
    if (meridiem && meridiem.toUpperCase() === 'PM' && hh !== 12) hh += 12;
    if (meridiem && meridiem.toUpperCase() === 'AM' && hh === 12) hh = 0;
    /* Fixed to IST so the countdown is correct for guests in any timezone */
    const pad = (n) => String(n).padStart(2, '0');
    return new Date(EVENT_CONFIG.date + 'T' + pad(hh) + ':' + pad(mm)
+ ':00+05:30');
  }

  const eventDateTime = parseEventDateTime();

  function updateCountdown() {
    const now = new Date();
    const diff = eventDateTime.getTime() - now.getTime();
    const grid = document.getElementById('countdownGrid');
    const done = document.getElementById('countdownDone');

    if (diff <= 0) {
      grid.hidden = true;
      done.hidden = false;
      return;
    }
    grid.hidden = false;
    done.hidden = true;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('cdDays').textContent =
String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent =
String(hours).padStart(2, '0');
    document.getElementById('cdMinutes').textContent =
String(minutes).padStart(2, '0');
    document.getElementById('cdSeconds').textContent =
String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =====================================================================
     LOCATION: MAPS / DIRECTIONS / COPY
     ===================================================================== */
  const mapsLink = document.getElementById('mapsLink');
  const directionsLink = document.getElementById('directionsLink');
  if (EVENT_CONFIG.mapsUrl) {
    mapsLink.href = EVENT_CONFIG.mapsUrl;
    directionsLink.href = EVENT_CONFIG.directionsUrl || EVENT_CONFIG.mapsUrl;
  } else {
    mapsLink.setAttribute('aria-disabled', 'true');
    directionsLink.setAttribute('aria-disabled', 'true');
  }

  let copiedTimer;
  document.getElementById('copyAddressBtn').addEventListener('click',
async () => {
    const msg = document.getElementById('copiedMsg');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EVENT_CONFIG.address);
      } else {
        const ta = document.createElement('textarea');
        ta.value = EVENT_CONFIG.address;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('copy failed');
      }
      msg.hidden = false;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => { msg.hidden = true; }, 2500);
    } catch (err) {
      msg.hidden = true;
    }
  });

  /* =====================================================================
     WHATSAPP SHARE
     ===================================================================== */
  document.getElementById('whatsappShare').addEventListener('click', () => {
    const template = t('share.message');
    const message = template
      .replace('{date}', formatDate(currentLang))
      .replace('{time}', formatTime(EVENT_CONFIG.time))
      .replace('{venue}', EVENT_CONFIG.venue)
      .replace('{url}', EVENT_CONFIG.websiteUrl);
    const url = 'https://wa.me/?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  /* =====================================================================
     MUSIC CONTROL (no autoplay, user-initiated only)
     ===================================================================== */
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let audioAvailable = true;

  bgMusic.addEventListener('error', () => {
    audioAvailable = false;
    musicBtn.style.display = 'none';
  });

  musicBtn.addEventListener('click', () => {
    if (!audioAvailable) return;
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicBtn.classList.add('is-playing');
        musicBtn.setAttribute('aria-pressed', 'true');
        musicBtn.setAttribute('aria-label', t('music.pause'));
      }).catch(() => {
        audioAvailable = false;
        musicBtn.style.display = 'none';
      });
    } else {
      bgMusic.pause();
      musicBtn.classList.remove('is-playing');
      musicBtn.setAttribute('aria-pressed', 'false');
      musicBtn.setAttribute('aria-label', t('music.play'));
    }
  });

  /* =====================================================================
     BACK TO TOP
     ===================================================================== */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =====================================================================
     SCROLL REVEAL ANIMATIONS
     ===================================================================== */
  const prefersReducedMotion =
window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal-fade-up, .reveal-scale, .reveal-fade');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  }

  /* =====================================================================
     HERO PARALLAX (subtle depth, skipped for reduced motion)
     ===================================================================== */
  if (!prefersReducedMotion) {
    const heroBg = document.querySelector('.hero__bg');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight * 1.2) {
          heroBg.style.transform = 'translateY(' + (window.scrollY *
0.25) + 'px) scale(1.08)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* =====================================================================
     DECORATIVE FLOATING PETALS
     ===================================================================== */
  function initPetals() {
    if (prefersReducedMotion) return;
    const container = document.getElementById('petals');
    const count = window.innerWidth < 600 ? 8 : 14;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (10 + Math.random() * 10) + 's';
      petal.style.animationDelay = (Math.random() * 12) + 's';
      petal.style.width = petal.style.height = (6 + Math.random() * 6) + 'px';
      container.appendChild(petal);
    }
  }
  initPetals();

  /* =====================================================================
     SAVE-THE-DATE BANNER (dismissible for the browser session)
     ===================================================================== */
  const bannerEl = document.getElementById('saveBanner');
  const BANNER_KEY = 'griha-pravesham-banner-closed';
  try { if (sessionStorage.getItem(BANNER_KEY)) bannerEl.hidden =
true; } catch (e) { /* storage blocked: keep banner */ }

  document.getElementById('bannerClose').addEventListener('click', () => {
    bannerEl.hidden = true;
    try { sessionStorage.setItem(BANNER_KEY, '1'); } catch (e) { /*
storage blocked: closes for this page view only */ }
  });

  function renderBanner(dateStr) {
    document.getElementById('bannerWhen').textContent = dateStr + ' • ' + formatTime(EVENT_CONFIG.time);
    const msLeft = eventDateTime.getTime() - Date.now();
    const daysEl = document.getElementById('bannerDays');
    if (msLeft <= 0) {
      daysEl.textContent = '';
      return;
    }
    const days = Math.ceil(msLeft / 86400000);
    daysEl.textContent = msLeft < 86400000 ? t('banner.today') :
t('banner.daysLeft').replace('{n}', days);
  }

  /* =====================================================================
     GUEST PERSONALISATION  (?guest=Name) — rendered via textContent only
     ===================================================================== */
  const guestName = (new
URLSearchParams(window.location.search).get('guest') || '')
    .replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 40);

  /* =====================================================================
     CALENDAR + RSVP + NATIVE SHARE
     ===================================================================== */
  const toIcsDate = (d) => d.toISOString().replace(/[-:]/g,
'').replace(/\.\d{3}/, '');
  const eventEnd = new Date(eventDateTime.getTime() +
EVENT_CONFIG.durationHours * 3600 * 1000);
  const icsEscape = (s) => String(s).replace(/\\/g,
'\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g,
'\\n');

  function eventDetails() {
    return {
      title: t('calendar.title') + ' | ' + EVENT_CONFIG.familyName,
      location: EVENT_CONFIG.venue + ', ' + EVENT_CONFIG.address,
      description: t('hero.subtitle') + '\n' + EVENT_CONFIG.websiteUrl,
    };
  }

  function buildIcs() {
    const ev = eventDetails();
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Griha Pravesham Invite//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:griha-pravesham-' + EVENT_CONFIG.date + '@invite',
      'DTSTAMP:' + toIcsDate(new Date()),
      'DTSTART:' + toIcsDate(eventDateTime),
      'DTEND:' + toIcsDate(eventEnd),
      'SUMMARY:' + icsEscape(ev.title),
      'LOCATION:' + icsEscape(ev.location),
      'DESCRIPTION:' + icsEscape(ev.description),
      'BEGIN:VALARM',
      'TRIGGER:-PT12H',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + icsEscape(ev.title),
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  document.getElementById('icsBtn').addEventListener('click', () => {
    const blob = new Blob([buildIcs()], { type:
'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'griha-pravesham.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* Links that depend on the active language / guest name */
  function refreshActionLinks() {
    const rsvp = document.getElementById('rsvpBtn');
    if (EVENT_CONFIG.rsvpPhone) {
      const text = t('rsvp.message').replace('{name}', guestName ?
guestName + ': ' : '');
      rsvp.href = 'https://wa.me/' + EVENT_CONFIG.rsvpPhone + '?text='
+ encodeURIComponent(text);
      rsvp.hidden = false;
    }

    const guestEl = document.getElementById('heroGuest');
    guestEl.hidden = !guestName;
    if (guestName) guestEl.textContent =
t('guest.greeting').replace('{name}', guestName);
  }

  /* =====================================================================
     SCROLL-SPY (highlight current section in nav)
     ===================================================================== */
  if ('IntersectionObserver' in window) {
    const links = new Map();
    navMenu.querySelectorAll('a[href^="#"]').forEach((a) =>
links.set(a.getAttribute('href').slice(1), a));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = links.get(entry.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id);
if (s) spy.observe(s); });
  }

  /* =====================================================================
     SEO: STRUCTURED DATA (schema.org Event)
     ===================================================================== */
  (function injectStructuredData() {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Griha Pravesham | ' + EVENT_CONFIG.familyName,
      startDate: EVENT_CONFIG.date + 'T05:00:00+05:30',
      endDate: eventEnd.toISOString(),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'Ambalakaranpatti, Melur (near Temple City Hotel)',
        geo: { '@type': 'GeoCoordinates', latitude:
EVENT_CONFIG.coords.lat, longitude: EVENT_CONFIG.coords.lng },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ambalakaranpatti, Vanjinagaram Post',
          addressLocality: 'Melur, Madurai',
          postalCode: '625101',
          addressCountry: 'IN',
        },
      },
      organizer: { '@type': 'Person', name: EVENT_CONFIG.familyName },
    });
    document.head.appendChild(ld);
  })();

  /* =====================================================================
     INITIAL RENDER
     ===================================================================== */
  applyTranslations();
})();