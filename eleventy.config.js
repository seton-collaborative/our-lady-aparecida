// Eleventy builds the parish site from three areas:
//   content/  written text and items (Editor level)
//   design/   theme, gallery and hero photos (Designer level)
//   site/     page templates, header, footer and menu (Admin level)
// Photos stay in images/ and PDFs in documents/, at the same web addresses as before.

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import nunjucks from "nunjucks";

const ROOT = path.dirname(new URL(import.meta.url).pathname);

function readYaml(file) {
  return yaml.load(fs.readFileSync(file, "utf8")) ?? {};
}

function yamlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.ya?ml$/.test(f))
    .sort()
    .map((f) => ({ file: f, slug: f.replace(/\.ya?ml$/, ""), ...readYaml(path.join(dir, f)) }));
}

// Today's date in the parish's time zone, as YYYY-MM-DD.
function todayEastern() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function asDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

// An item shows from show_from through hide_after. Empty dates mean no limit.
function isShowing(item, today) {
  const from = asDate(item.show_from);
  const until = asDate(item.hide_after);
  if (from && from > today) return false;
  if (until && until < today) return false;
  return true;
}

function loadContent() {
  const dir = path.join(ROOT, "content");
  const today = todayEastern();
  const pages = {};
  for (const p of yamlFiles(path.join(dir, "pages"))) pages[p.slug] = p;
  const byStart = (a, b) => String(asDate(a.start_date) ?? "").localeCompare(String(asDate(b.start_date) ?? ""));
  return {
    today,
    pages,
    contact: readYaml(path.join(dir, "contact.yml")),
    massSchedule: readYaml(path.join(dir, "mass-schedule.yml")),
    staff: readYaml(path.join(dir, "staff.yml")),
    ministries: yamlFiles(path.join(dir, "ministries")),
    events: yamlFiles(path.join(dir, "events")).filter((e) => isShowing(e, today)).sort(byStart),
    announcements: yamlFiles(path.join(dir, "announcements")).filter((e) => isShowing(e, today)),
    popups: yamlFiles(path.join(dir, "popups")).filter((e) => isShowing(e, today)),
    documents: yamlFiles(path.join(dir, "documents")),
  };
}

function loadDesign() {
  const dir = path.join(ROOT, "design");
  return {
    theme: readYaml(path.join(dir, "theme.yml")),
    gallery: readYaml(path.join(dir, "gallery.yml")),
    homeHero: readYaml(path.join(dir, "home-hero.yml")),
  };
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("documents");

  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  eleventyConfig.addGlobalData("parish", loadContent);
  eleventyConfig.addGlobalData("contact", () => loadContent().contact);
  eleventyConfig.addGlobalData("theme", () => loadDesign().theme);
  eleventyConfig.addGlobalData("gallery", () => loadDesign().gallery);
  eleventyConfig.addGlobalData("homeHero", () => loadDesign().homeHero);

  eleventyConfig.addWatchTarget("content/");
  eleventyConfig.addWatchTarget("design/");

  // Prints a date as YYYY-MM-DD, whether YAML read it as a date or as text.
  eleventyConfig.addFilter("isodate", (value) => asDate(value) ?? "");

  // Prints a piece of content. Text with markup (<br>, <em>, links) is printed as HTML;
  // plain text is escaped.
  eleventyConfig.addFilter("t", (value) => {
    if (value === null || value === undefined) return "";
    const s = String(value);
    const out = /<[a-zA-Z\/!]/.test(s)
      ? s
      : s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return new nunjucks.runtime.SafeString(out);
  });

  return {
    dir: { input: "site", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
