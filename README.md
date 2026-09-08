# TaxIt — prototype

A clickable prototype of TaxIt, a tax guidance platform for Pakistani citizens. Seven screens, all
wired together: home dashboard, tax category guides, a multi-step document wizard with validation,
a watermarked preview with a verification gate, a document library, an AI guide drawer, and a
support panel with FAQs. Light and dark themes.

**No build step. No dependencies. No `npm install`.** It is plain HTML, CSS and ES modules —
184 KB on disk. Any static file server will run it.

---

## 1. Prerequisites

Exactly one of the following, plus a modern browser:

| You have | Use this |
|---|---|
| Python 3 (preinstalled on macOS + most Linux) | `python3 -m http.server` |
| Node.js | `npx serve` |
| PHP | `php -S` |
| VS Code | Live Server extension |

Nothing else. There is no `package.json`, no lockfile, no toolchain, no runtime version to match.

---

## 2. Run it locally

Get the folder onto the machine — copy it, unzip it, or clone it if you've put it in Git:

```bash
# copied or unzipped the folder
cd path/to/TaxIT/prototype

# or, if it's in Git
git clone <your-repo-url> TaxIT && cd TaxIT/prototype
```

Then serve it:

```bash
python3 -m http.server 5173
```

Open **<http://127.0.0.1:5173>**.

That's the whole setup. Alternatives, all equivalent — run them from inside `prototype/`:

```bash
npx serve -l 5173          # Node; first run downloads the package
php -S 127.0.0.1:5173      # PHP
```

To stop the Python server: `Ctrl-C`, or `pkill -f "http.server 5173"` if you backgrounded it.

### ⚠️ Do not open `index.html` by double-clicking it

Over `file://` the browser blocks ES module imports as cross-origin requests. The page loads, the
nav renders, and **the body stays empty** with a CORS error in the console. This is the single most
likely thing to go wrong. Verified: served over HTTP the home page renders 6 category cards; opened
over `file://` it renders 0.

You need a server. Any of the four above will do.

---

## 3. Get it live

Every path in the app is relative (`./css/…`, `./js/…`) and routing is hash-based (`#/library`),
so it deploys to any static host **with no build command, no rewrite rules, and no SPA fallback
config**. It also works fine from a subdirectory — verified rendering correctly at `/prototype/`.

Publish the contents of `prototype/`, not the repo root.

**Drag and drop — fastest**

Drag the `prototype` folder onto <https://app.netlify.com/drop>. You get a URL in a few seconds.

**Netlify / Vercel / Cloudflare Pages — connected to Git**

| Setting | Value |
|---|---|
| Build command | *(leave empty)* |
| Output / publish directory | `prototype` |
| Install command | *(leave empty)* |

**GitHub Pages** *(the project isn't under Git yet — `git init`, commit and push first)*

```bash
git subtree push --prefix prototype origin gh-pages
```

Then in the repo: Settings → Pages → Source: `gh-pages` branch, `/` root. Serves at
`https://<user>.github.io/<repo>/` — the subpath is fine.

**Any web host / S3 / nginx**

Copy `prototype/` into the web root. No configuration needed — there are no clean URLs to rewrite,
because navigation happens after the `#`.

---

## 4. What's where

```
TaxIT/
├─ Design/design.md          Design system spec (the source of the dark palette)
└─ prototype/
   ├─ index.html             Shell: app bar, drawer + panel markup, no-flash theme script
   ├─ css/
   │  ├─ tokens.css          ★ All colour, spacing, radius, shadow, motion tokens.
   │  │                        Light in :root, dark in :root[data-theme="dark"].
   │  ├─ base.css            Reset, app bar, footer, FAB, responsive nav
   │  ├─ components.css      Buttons, fields, callouts, drawer, support panel, menus
   │  └─ screens.css         Per-screen layout
   └─ js/
      ├─ app.js              Hash router, theme switcher, toast
      ├─ data.js             ★ All content: tax guides, form schema, FAQs, AI replies, files
      ├─ icons.js            Lucide-derived line icons as an inline SVG map
      ├─ drawers.js          AI guide drawer + support panel (focus trap, Esc, scrim)
      └─ views/              One module per screen: markup + its own event wiring
```

★ = the two files you'll edit most.

### Routes

| URL | Screen |
|---|---|
| `#/` | Home dashboard |
| `#/learn` | Guide index |
| `#/tax/<slug>` | Category guide — `income-tax`, `sales-tax`, `property-tax`, `withholding-tax`, `customs-duty`, `corporate-tax` |
| `#/file` | Form wizard |
| `#/file/preview` | Document preview + verification |
| `#/library` | Document library |
| `#/support` | Opens the support panel over the previous screen |

---

## 5. Making changes

No rebuild, no watcher, no hot reload — **edit a file and refresh the browser.**

| To change | Edit |
|---|---|
| Any colour, radius, shadow, spacing | `css/tokens.css` — nothing else hardcodes a colour |
| Guide copy, rates, deadlines | `categories[]` in `js/data.js` |
| Wizard fields, validation, tooltips | `steps[]` in `js/data.js` |
| FAQ questions and answers | `faqs[]` in `js/data.js` |
| What the AI guide replies | `aiReplies[]` in `js/data.js` — keyword-matched |
| Library folders and files | `folders[]` / `files[]` in `js/data.js` |

**Adding a tax category** takes one entry in `categories[]` — a `slug`, an `icon` name from
`js/icons.js`, `facts[]`, and `sections[]`. The home grid, the Learn index, the route, the
breadcrumb, the table of contents and the related-links block all pick it up automatically.

**Two conventions worth keeping:**

- All content lives in `data.js` and each screen reads a *different slice* of it. That's what keeps
  the same figure from being restated on three screens.
- Nothing outside `tokens.css` should hardcode a colour. The dark theme works because every
  component reads tokens; one hardcoded hex is one thing that breaks when the canvas inverts.

---

## 6. Troubleshooting

**Blank page below the nav bar.** You opened it over `file://`. Serve it over HTTP — see §2.

**`Failed to load module script … MIME type "text/plain"`.** The server isn't sending
`text/javascript` for `.js`. Python, `serve` and PHP all get this right; some minimal one-liner
servers don't. Switch to one of the four in §1.

**`Address already in use`.** Something is on 5173. Use another port
(`python3 -m http.server 5174`) or free it with `pkill -f "http.server 5173"`.

**Typeface looks generic.** Plus Jakarta Sans loads from Google Fonts, so offline you get the
system fallback stack. Layout and spacing are unaffected. To make it fully offline, download the
font and swap the `<link>` in `index.html` for a local `@font-face`.

**Theme won't stay switched.** The choice is stored in `localStorage` under `taxit-theme`.
Private/incognito windows discard it, and clearing site data resets it to following the OS.
`localStorage.removeItem('taxit-theme')` in the console restores OS-following behaviour.

**Changes not appearing.** Hard-reload to bypass the CSS/JS cache: `Ctrl-Shift-R`
(`Cmd-Shift-R` on macOS).

---

## 7. Scope

This is a **UI prototype**. There is no backend, no authentication, and no persistence — reloading
resets the form, the library and the chat. Nothing is submitted to FBR.

Tax figures are illustrative and drawn from Tax Year 2026 rules for demonstration. Confirm against
FBR before treating any number here as advice.

**Theme note:** `Design/design.md` specifies a dark canvas. The prototype ships light-first per the
brief, and the dark theme implements that document's palette (§2) exactly — so both live in the
same token system and the switcher moves between them.
