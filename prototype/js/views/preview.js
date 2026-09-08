import { icon } from '../icons.js';
import { form, computed } from './wizard.js';

const PKR = n => Number(Math.round(n || 0)).toLocaleString('en-PK');
const or = (v, alt) => (v === undefined || String(v).trim() === '') ? alt : v;
const state = { confirmed: false };

export function preview() {
  const c = computed();
  const owed = c.balance >= 0;
  const rows = [
    ['Salary and taxable allowances', (+form.salary || 0) + (+form.allowances || 0)],
    ['Income from business or profession', +form.business || 0],
    ['Income from property', +form.rent || 0],
    ['Profit on debt', +form.profit || 0],
  ];

  return `
  <div class="shell docwrap">
    <nav class="crumbs" style="padding-top:0">
      <a href="#/">Home</a>${icon('chevronR', 13)}
      <a href="#/file">Fill My Documents</a>${icon('chevronR', 13)}
      <span aria-current="page">Preview & verify</span>
    </nav>

    <div class="docbar" style="margin-top:18px">
      <span class="docbar__t">${icon('file', 18)} Income Tax Return — Tax Year ${form.year}</span>
      <span class="badge badge--danger">${icon('alert', 13)} Unverified draft</span>
      <button class="btn btn--ghost btn--sm" id="backEdit">${icon('pencil', 15)} Edit answers</button>
    </div>

    <div class="docframe">
      <div class="docpage">
        <div class="watermark" aria-hidden="true">
          <div class="watermark__inner">
            ${Array.from({ length: 4 }, () => `<div class="watermark__row">DO NOT USE &nbsp;&nbsp; DO NOT USE</div>`).join('')}
          </div>
        </div>

        <header class="doc__crest">
          <span class="seal">${icon('landmark', 22)}</span>
          <div>
            <div class="doc__org">Federal Board of Revenue · Government of Pakistan</div>
            <div class="doc__title">Return of Income — Salaried Individual</div>
            <div class="doc__sub">Under section 114 of the Income Tax Ordinance, 2001</div>
          </div>
          <div class="doc__ref">Tax year<b>${form.year}</b>Prepared<b>${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</b></div>
        </header>

        <div class="doc__block">
          <div class="doc__blockt">Part I — Taxpayer particulars</div>
          <div class="doc__pairs">
            <div class="doc__pair"><span>Name</span><b>${or(form.name, '—')}</b></div>
            <div class="doc__pair"><span>CNIC</span><b>${or(form.cnic, '—')}</b></div>
            <div class="doc__pair"><span>NTN</span><b>${or(form.ntn, or(String(form.cnic || '').slice(0, 7), '—'))}</b></div>
            <div class="doc__pair"><span>Residential status</span><b>${or(form.status, 'Resident')}</b></div>
            <div class="doc__pair"><span>Email</span><b>${or(form.email, '—')}</b></div>
            <div class="doc__pair"><span>Period</span><b>01 Jul – 30 Jun</b></div>
          </div>
        </div>

        <div class="doc__block">
          <div class="doc__blockt">Part II — Computation of taxable income</div>
          <table class="doc__ledger">
            ${rows.map(([l, v]) => `<tr><td>${l}</td><td>${PKR(v)}</td></tr>`).join('')}
            <tr><td>Less: deductible allowances (zakat, pension)</td><td>(${PKR(c.deduct)})</td></tr>
            <tr class="is-total"><td>Taxable income</td><td>${PKR(c.taxable)}</td></tr>
          </table>
        </div>

        <div class="doc__block">
          <div class="doc__blockt">Part III — Computation of tax</div>
          <table class="doc__ledger">
            <tr><td>Tax chargeable on slabs</td><td>${PKR(c.gross_tax)}</td></tr>
            <tr><td>Less: tax credits claimed</td><td>(${PKR(c.credits)})</td></tr>
            <tr><td>Less: tax deducted at source (§149)</td><td>(${PKR(c.paid)})</td></tr>
            <tr class="is-total"><td>${owed ? 'Balance tax payable' : 'Refund claimed'}</td><td>${PKR(Math.abs(c.balance))}</td></tr>
          </table>
        </div>

        <div class="doc__sign">
          <div class="doc__signline">Signature of taxpayer</div>
          <div class="doc__signline">Date</div>
        </div>
      </div>
    </div>

    <section class="verify">
      <h2 class="verify__t">Verify before you download</h2>
      <p class="verify__d">The watermark is removed once you confirm. TaxIt does not submit anything to FBR — you file the downloaded document yourself through IRIS.</p>

      <div class="verify__gate ${state.confirmed ? 'is-ok' : ''}" id="gate">
        <label class="check">
          <input type="checkbox" id="confirmBox" ${state.confirmed ? 'checked' : ''} />
          <span class="check__box">${icon('check', 14)}</span>
          <span class="check__text">I confirm all details are correct and I take responsibility for any mistakes.</span>
        </label>
      </div>

      <div class="verify__foot">
        <span class="verify__state ${state.confirmed ? 'is-ok' : ''}" id="gateState">
          ${state.confirmed ? icon('checkCircle', 16) + ' Confirmed — download unlocked' : icon('info', 16) + ' Confirmation required before download'}
        </span>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn--ghost" id="printBtn">${icon('print', 16)} Print preview</button>
          <button class="btn btn--primary" id="dlBtn" ${state.confirmed ? '' : 'disabled'}>${icon('download', 17)} Download document</button>
        </div>
      </div>
    </section>
  </div>`;
}

export function bindPreview(root, ctx) {
  const box = root.querySelector('#confirmBox');
  const dl = root.querySelector('#dlBtn');
  const gate = root.querySelector('#gate');
  const st = root.querySelector('#gateState');

  box?.addEventListener('change', () => {
    state.confirmed = box.checked;
    dl.disabled = !box.checked;
    gate.classList.toggle('is-ok', box.checked);
    st.classList.toggle('is-ok', box.checked);
    st.innerHTML = box.checked
      ? icon('checkCircle', 16) + ' Confirmed — download unlocked'
      : icon('info', 16) + ' Confirmation required before download';
  });

  dl?.addEventListener('click', () => {
    ctx.toast('Saved to Document Library · Tax Year ' + form.year);
    setTimeout(() => { location.hash = '#/library'; }, 900);
  });
  root.querySelector('#printBtn')?.addEventListener('click', () => ctx.toast('Print is disabled while the draft is watermarked'));
  root.querySelector('#backEdit')?.addEventListener('click', () => { location.hash = '#/file'; });
}
