import { icon } from '../icons.js';
import { categories, user } from '../data.js';

export function home() {
  return `
  <section class="hero">
    <div class="shell">
      <span class="hero__eyebrow">
        <span class="badge badge--emerald">${icon('checkCircle', 13)} ${user.status}</span>
        Active Taxpayers List · updated Sunday
      </span>
      <h1>Assalam-o-alaikum, ${user.name.split(' ')[0]}. Let's get your <em>tax year</em> in order.</h1>
      <p class="hero__sub">Plain explanations of how tax works in Pakistan, and guided forms that turn what you know into documents you can file.</p>
      <div class="search hero__search">
        <span class="search__ico">${icon('search', 19)}</span>
        <input class="search__input" id="heroSearch" type="search" placeholder="Search a rate, a section, or a deadline…" aria-label="Search tax guidance" />
        <button class="btn btn--primary search__go" id="heroGo">Search</button>
      </div>
      <div class="hero__quick">
        <span>Common:</span>
        ${['Salary slabs', 'Filing deadline', 'Buying a plot', 'Bank profit tax']
          .map(q => `<button class="chip" data-ask="${q}">${q}</button>`).join('')}
      </div>
    </div>
  </section>

  <section class="shell">
    <div class="sechead">
      <div>
        <h2>Browse by tax</h2>
        <p>Six heads cover almost everything an individual or small business deals with.</p>
      </div>
      <a class="btn btn--ghost btn--sm" href="#/library">${icon('folder', 16)} My documents</a>
    </div>
    <div class="catgrid">
      ${categories.map(c => `
        <article class="card catcard ${c.tone === 'gold' ? 'catcard--gold' : ''}">
          <span class="catcard__ico">${icon(c.icon, 22)}</span>
          <h3>${c.name}</h3>
          <p class="catcard__rate">${c.rate}</p>
          <p class="catcard__d">${c.blurb}</p>
          <div class="catcard__foot">
            <a class="btn btn--link" href="#/tax/${c.slug}">Learn more ${icon('arrowR', 16)}</a>
            <span class="badge">${c.read}</span>
          </div>
        </article>`).join('')}
    </div>
  </section>`;
}

export function bindHome(root, ctx) {
  const go = () => {
    const q = root.querySelector('#heroSearch')?.value.trim();
    if (q) ctx.openAI(q);
  };
  root.querySelector('#heroGo')?.addEventListener('click', go);
  root.querySelector('#heroSearch')?.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  root.querySelectorAll('[data-ask]').forEach(b =>
    b.addEventListener('click', () => ctx.openAI(b.dataset.ask)));
}
