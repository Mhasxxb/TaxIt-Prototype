import { icon } from './icons.js';
import { aiChips, aiReplies, aiFallback, byslug, faqs } from './data.js';

const $ = s => document.querySelector(s);
const scrim = $('#scrim');
let openPanel = null, lastFocus = null;

/* -------------------------------- shared -------------------------------- */
function trap(panel) {
  return e => {
    if (e.key === 'Escape') { e.preventDefault(); closeAll(); return; }
    if (e.key !== 'Tab') return;
    const f = [...panel.querySelectorAll('button,input,a[href],textarea,select')].filter(el => !el.disabled && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
}
let trapHandler = null;

function show(panel, focusEl) {
  if (openPanel && openPanel !== panel) closeAll();
  lastFocus = document.activeElement;
  scrim.hidden = false;
  panel.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#fab').hidden = true;
  openPanel = panel;
  trapHandler = trap(panel);
  document.addEventListener('keydown', trapHandler);
  setTimeout(() => focusEl?.focus(), 40);
}

export function closeAll() {
  if (!openPanel) return;
  openPanel.hidden = true;
  scrim.hidden = true;
  document.body.style.overflow = '';
  $('#fab').hidden = false;
  document.removeEventListener('keydown', trapHandler);
  openPanel = null;
  lastFocus?.focus?.();
}

/* ------------------------------- AI guide ------------------------------- */
const thread = $('#aiThread');
let seeded = false;

const bubble = (who, html, meta = '') => `
  <div class="msg msg--${who}">
    <div class="msg__b">${html}</div>
    ${meta ? `<span class="msg__meta">${meta}</span>` : ''}
  </div>`;

const refCard = slug => {
  const c = byslug[slug];
  if (!c) return '';
  return `<div class="refcard">
    ${`<span class="refcard__ico">${icon('book', 20)}</span>`}
    <div><div class="refcard__t">View the full guide on this topic</div><div class="refcard__s">${c.name}</div></div>
    <button class="btn btn--primary btn--sm" data-goguide="${c.slug}">Open ${icon('arrowR', 15)}</button>
  </div>`;
};

const now = () => new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });

function push(html) {
  thread.insertAdjacentHTML('beforeend', html);
  thread.scrollTop = thread.scrollHeight;
  thread.querySelectorAll('[data-goguide]').forEach(b => {
    if (b.dataset.wired) return;
    b.dataset.wired = '1';
    b.addEventListener('click', () => { closeAll(); location.hash = '#/tax/' + b.dataset.goguide; });
  });
}

function match(q) {
  const s = q.toLowerCase();
  let best = null, score = 0;
  for (const r of aiReplies) {
    const hits = r.k.filter(k => s.includes(k)).length;
    if (hits > score) { score = hits; best = r; }
  }
  return best || aiFallback;
}

function respond(q) {
  push(bubble('user', q, now()));
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--bot';
  wrap.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  thread.appendChild(wrap);
  thread.scrollTop = thread.scrollHeight;
  setTimeout(() => {
    wrap.remove();
    const r = match(q);
    push(bubble('bot', r.a, 'Rehnuma · ' + now()) + (r.ref ? `<div class="msg msg--bot" style="max-width:100%">${refCard(r.ref)}</div>` : ''));
  }, 620);
}

function chips() {
  const el = $('#aiChips');
  el.innerHTML = aiChips.map(c => `<button class="chip">${c}</button>`).join('');
  el.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => { respond(b.textContent); el.innerHTML = ''; }));
}

export function openAI(question = null, opts = {}) {
  if (!seeded) {
    seeded = true;
    push(bubble('bot', `Assalam-o-alaikum. I'm <strong>Rehnuma</strong>, your AI tax guide.<br><br>Ask me about a rate, a deadline, or which section applies to something you're about to do. I'll answer plainly and point you at the full guide.`, 'Rehnuma'));
    chips();
  }
  if (opts.greet) push(bubble('bot', opts.greet, 'Rehnuma · ' + now()));
  show($('#aiDrawer'), $('#aiInput'));
  if (question) { $('#aiChips').innerHTML = ''; setTimeout(() => respond(question), 220); }
}

$('#aiForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#aiInput').value.trim();
  if (!v) return;
  $('#aiInput').value = '';
  $('#aiChips').innerHTML = '';
  respond(v);
});
$('#aiClose').addEventListener('click', closeAll);

/* ------------------------------- support ------------------------------- */
const sbody = $('#supportBody');
let answered = [];

function supportHTML() {
  const remaining = faqs.filter(f => !answered.includes(f.q));
  return `
    ${answered.length ? `<div class="supportthread">${answered.map(q => {
      const f = faqs.find(x => x.q === q);
      return bubble('user', f.q) + bubble('bot', f.a, 'TaxIt Support');
    }).join('')}</div>` : ''}

    ${remaining.length ? `
      <div class="faqhead">${answered.length ? 'Other common questions' : 'Frequently asked'}</div>
      <ul class="faqlist">
        ${remaining.map(f => `<li><button class="faqitem" data-faq="${f.q.replace(/"/g, '&quot;')}"><span>${f.q}</span>${icon('chevronR', 16)}</button></li>`).join('')}
      </ul>` : ''}

    <div class="wacard">
      <div class="wacard__t">Still need help?</div>
      <p class="wacard__s">A person from the TaxIt team replies within a few minutes during working hours.</p>
      <button class="btn btn--wa btn--block" id="waBtn">${icon('whatsapp', 18)} Chat with us on WhatsApp</button>
    </div>`;
}

function paintSupport(toast) {
  sbody.innerHTML = supportHTML();
  sbody.querySelectorAll('[data-faq]').forEach(b => b.addEventListener('click', () => {
    answered.push(b.dataset.faq);
    paintSupport(toast);
    sbody.querySelector('.supportthread')?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
  sbody.querySelector('#waBtn')?.addEventListener('click', () => toast('Opening WhatsApp — +92 300 000 0000'));
}

export function openSupport(toast) {
  paintSupport(toast);
  show($('#supportPanel'), $('#supportClose'));
}
$('#supportClose').addEventListener('click', closeAll);
scrim.addEventListener('click', closeAll);
