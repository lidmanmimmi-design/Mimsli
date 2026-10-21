/* ==========================================================================
   MIMMI LIDMAN – SCRIPT (HORISONTELL SCROLL & INTERAKTIVITET)
   - Minimalistisk meny-toggle
   - Horisontell portfolio-scroll med pilar, drag och touch
   - Projekt-modal för detaljvy
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Bara About får en rörelse när den kommer in i bild.
  const aboutSektion = document.querySelector("#om");

  if (aboutSektion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("about-scroll-rorelse");
    const aboutObserver = new IntersectionObserver((poster) => {
      poster.forEach((post) => {
        if (post.isIntersecting) {
          post.target.classList.add("synlig");
          aboutObserver.unobserve(post.target);
        }
      });
    }, { threshold: 0.12 });

    aboutObserver.observe(aboutSektion);
  }

  // ------------------------------------------------------------------------
  // 1. NAVIGERINGSTOGGLE
  // ------------------------------------------------------------------------
  const navToggle = document.querySelector("#navToggle");
  const huvudNav = document.querySelector("#huvudNav");

  if (navToggle && huvudNav) {
    navToggle.addEventListener("click", () => {
      const oppen = huvudNav.classList.toggle("oppen");
      navToggle.setAttribute("aria-expanded", oppen ? "true" : "false");
    });

    huvudNav.querySelectorAll("a").forEach((lank) => {
      lank.addEventListener("click", () => {
        huvudNav.classList.remove("oppen");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. HORISONTELL PORTFOLIO-SCROLL (PILAR & DRAG)
  // ------------------------------------------------------------------------
  const scrollContainer = document.querySelector("#portfolioScrollContainer");
  const pilVanster = document.querySelector("#portfolioPilVanster");
  const pilHoger = document.querySelector("#portfolioPilHoger");

  if (scrollContainer) {
    const scrollSteg = 340; // Bredden på ett kort + gap

    if (pilVanster) {
      pilVanster.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: -scrollSteg, behavior: "smooth" });
      });
    }

    if (pilHoger) {
      pilHoger.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: scrollSteg, behavior: "smooth" });
      });
    }

    // Dra-för-att-skrolla med musen (Mouse drag to scroll)
    let arMusNere = false;
    let startX = 0;
    let startScrollVänster = 0;

    scrollContainer.addEventListener("mousedown", (e) => {
      arMusNere = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      startScrollVänster = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = "grabbing";
    });

    scrollContainer.addEventListener("mouseleave", () => {
      arMusNere = false;
      scrollContainer.style.cursor = "default";
    });

    scrollContainer.addEventListener("mouseup", () => {
      arMusNere = false;
      scrollContainer.style.cursor = "default";
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!arMusNere) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const rörlse = (x - startX) * 1.5;
      scrollContainer.scrollLeft = startScrollVänster - rörlse;
    });
  }

  // ------------------------------------------------------------------------
  // 3. PROJEKT-MODAL
  // ------------------------------------------------------------------------
  const projektData = {
    kursDigitalStrategi: {
      kategori: "IHM BUSINESS SCHOOL · KURS 01",
      titel: "Digital marknadsföring & strategi",
      beskrivning: "Kursen omfattar hur digitala marknadsföringsinsatser planeras utifrån företagets mål, målgrupper och position på marknaden. Den tar upp strategiska val av kanaler, kundresor och hur olika aktiviteter kan samordnas till en tydlig marknadsplan."
    },
    kursSeoSem: {
      kategori: "IHM BUSINESS SCHOOL · KURS 02",
      titel: "SEO & SEM",
      beskrivning: "Kursen behandlar hur företag kan öka sin synlighet i sökmotorer, både genom organiska sökresultat och betald annonsering. Innehållet kan omfatta sökordsanalys, sökintention, optimering av webbsidor och planering av sökannonser."
    },
    kursSocialMedia: {
      kategori: "IHM BUSINESS SCHOOL · KURS 03",
      titel: "Social Media Marketing",
      beskrivning: "Kursen omfattar planering och marknadsföring i sociala medier, med hänsyn till målgrupp, kanal och kommunikationsmål. Den tar upp innehållsplanering, kanalval, annonsering och hur engagemang och resultat kan följas upp."
    },
    kursContentMarketing: {
      kategori: "IHM BUSINESS SCHOOL · KURS 04",
      titel: "Content Marketing",
      beskrivning: "Kursen handlar om att planera och skapa innehåll som är relevant för målgruppen och stödjer verksamhetens marknadsföringsmål. Den kan omfatta innehållsstrategi, storytelling, kanal- och formatval samt hur innehåll kan bidra till relationer och varumärkesbyggande."
    },
    kursAnalytics: {
      kategori: "IHM BUSINESS SCHOOL · KURS 05",
      titel: "Google Analytics & dataanalys",
      beskrivning: "Kursen omfattar insamling och tolkning av data från digitala kanaler. Genom att följa exempelvis trafik, användarbeteenden och kampanjresultat går det att identifiera mönster och dra slutsatser som kan användas för att förbättra marknadsföringen."
    },
    kursEmailCrm: {
      kategori: "IHM BUSINESS SCHOOL · KURS 06",
      titel: "E-postmarknadsföring & CRM",
      beskrivning: "Kursen behandlar hur e-post och kunddata kan användas för relevant kommunikation och långsiktiga kundrelationer. Innehållet kan omfatta målgruppssegmentering, automatiserade utskick, kundresor och uppföljning av kampanjresultat."
    },
    kursPaidAdvertising: {
      kategori: "IHM BUSINESS SCHOOL · KURS 07",
      titel: "Paid Advertising",
      beskrivning: "Kursen omfattar planering och uppföljning av betald annonsering i digitala kanaler. Fokus ligger på målgrupper, annonsbudskap, budget, kanalval och hur resultat kan mätas och användas för att utveckla kampanjer."
    },
    kursAiVerktyg: {
      kategori: "IHM BUSINESS SCHOOL · KURS 08",
      titel: "AI & digitala verktyg",
      beskrivning: "Kursen behandlar hur AI och digitala verktyg kan användas som stöd i marknadsföringsarbete. Det kan handla om idéutveckling, produktion och anpassning av innehåll, analys och effektivisering av arbetsflöden."
    },
    kursProjektledning: {
      kategori: "IHM BUSINESS SCHOOL · KURS 09",
      titel: "Projektledning & marknadsplanering",
      beskrivning: "Kursen omfattar planering, genomförande och uppföljning av marknadsföringsprojekt. Den tar upp hur mål, aktiviteter, tidsplaner, resurser och ansvar kan struktureras för att driva projekt framåt."
    },
    kafe: {
      kategori: "LOKAL SEO & GOOGLE PROFIL",
      titel: "Lokal synlighet för ett kafé i Göteborg",
      beskrivning:
        "Kursuppgift på IHM Business School: Fördjupad sökordsanalys, konkurrentbevakning och strategisk plan för Google Företagsprofil för ett fiktivt kafé i Göteborg. Syftet var att driva fysiska frukost- och lunchgäster via lokala sökningar."
    },
    kalender: {
      kategori: "SOCIALA MEDIER & KAMPANJ",
      titel: "Innehållsplan för kaffeprenumeration",
      beskrivning:
        "Kursuppgift på IHM: Strategiska innehållspelare, kanalspecifika format och en hel månadskalender med 12 planerade inlägg för en hållbar kaffeprenumeration med fokus på storytelling och prenumerationsköp."
    },
    sajt: {
      kategori: "WEBB & DESIGN",
      titel: "Den här webbplatsen",
      beskrivning:
        "Handkodad från grunden med ren HTML, modern CSS och JavaScript. Utformad med fokus på arkitektonisk layout, snabb laddtid, tillgänglighet och ren estetik."
    },
    video: {
      kategori: "RÖRLIGT & UGC",
      titel: "Video & UGC-innehåll",
      beskrivning:
        "Platshållare för korta videoformat optimerade för Instagram Reels, TikTok och betalda annonser. Här kan du enkelt lägga in ett videoklipp med hook, produktvisning och call-to-action."
    },
    kampanj: {
      kategori: "DIGITAL KAMPANJ & CRM",
      titel: "Digital kampanj & E-post",
      beskrivning:
        "Platshållare för framtida kampanjer och automatiserade e-postflöden. Fokus på att konvertera nya intressenter och bygga långsiktiga kundrelationer."
    },
    wonderlashVideo1: {
      kategori: "CONTENT CREATION & SOCIALA MEDIER",
      titel: "Content Creator på ByWonderlash",
      beskrivning:
        "Som content creator på ByWonderlash skapade jag innehåll för sociala medier med fokus på att lyfta varumärket och engagera målgruppen."
    },
    wonderlashVideo2: {
      kategori: "CONTENT CREATION & SOCIALA MEDIER",
      titel: "Content Creator på ByWonderlash",
      beskrivning:
        "Som content creator på ByWonderlash skapade jag innehåll för sociala medier med fokus på att lyfta varumärket och engagera målgruppen."
    },
    cafeVideo1: {
      kategori: "MARKNADSFÖRING & SOCIALA MEDIER",
      titel: "Marknadsföringsvideo för café",
      beskrivning:
        "Jag skapade en video för att lyfta caféets utbud och locka fler besökare med inspirerande innehåll."
    },
    cafeVideo2: {
      kategori: "MARKNADSFÖRING & SOCIALA MEDIER",
      titel: "Marknadsföringsvideo för café",
      beskrivning:
        "Jag skapade en video för att lyfta caféets utbud och locka fler besökare med inspirerande innehåll."
    },
    ownMediaVideo4: {
      kategori: "EGNA MEDIER & TIKTOK",
      titel: "Egna kanaler & TikTok",
      beskrivning:
        "Jag planerar och skapar videor till mina egna TikTok-kanaler, där jag testar idéer och utvecklar mitt sätt att nå och engagera en publik."
    }
  };

  const portfolioKort = document.querySelectorAll(".portfolio-kort");
  const kursKort = document.querySelectorAll(".kurs-kort");
  const modal = document.querySelector("#projektModal");
  const modalKat = document.querySelector("#modalKategori");
  const modalTitel = document.querySelector("#modalTitel");
  const modalBeskrivning = document.querySelector("#modalBeskrivning");
  const modalStang = document.querySelector("#modalStang");
  const modalCta = document.querySelector("#modalCta");

  function oppnaModal(nyckel) {
    const data = projektData[nyckel];
    if (!data || !modal) return;

    modalKat.textContent = data.kategori;
    modalTitel.textContent = data.titel;
    modalBeskrivning.textContent = data.beskrivning;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => modal.classList.add("aktiv"), 10);
    document.body.style.overflow = "hidden";
  }
  function stangModal() {
    if (!modal) return;
    modal.classList.remove("aktiv");
    setTimeout(() => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }, 250);
  }
  portfolioKort.forEach((kort) => {
    const nyckel = kort.getAttribute("data-projekt");
    const kortVideo = kort.querySelector(".kort-video");
    if (kortVideo) {
      kortVideo.addEventListener("click", (e) => e.stopPropagation());
    }

    kort.setAttribute("tabindex", "0");
    kort.setAttribute("role", "button");
    kort.addEventListener("click", () => oppnaModal(nyckel));
    kort.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        oppnaModal(nyckel);
      }
    });
  });
  kursKort.forEach((kort) => {
    const nyckel = kort.getAttribute("data-projekt");
    kort.setAttribute("tabindex", "0");
    kort.setAttribute("role", "button");
    kort.addEventListener("click", () => oppnaModal(nyckel));
    kort.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        oppnaModal(nyckel);
      }
    });
  });
  if (modalStang) modalStang.addEventListener("click", stangModal);
  if (modalCta) modalCta.addEventListener("click", stangModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) stangModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) {
      stangModal();
    }
  });
});
