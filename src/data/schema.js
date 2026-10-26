import siteData from "./site.js";

const { site, services, tiers, faq } = siteData;

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "20:00",
  },
];

const offerCatalog = {
  "@type": "OfferCatalog",
  name: `${site.name} — услуги и цены`,
  itemListElement: services.map((service) => ({
    "@type": "Offer",
    name: service.title,
    description: service.text,
    priceCurrency: "RUB",
    price: String(service.price),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "RUB",
      minPrice: String(Math.min(...service.prices)),
      valueAddedTaxIncluded: true,
    },
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.text,
      serviceType: service.title,
      provider: { "@id": `${site.url}#organization` },
      areaServed: { "@type": "City", name: site.city },
      offers: tiers.map((tier, index) => ({
        "@type": "Offer",
        name: `${service.title} — ${tier.label}`,
        description: `Стоимость варианта «${tier.label}»`,
        priceCurrency: "RUB",
        price: String(service.prices[index]),
        url: `${site.url}#services`,
      })),
    },
  })),
};

export const organization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}#organization`,
  name: site.name,
  legalName: site.legalName,
  description:
    "Короткое описание компании, услуг и подхода к работе. Замените этот текст на реальное описание.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: site.priceRange,
  currenciesAccepted: "RUB",
  paymentAccepted: "Карта, Наличные, СБП",
  image: `${site.url}assets/img/placeholders/hero-bg.svg`,
  logo: `${site.url}assets/img/logo_pink.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressShort,
    addressLocality: site.city,
    addressRegion: site.city,
    postalCode: "000000",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.coords.split(",")[1],
    longitude: site.coords.split(",")[0],
  },
  hasMap: site.mapUrl,
  openingHoursSpecification,
  areaServed: [{ "@type": "City", name: site.city }],
  makesOffer: offerCatalog.itemListElement,
  sameAs: [site.mapUrl],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}#booking`,
      inLanguage: "ru-RU",
    },
    result: { "@type": "Reservation", name: "Оставить заявку" },
  },
};

export const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: site.city,
      item: site.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Услуги",
      item: `${site.url}#services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: site.name,
      item: site.url,
    },
  ],
};

export const schema = { organization, faqPage, breadcrumb };
