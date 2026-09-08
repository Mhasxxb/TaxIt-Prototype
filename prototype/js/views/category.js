import { icon } from '../icons.js';
import { byslug } from '../data.js';

const ICOS = { bulb: icon('bulb', 18), alert: icon('alert', 18), scale: icon('scale', 18) };
const fill = h => h.replace(/__ICO_(\w+)__/g, (_, k) => ICOS[k] || '');

export function category(slug) {
  const c = byslug[slug];
  if (!c) return `<div class="shell"><div class="empty"><h3>Guide not found</h3><p>That tax category doesn't exist yet.</p><a class="btn btn--primary" href="#/learn">Back to Learn</a></div></div>`;

  return `
  <div class="shell">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="#/">Home</a>${icon('chevronR', 13)}
      <a href="#/learn">Learn</a>${icon('chevronR', 13)}
      <span aria-current="page">${c.name}</span>
    </nav>

    <div class="article">
      <div>
        <header class="arthead">
          <h1>${c.name}</h1>
          <p class="arthead__lede">${c.lede}</p>
          <div class="arthead__meta">
            <span class="badge badge--emerald">${icon('book', 13)} Guide</span>
            <span class="sep">${c.read} read</span><span class="sep">·</span>
            <span class="sep">Updated ${c.updated}</span>
          </div>
        </header>

        <section class="card facts">
          <div class="facts__head">${icon('shield', 15)} Key facts</div>
          <div class="facts__grid">
            ${c.facts.map(f => `
              <div class="fact ${f.gold ? 'fact--gold' : ''}">
                <div class="fact__k">${f.k}</div>
                <div class="fact__v">${f.v} <small>${f.s}</small></div>
              </div>`).join('')}
          </div>
          <div class="facts__foot">${icon('info', 14)} ${c.factNote}</div>
        </section>

        <article class="prose" id="prose">
          ${c.sections.map(s => `<section id="${s.id}"><h2>${s.t}</h2>${fill(s.h)}</section>`).join('')}
        </article>
      </div>

      <aside class="side">
        <nav class="card toc" aria-label="On this page">
          <div class="toc__t">On this page</div>
          <ul>${c.sections.map((s, i) => `<li><a href="#${s.id}" data-toc="${s.id}" class="${i === 0 ? 'is-active' : ''}">${s.t}</a></li>`).join('')}</ul>
        </nav>

        <div class="askcard">
          <span class="askcard__ico">${icon('sparkles', 19)}</span>
          <h3>Ask the AI Guide</h3>
          <p>Stuck on how this applies to your own numbers? Rehnuma answers with the section it came from.</p>
          <button class="btn btn--sm" id="askGuide" data-topic="${c.slug}">Open the AI Guide ${icon('arrowR', 15)}</button>
        </div>

        <div class="card nextcard">
          <div class="nextcard__t">Related</div>
          ${c.related.map(r => `<a class="nextlink" href="#/tax/${r}">${icon(byslug[r].icon, 17)} ${byslug[r].name} ${icon('chevronR', 15)}</a>`).join('')}
        </div>
      </aside>
    </div>
  </div>`;
}

export function bindCategory(root, ctx, slug) {
  root.querySelector('#askGuide')?.addEventListener('click', () =>
    ctx.openAI(null, { topic: slug, greet: `You're reading the ${byslug[slug].name} guide. Ask me anything in it — I'll point at the exact section.` }));

  // scroll-spy for the table of contents
  const links = [...root.querySelectorAll('[data-toc]')];
  const secs = links.map(a => root.querySelector('#' + a.dataset.toc)).filter(Boolean);
  if (!secs.length) return;
  const spy = () => {
    const y = window.scrollY + 140;
    let cur = secs[0];
    for (const s of secs) if (s.offsetTop <= y) cur = s;
    links.forEach(a => a.classList.toggle('is-active', a.dataset.toc === cur.id));
  };
  spy();
  window.addEventListener('scroll', spy, { passive: true });
  ctx.onLeave(() => window.removeEventListener('scroll', spy));
}
