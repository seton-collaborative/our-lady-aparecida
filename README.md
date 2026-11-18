# Our Lady of Aparecida Parish

Parish website for **Nossa Senhora Aparecida** — Bethel, Connecticut.
Diocese of Bridgeport. First official Brazilian parish in the United States.

**Live site:** https://ourladyofaparecida.org
**Parish office:** 42 Vail Road, Bethel, CT 06801 · (203) 730-9071

## About this site

Bilingual (Portuguese / English) parish site.
Portuguese-first with a persistent EN toggle in the main navigation.

- **Build:** [Eleventy](https://www.11ty.dev/) turns small content files into plain HTML pages
- **Hosting:** Netlify (builds and deploys on push to `main`; every pull request gets a preview)
- **Fonts:** Cormorant Garamond (display) + Source Sans 3 (body)
- **Palette:** Navy (`#1E3A5F`) + Gold (`#B8891E`) + warm neutrals, set in `design/theme.yml`

## Structure

The site is split into areas so the editing tool can give each person the right access
(see `site-areas.yml`).

```
content/                Editor: the words and items on the site, each with Portuguese and English
  pages/                Text of each page (headings, paragraphs, buttons)
  events/               One file per homepage event, with optional show_from / hide_after dates
  announcements/        One file per announcement (none yet)
  popups/               One file per pop-up notice (none yet)
  documents/            One file per downloadable document (none yet)
  mass-schedule.yml     Mass times
  staff.yml             Pastoral staff
  ministries/           One file per ministry card
  contact.yml           Address, phone, email
documents/              Downloadable files (financials/ is locked)
design/                 Designer: theme.yml (colors, fonts, logo), homepage slides, gallery photo list
images/                 Designer: photos and logo files
site/                   Admin: page templates, shared header and footer, menu
  locked/               Admin only: Safe Environments and Financial Reports
eleventy.config.js      Admin: how the build reads the files above
```

Web addresses are unchanged: `index.html`, `about.html`, `ministries.html`, `gallery.html`,
`giving.html`, `capital-campaign.html`, `safe-environments.html`, `financial-reports.html`.

### Dates on items

Events, announcements, pop-ups and documents can carry `show_from` and `hide_after`
(YYYY-MM-DD, Eastern time). An item shows from `show_from` through `hide_after`; an empty
date means no limit. The build leaves out items outside their dates, and a small script hides
an item in the browser once its `hide_after` date passes, until the next build.

### Working on the site

```
npm install
npm start        # local preview at http://localhost:8080
npm run build    # writes the finished site to _site/
```

## Content updates

Weekly content (bulletin announcements, Mass intentions, event flyers)
is maintained by the parish office in coordination with SetonDigital.

For corrections or content changes, contact:
- **Parish office:** office@ourladyofaparecida.org
- **SetonDigital:** Seton Collaborative Corporation

## Diocesan compliance

This site includes the two required diocesan compliance pages:
- **Safe Environments** — Contact Valeria Jarrin, Safe Environments Program Associate (valeria.jarrin@diobpt.org · 203-416-1407)
- **HR Reporting** — Confidential reporting mechanism per diocesan policy

These pages must not be removed or materially altered without approval
from the Diocese of Bridgeport.

---

Built by **SetonDigital** — a service line of Seton Collaborative Corporation.
