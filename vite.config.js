import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import Handlebars from "handlebars";
import HandlebarUpdate from "./vite-hbs-reload";
import siteData from "./src/data/site.js";
import labioplasticaPage from "./src/data/labioplastica.js";
import { schema } from "./src/data/schema.js";

const NBSP = "\u00A0";

const pageContext = {
  "/pages/services/labioplastica.html": labioplasticaPage,
};

const money = (value) =>
  `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}₽`;

const comma = (value) => String(value).replace(".", ",");

const tierAt = (index) => siteData.tiers[Number(index)].label;

const lowercase = (value) => String(value).toLowerCase();

const stars = (rating) =>
  Array.from({ length: 5 }, (_, i) => i < Number(rating));

const json = (value) => new Handlebars.SafeString(JSON.stringify(value));

const rootHref = (href, options) => {
  const isSubpage = options?.data?.root?.page?.isSubpage;
  return isSubpage && typeof href === "string" && href.startsWith("#")
    ? `/${href}`
    : href;
};

const helpers = {
  money,
  comma,
  json,
  lowercase,
  tierAt,
  stars,
  rootHref,
  inc: (value) => value + 1,
};

export default defineConfig({
  plugins: [
    handlebars({
      context: (pagePath) => ({
        ...siteData,
        schema,
        ...(pageContext[pagePath] || {}),
      }),
      helpers,
      partialDirectory: ["src/partials", "src/partials/blocks"],
      reloadOnPartialChange: true,
      compileOptions: { preventIndent: true },
    }),
    HandlebarUpdate(),
  ],
  server: {},
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: "esbuild",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/js/main.js"),
        style: resolve(__dirname, "src/styles/global.scss"),
        index: resolve(__dirname, "index.html"),
        labioplastica: resolve(
          __dirname,
          "pages/services/labioplastica.html"
        ),
      },
      output: {
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `css/[name].[ext]`,
      },
    },
  },
});
