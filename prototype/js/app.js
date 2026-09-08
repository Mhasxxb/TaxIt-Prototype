import { icon } from './icons.js';
import { home, bindHome } from './views/home.js';
import { learn } from './views/learn.js';
import { category, bindCategory } from './views/category.js';
import { wizard, bindWizard } from './views/wizard.js';
import { preview, bindPreview } from './views/preview.js';
import { library, bindLibrary } from './views/library.js';
import { openAI, openSupport, closeAll } from './drawers.js';

const main = document.getElementById('main');
let cleanups = [];

/* ---------- chrome that isn't part of any single view ---------- */
document.getElementById('fab').innerHTML =
  `<span class="fab__icon">${icon('sparkles', 20)}</span><span class="fab__label">Ask the AI Guide</span>`;
document.getElementById('navSupport').innerHTML = icon('buoy', 19);
document.getElementById('menuBtn').innerHTML = icon('menu', 20);
document.getElementById('aiClose').innerHTML = icon('x', 19);
document.getElementById('supportClose').innerHTML = icon('x', 19);
document.querySelector('#aiForm .composer__send').innerHTML = icon('send', 18);

/* ---------------------------- theme ---------------------------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const systemDark = matchMedia('(prefers-color-scheme: dark)');

function paintThemeBtn() {
  const dark = root.dataset.theme === 'dark';
  // show the theme you'd switch TO
  themeBtn.innerHTML = icon(dark ? 'sun' : 'moon', 19);
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
  themeBtn.setAttribute('aria-label', label);
  themeBtn.setAttribute('title', label);
  themeBtn.setAttribute('aria-pressed', String(dark));
}

function setTheme(next, persist = true) {
  root.classList.add('theme-switching');
  root.dataset.theme = next;
  if (persist) { try { localStorage.setItem('taxit-theme', next); } catch {} }
  paintThemeBtn();
  setTimeout(() => root.classList.remove('theme-switching'), 240);
}

themeBtn.addEventListener('click', () =>
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// keep following the OS until the user has expressed a preference
systemDark.addEventListener('change', e => {
  let stored = null;
  try { stored = localStorage.getItem('taxit-theme'); } catch {}
  if (!stored) setTheme(e.matches ? 'dark' : 'light', false);
});

paintThemeBtn();

const toastEl = document.getElementById('toast');
let toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(() => { toastEl.hidden = true; }, 2600);
}

const ctx = {
  openAI: (q, o) => openAI(q, o),
  openSupport: () => openSupport(toast),
  toast,
  rerender: () => render(location.hash),
  onLeave: fn => cleanups.push(fn),
};

/* ---------------------------- routing ---------------------------- */
const routes = [
  { re: /^#?\/?$/,               nav: null,      view: home,    bind: bindHome },
  { re: /^#\/learn$/,            nav: 'learn',   view: learn },
  { re: /^#\/tax\/([\w-]+)$/,    nav: 'learn',   view: category, bind: bindCategory },
  { re: /^#\/file$/,             nav: 'file',    view: wizard,  bind: bindWizard },
  { re: /^#\/file\/preview$/,    nav: 'file',    view: preview, bind: bindPreview },
  { re: /^#\/library$/,          nav: 'library', view: library, bind: bindLibrary },
];

function render(hash) {
  cleanups.forEach(fn => { try { fn(); } catch {} });
  cleanups = [];

  // Support is a panel, not a page — bounce back to where the user was.
  if (hash === '#/support') {
    history.replaceState(null, '', location.pathname + (sessionStorage.last || '#/'));
    render(sessionStorage.last || '#/');
    openSupport(toast);
    setNav('support');
    return;
  }
  sessionStorage.last = hash || '#/';

  const r = routes.find(r => r.re.test(hash)) || routes[0];
  const m = hash.match(r.re);
  const arg = m && m[1];

  main.innerHTML = arg ? r.view(arg) : r.view();
  r.bind?.(main, ctx, arg);
  setNav(r.nav);
  document.getElementById('mainnav').classList.remove('is-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
}

function setNav(key) {
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === key) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

window.addEventListener('hashchange', () => {
  closeAll();
  const h = location.hash;
  // in-page anchors on the article view scroll instead of routing
  if (h && !h.startsWith('#/')) {
    document.getElementById(h.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  render(h);
  window.scrollTo({ top: 0 });
  main.focus({ preventScroll: true });
});

document.getElementById('fab').addEventListener('click', () => openAI());
document.getElementById('navSupport').addEventListener('click', () => openSupport(toast));
document.getElementById('avatarBtn').addEventListener('click', () => toast('Signed in as Ayesha Raza · Filer'));
document.getElementById('menuBtn').addEventListener('click', e => {
  const nav = document.getElementById('mainnav');
  const open = nav.classList.toggle('is-open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});

render(location.hash);
