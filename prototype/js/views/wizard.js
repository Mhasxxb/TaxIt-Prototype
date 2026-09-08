import { icon } from '../icons.js';
import { steps } from '../data.js';

// persists across navigation within the session
export const form = { year: '2026', status: 'Resident' };
export const wiz = { step: 0, visited: new Set([0]), shownErrors: false };

const PKR = n => 'PKR ' + Number(n || 0).toLocaleString('en-PK');
const num = v => { const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')); return isNaN(n) ? 0 : n; };

const SLABS = [
  [600000, 0, 0], [1200000, 0, .01], [2200000, 6000, .11],
  [3200000, 116000, .23], [4100000, 346000, .30], [Infinity, 616000, .35],
];
function taxOn(income) {
  let lower = 0;
  for (const [cap, base, rate] of SLABS) {
    if (income <= cap) return base + (income - lower) * rate;
    lower = cap;
  }
  return 0;
}
export function computed() {
  const gross = num(form.salary) + num(form.allowances) + num(form.business) + num(form.rent) + num(form.profit);
  const deduct = num(form.zakat) + num(form.pension);
  const taxable = Math.max(0, gross - deduct);
  const gross_tax = Math.round(taxOn(taxable));
  const credits = Math.round(Math.min(num(form.donation), taxable * .3) * (taxable ? gross_tax / taxable : 0));
  const liability = Math.max(0, gross_tax - credits);
  const paid = num(form.wht);
  return { gross, deduct, taxable, gross_tax, credits, liability, paid, balance: liability - paid };
}

/* ------------------------------- validation ------------------------------- */
function invalid(f) {
  const v = form[f.n];
  if (f.type === 'checkbox') return f.req && !v ? (f.err || 'This must be confirmed.') : null;
  if (f.req && (v === undefined || String(v).trim() === '')) return f.err || `${f.l} is required.`;
  if (!v) return null;
  if (f.pattern && !new RegExp(f.pattern).test(String(v).replace(/\s|-/g, ''))) return f.err || 'Check the format of this value.';
  if (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return f.err || 'Enter a valid email address.';
  return null;
}
export const stepErrors = i => (steps[i].fields || []).map(f => ({ f, e: invalid(f) })).filter(x => x.e);

/* --------------------------------- markup --------------------------------- */
function fieldHTML(f) {
  const id = 'f_' + f.n;
  const val = form[f.n] ?? '';
  const label = `
    <span class="field__label">
      <label for="${id}">${f.l}</label>
      ${f.req ? '<span class="field__req" aria-hidden="true">*</span>' : '<span class="field__opt">Optional</span>'}
      ${f.tip ? `<button type="button" class="infobtn" data-tip="${f.n}" aria-expanded="false" aria-label="Where to find ${f.l}">${icon('info', 13)}</button>` : ''}
    </span>`;

  if (f.type === 'checkbox') {
    return `<div class="field field--full" data-field="${f.n}">
      <label class="check">
        <input type="checkbox" id="${id}" data-in="${f.n}" ${val ? 'checked' : ''} />
        <span class="check__box">${icon('check', 14)}</span>
        <span class="check__text">${f.l} <span class="field__req">*</span></span>
      </label>
      <span class="field__err">${icon('alert', 13)} <span>${f.err || ''}</span></span>
    </div>`;
  }

  let control;
  if (f.type === 'select') {
    control = `<select class="select" id="${id}" data-in="${f.n}">
      ${f.opts.map(o => `<option ${val === o ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
  } else if (f.money) {
    control = `<div class="field__wrap"><span class="field__prefix">PKR</span>
      <input class="input input--prefixed" id="${id}" data-in="${f.n}" inputmode="numeric" placeholder="0" value="${val}" /></div>`;
  } else {
    control = `<input class="input" id="${id}" data-in="${f.n}" type="${f.type || 'text'}" placeholder="${f.ph || ''}" value="${val}" />`;
  }

  return `<div class="field ${f.span === 2 ? 'field--full' : ''}" data-field="${f.n}">
    ${label}${control}
    ${f.hint ? `<span class="field__hint">${f.hint}</span>` : ''}
    <span class="field__err">${icon('alert', 13)} <span>${f.err || 'This field is required.'}</span></span>
  </div>`;
}

function reviewHTML() {
  const c = computed();
  const block = (title, i) => `
    <div class="reviewsec">
      <div class="reviewsec__h">${icon('fileCheck', 15)}<h4>${steps[i].title}</h4>
        <button class="btn btn--link" data-goto="${i}">Edit</button></div>
      <dl>${steps[i].fields.filter(f => f.type !== 'checkbox').map(f => {
        const v = form[f.n];
        const shown = (v === undefined || String(v).trim() === '')
          ? '<dd class="is-empty">Not provided</dd>'
          : `<dd>${f.money ? PKR(num(v)) : v}</dd>`;
        return `<div class="reviewrow"><dt>${f.l}</dt>${shown}</div>`;
      }).join('')}</dl>
    </div>`;

  return `
    <div class="formsec">
      <h3 class="formsec__t">Check before you generate</h3>
      <p class="formsec__d">This is what will appear on the document. Anything marked “Not provided” will be printed as zero.</p>
      ${block('Personal Info', 0)}${block('Income Details', 1)}${block('Deductions', 2)}
      <div class="callout callout--warn" style="margin-top:24px">
        <div class="callout__ico">${icon('alert', 18)}</div>
        <div><div class="callout__t">TaxIt does not submit on your behalf</div>
        <div class="callout__b">You generate the document here, review the watermarked preview, then file it yourself through IRIS. Your computed balance payable is <strong>${PKR(Math.max(0, c.balance))}</strong>.</div></div>
      </div>
    </div>`;
}

export function wizard() {
  const i = wiz.step, s = steps[i], errs = stepErrors(i);
  return `
  <div class="shell">
    <header class="wizhead">
      <div>
        <h1>Fill My Documents</h1>
        <p>Income Tax Return · Tax Year ${form.year} · Salaried individual</p>
      </div>
      <span class="savepill">${icon('save', 15)} Draft saved automatically</span>
    </header>

    <nav class="stepper" aria-label="Progress">
      ${steps.map((st, k) => `
        <button class="step ${k === i ? 'is-current' : ''} ${k < i || (wiz.visited.has(k) && k !== i) ? 'is-done' : ''}"
                data-goto="${k}" ${k > i && !wiz.visited.has(k) ? 'disabled' : ''}
                ${k === i ? 'aria-current="step"' : ''}>
          <span class="step__n">${k < i ? icon('check', 14) : k + 1}</span>
          <span class="step__l"><span class="step__k">${st.kicker}</span><span class="step__t">${st.title}</span></span>
        </button>`).join('')}
    </nav>

    <div class="wizgrid">
      <form class="card formcard" id="wizForm" novalidate>
        <div class="callout callout--warn errsummary ${wiz.shownErrors && errs.length ? 'is-on' : ''}" id="errSummary" tabindex="-1">
          <div class="callout__ico">${icon('alert', 18)}</div>
          <div><div class="callout__t">${errs.length} field${errs.length === 1 ? '' : 's'} need${errs.length === 1 ? 's' : ''} attention</div>
          <ul>${errs.map(x => `<li><a href="#f_${x.f.n}" data-jump="${x.f.n}">${x.f.l}</a> — ${x.e}</li>`).join('')}</ul></div>
        </div>

        ${i === 3 ? reviewHTML() : `
        <div class="formsec">
          <h3 class="formsec__t">${s.heading}</h3>
          <p class="formsec__d">${s.desc}</p>
          <div class="fields">${s.fields.map(fieldHTML).join('')}</div>
        </div>`}

        <div class="wizfoot">
          <span class="wizfoot__l">${i === 3 ? 'Nothing is sent to FBR from this screen.' : `<span class="field__req">*</span> Required — you cannot continue without these.`}</span>
          <div style="display:flex;gap:10px">
            ${i > 0 ? `<button type="button" class="btn btn--ghost" data-goto="${i - 1}">${icon('arrowL', 16)} Back</button>` : ''}
            ${i === 3
              ? `<button type="button" class="btn btn--primary" id="generate">${icon('fileCheck', 17)} Generate document</button>`
              : `<button type="button" class="btn btn--primary" id="next">Continue ${icon('arrowR', 16)}</button>`}
          </div>
        </div>
      </form>

      <aside class="wizside">
        <div class="card calcbox">
          <div class="calcbox__t">Running estimate</div>
          <div class="calcrow"><span>Gross income</span><b id="c_gross">—</b></div>
          <div class="calcrow"><span>Less deductions</span><b id="c_deduct">—</b></div>
          <div class="calcrow"><span>Taxable income</span><b id="c_taxable">—</b></div>
          <div class="calcrow"><span>Tax on slabs</span><b id="c_tax">—</b></div>
          <div class="calcrow"><span>Already withheld</span><b id="c_paid">—</b></div>
          <div class="calcrow calcrow--total"><span id="c_label">Balance payable</span><b id="c_total">—</b></div>
          <p class="calcbox__note">Updates as you type. An estimate for guidance — the figure on your filed return is what counts.</p>
        </div>
        <div class="askcard">
          <span class="askcard__ico">${icon('sparkles', 19)}</span>
          <h3>Not sure about a field?</h3>
          <p>Ask Rehnuma where a number comes from, or what an allowance counts as.</p>
          <button class="btn btn--sm" id="wizAsk">Open the AI Guide ${icon('arrowR', 15)}</button>
        </div>
      </aside>
    </div>
  </div>`;
}

/* ------------------------------- behaviour ------------------------------- */
export function bindWizard(root, ctx) {
  const paint = () => {
    const c = computed(), owed = c.balance >= 0;
    const set = (id, v) => { const el = root.querySelector(id); if (el) el.textContent = v; };
    set('#c_gross', PKR(c.gross)); set('#c_deduct', '− ' + PKR(c.deduct));
    set('#c_taxable', PKR(c.taxable)); set('#c_tax', PKR(c.gross_tax));
    set('#c_paid', '− ' + PKR(c.paid));
    set('#c_label', owed ? 'Balance payable' : 'Refund due');
    set('#c_total', PKR(Math.abs(Math.round(c.balance))));
  };
  paint();

  const revalidate = name => {
    const f = steps[wiz.step].fields.find(x => x.n === name);
    if (!f) return;
    const wrap = root.querySelector(`[data-field="${name}"]`);
    if (!wrap) return;
    const e = invalid(f);
    if (wrap.classList.contains('is-invalid') || wiz.shownErrors) {
      wrap.classList.toggle('is-invalid', !!e);
      if (e) wrap.querySelector('.field__err span').textContent = e;
    }
  };

  root.querySelectorAll('[data-in]').forEach(el => {
    const name = el.dataset.in;
    const read = () => { form[name] = el.type === 'checkbox' ? el.checked : el.value; paint(); revalidate(name); };
    el.addEventListener('input', read);
    el.addEventListener('change', read);
    el.addEventListener('blur', () => {
      const f = steps[wiz.step].fields.find(x => x.n === name);
      const e = f && invalid(f);
      const wrap = root.querySelector(`[data-field="${name}"]`);
      if (wrap) { wrap.classList.toggle('is-invalid', !!e); if (e) wrap.querySelector('.field__err span').textContent = e; }
    });
  });

  // step navigation — forward is gated on validation
  const goto = k => { wiz.step = k; wiz.visited.add(k); wiz.shownErrors = false; ctx.rerender(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  root.querySelectorAll('[data-goto]').forEach(b =>
    b.addEventListener('click', () => goto(+b.dataset.goto)));

  root.querySelector('#next')?.addEventListener('click', () => {
    const errs = stepErrors(wiz.step);
    if (errs.length) {
      wiz.shownErrors = true;
      errs.forEach(x => {
        const w = root.querySelector(`[data-field="${x.f.n}"]`);
        if (w) { w.classList.add('is-invalid'); w.querySelector('.field__err span').textContent = x.e; }
      });
      const sum = root.querySelector('#errSummary');
      sum.classList.add('is-on');
      sum.querySelector('.callout__t').textContent = `${errs.length} field${errs.length === 1 ? '' : 's'} need${errs.length === 1 ? 's' : ''} attention`;
      sum.querySelector('ul').innerHTML = errs.map(x => `<li><a href="#f_${x.f.n}" data-jump="${x.f.n}">${x.f.l}</a> — ${x.e}</li>`).join('');
      sum.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', ev => {
        ev.preventDefault(); root.querySelector('#f_' + a.dataset.jump)?.focus();
      }));
      sum.scrollIntoView({ behavior: 'smooth', block: 'center' });
      sum.focus();
      return;
    }
    goto(wiz.step + 1);
  });

  root.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault(); root.querySelector('#f_' + a.dataset.jump)?.focus();
  }));

  root.querySelector('#generate')?.addEventListener('click', () => { location.hash = '#/file/preview'; });
  root.querySelector('#wizAsk')?.addEventListener('click', () => ctx.openAI());

  // "where do I find this" tooltips
  let open = null;
  const close = () => { open?.el.remove(); open?.btn.setAttribute('aria-expanded', 'false'); open = null; };
  root.querySelectorAll('[data-tip]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const was = open?.btn === btn;
      close();
      if (was) return;
      const f = steps[wiz.step].fields.find(x => x.n === btn.dataset.tip);
      const el = document.createElement('div');
      el.className = 'tip'; el.setAttribute('role', 'tooltip');
      el.innerHTML = f.tip.replace('AI Guide', '<a href="#" data-tipai>AI Guide</a>');
      document.body.appendChild(el);
      const r = btn.getBoundingClientRect();
      const w = el.offsetWidth;
      let left = r.left + r.width / 2 - 26;
      left = Math.min(Math.max(12, left), window.innerWidth - w - 12);
      el.style.left = left + 'px';
      el.style.top = (r.bottom + window.scrollY + 10) + 'px';
      el.style.setProperty('--tip-x', (r.left + r.width / 2 - left - 5) + 'px');
      el.querySelector('[data-tipai]')?.addEventListener('click', ev => {
        ev.preventDefault(); close();
        ctx.openAI(`Where do I find "${f.l}"?`);
      });
      btn.setAttribute('aria-expanded', 'true');
      open = { el, btn };
    });
  });
  const onDoc = e => { if (open && !open.el.contains(e.target)) close(); };
  const onEsc = e => { if (e.key === 'Escape' && open) { const b = open.btn; close(); b.focus(); } };
  document.addEventListener('click', onDoc);
  document.addEventListener('keydown', onEsc);
  ctx.onLeave(() => { close(); document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onEsc); });
}
