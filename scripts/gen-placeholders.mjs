/**
 * Генератор SVG-плейсхолдеров.
 * Запуск:  node scripts/gen-placeholders.mjs
 *
 * Файлы кладутся в public/assets/img/placeholders/ и заменяются
 * на реальные изображения по тем же именам.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/assets/img/placeholders");
mkdirSync(OUT, { recursive: true });

const MINT = "#87E7EA";
const LILAC = "#E9A7C4";
const VIOLET = "#C63678";
const TEAL = "#0F766E";

const rnd = (seed, n) => {
  const value = Math.sin(seed * 9301 + n * 49297) * 43758.5453;
  return value - Math.floor(value);
};

const defs = (c1, c2, seed, soft = true) => `
  <defs>
    <linearGradient id="bg${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="soft${seed}">
      <stop offset="0" stop-color="#fff" stop-opacity=".85"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

const blobs = (seed, count = 4) =>
  Array.from({ length: count }, (_, i) => {
    const cx = 80 + rnd(seed + i, 1) * 840;
    const cy = 60 + rnd(seed + i, 2) * 780;
    const radius = 90 + rnd(seed + i, 3) * 150;
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${radius.toFixed(0)}" fill="url(#soft${seed})" opacity="${(0.3 + rnd(seed + i, 4) * 0.35).toFixed(2)}"/>`;
  }).join("");

const svg = (body, w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">${body}</svg>`;

const save = (name, content) => {
  writeFileSync(resolve(OUT, name), content.replace(/\n\s+/g, "\n"), "utf8");
  console.log("  +", name);
};

const portrait = (initials, c1, c2, seed) =>
  svg(
    `${defs(c1, c2, seed)}
     <rect width="600" height="600" fill="url(#bg${seed})"/>
     <circle cx="300" cy="238" r="132" fill="#fff" opacity=".32"/>
     <circle cx="300" cy="238" r="84" fill="#fff" opacity=".55"/>
     <path d="M110 600c0-108 86-190 190-190s190 82 190 190z" fill="#fff" opacity=".38"/>
     <text x="300" y="278" font-family="Manrope, Arial, sans-serif" font-size="128" font-weight="600" fill="${VIOLET}" text-anchor="middle" letter-spacing="2">${initials}</text>`,
    600,
    600
  );

console.log("case placeholders");
/* ---------- кейсы до/после 4:3 ---------- */
const CASES = 4;
Array.from({ length: CASES }, (_, i) => `case-${i + 1}`).forEach((file, i) => {
  const seed = i + 3;
  ["before", "after"].forEach((state) => {
    const isBefore = state === "before";
    const c1 = isBefore ? "#E9E6F0" : MINT;
    const c2 = isBefore ? "#F7F5FA" : LILAC;
    const accent = isBefore ? "#8C8798" : VIOLET;

    const mess = isBefore
      ? Array.from({ length: 18 }, (_, n) => {
          const x = 80 + rnd(seed + n, 11) * 840;
          const y = 180 + rnd(seed + n, 12) * 420;
          const w = 40 + rnd(seed + n, 13) * 150;
          return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(20 + rnd(seed + n, 14) * 60).toFixed(0)}" rx="12" fill="${accent}" opacity=".18" transform="rotate(${(rnd(seed + n, 15) * 60 - 30).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
        }).join("")
      : `<circle cx="500" cy="390" r="150" fill="${VIOLET}" opacity=".18"/>
         <circle cx="500" cy="390" r="92" fill="#fff" opacity=".55"/>
         <rect x="250" y="300" width="520" height="24" rx="12" fill="${VIOLET}" opacity=".28"/>
         <rect x="290" y="350" width="440" height="24" rx="12" fill="${VIOLET}" opacity=".18"/>
         <rect x="330" y="400" width="360" height="24" rx="12" fill="${VIOLET}" opacity=".12"/>`;

    save(
      `${file}-${state}.svg`,
      svg(
        `${defs(c1, c2, seed)}
         <rect width="1000" height="750" fill="url(#bg${seed})"/>
         ${blobs(seed)}
         ${mess}
         <circle cx="500" cy="390" r="210" fill="#fff" opacity=".16"/>
         <rect x="28" y="28" width="944" height="694" rx="28" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>
         <g font-family="Manrope, Arial, sans-serif">
           <rect x="28" y="28" width="${isBefore ? 132 : 148}" height="58" rx="29" fill="#fff" fill-opacity=".92"/>
           <text x="${isBefore ? 94 : 102}" y="66" font-size="26" font-weight="600" fill="${accent}" text-anchor="middle" letter-spacing="2">${isBefore ? "ДО" : "ПОСЛЕ"}</text>
           <text x="500" y="712" font-size="30" font-weight="500" fill="#55525F" text-anchor="middle">Проект ${i + 1}</text>
         </g>`,
        1000,
        750
      )
    );
  });
});

console.log("team placeholders");
/* ---------- команда ---------- */
const TEAM = [
  { file: "team-1.svg", initials: "АИ", c1: LILAC, c2: MINT },
  { file: "team-2.svg", initials: "МП", c1: MINT, c2: "#BFE3FF" },
  { file: "team-3.svg", initials: "ДС", c1: "#FFD9A8", c2: LILAC },
  { file: "team-4.svg", initials: "ЕС", c1: "#BFE3FF", c2: LILAC },
];
TEAM.forEach((m, i) => save(m.file, portrait(m.initials, m.c1, m.c2, 40 + i)));

console.log("review placeholders");
/* ---------- отзывы: клиент + владелец ---------- */
["client", "owner"].forEach((kind) => {
  for (let i = 1; i <= 6; i++) {
    const c1 = kind === "client" ? [MINT, LILAC, "#FFD9A8"][i % 3] : ["#D9E4FF", LILAC, MINT][i % 3];
    const seed = (kind === "client" ? 60 : 80) + i;
    const body =
      kind === "client"
        ? `<circle cx="120" cy="104" r="44" fill="${VIOLET}" opacity=".28"/>
           <rect x="54" y="158" width="132" height="26" rx="13" fill="${VIOLET}" opacity=".2"/>`
        : `<circle cx="120" cy="86" r="34" fill="#fff" opacity=".85"/>
           <path d="M52 206c0-38 30-62 68-62s68 24 68 62z" fill="#fff" opacity=".85"/>`;

    save(
      `review-${kind}-${i}.svg`,
      svg(
        `${defs(c1, "#ffffff", seed)}
         <rect width="240" height="240" fill="url(#bg${seed})"/>
         ${body}`,
        240,
        240
      )
    );
  }
});

console.log("special placeholders");
/* ---------- спецпредложения ---------- */
const SPECIAL = 5;
Array.from({ length: SPECIAL }, (_, i) => i + 1).forEach((n) => {
  const colors = [MINT, LILAC, "#BFE3FF", "#FFD9A8", MINT];
  const seed = 100 + n;
  save(
    `special-${n}.svg`,
    svg(
      `${defs(colors[n - 1], "#ffffff", seed)}
       <rect width="640" height="440" fill="url(#bg${seed})"/>
       <circle cx="320" cy="196" r="94" fill="#fff" opacity=".5"/>
       <circle cx="320" cy="196" r="48" fill="${VIOLET}" opacity=".2"/>
       <rect x="210" y="318" width="220" height="22" rx="11" fill="${VIOLET}" opacity=".2"/>
       <rect x="250" y="356" width="140" height="16" rx="8" fill="${VIOLET}" opacity=".12"/>`,
      640,
      440
    )
  );
});

/* ---------- фон первого экрана ---------- */
save(
  "hero-bg.svg",
  svg(
    `${defs("#F6F0FE", "#E7FAFB", 99)}
     <rect width="1440" height="900" fill="url(#bg99)"/>
     <circle cx="1150" cy="180" r="320" fill="${LILAC}" opacity=".18"/>
     <circle cx="240" cy="760" r="280" fill="${MINT}" opacity=".22"/>
     <circle cx="820" cy="820" r="180" fill="${LILAC}" opacity=".12"/>`,
    1440,
    900
  )
);

/* ---------- favicon ---------- */
save(
  "favicon.svg",
  svg(
    `<rect width="64" height="64" rx="16" fill="${VIOLET}"/>
     <circle cx="32" cy="32" r="16" fill="none" stroke="#fff" stroke-width="5" opacity=".9"/>
     <circle cx="32" cy="32" r="5" fill="#fff"/>`,
    64,
    64
  )
);

console.log("done ->", OUT);
