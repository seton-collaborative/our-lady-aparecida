# Pop-ups

One file per pop-up notice, named `YYYY-MM-DD-short-name.yml`. None yet.
The editing tool will add these and the site will show them as a dismissible notice.

```yaml
title:   { pt: "...", en: "..." }
body:    { pt: "...", en: "..." }
link:    { href: "giving.html", label: { pt: "...", en: "..." } }   # optional
pages:   [index]                    # which pages show it; empty means every page
show_from: 2026-12-01               # optional
hide_after: 2026-12-25              # required for pop-ups, so none stays up by mistake
```
