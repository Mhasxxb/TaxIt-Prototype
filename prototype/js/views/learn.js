import { icon } from '../icons.js';
import { categories } from '../data.js';

export function learn() {
  return `
  <div class="shell">
    <div class="learnhead">
      <h1>Learn</h1>
      <p>Every guide is written the same way: what the tax is, who it applies to, what it costs, and when it is due. No section is cited without a plain-language sentence explaining it.</p>
    </div>
    <div class="catgrid">
      ${categories.map(c => `
        <article class="card catcard ${c.tone === 'gold' ? 'catcard--gold' : ''}">
          <span class="catcard__ico">${icon(c.icon, 22)}</span>
          <h3>${c.name}</h3>
          <p class="catcard__rate">Updated ${c.updated} · ${c.read} read</p>
          <p class="catcard__d">${c.lede}</p>
          <div class="catcard__foot">
            <a class="btn btn--link" href="#/tax/${c.slug}">Read the guide ${icon('arrowR', 16)}</a>
          </div>
        </article>`).join('')}
    </div>
  </div>`;
}
