import { icon } from '../icons.js';
import { folders, files } from '../data.js';

const state = { q: '', empty: false, items: [...files] };

const fileIco = t => t === 'xls'
  ? `<span class="filerow__ico filerow__ico--xls">${icon('receipt', 18)}</span>`
  : `<span class="filerow__ico filerow__ico--pdf">${icon('file', 18)}</span>`;

const badge = s => s === 'Filed' ? `<span class="badge badge--emerald">${icon('checkCircle', 12)} Filed</span>`
  : s === 'Draft' ? `<span class="badge badge--gold">${icon('pencil', 12)} Draft</span>`
  : `<span class="badge">${icon('folder', 12)} Reference</span>`;

function rows() {
  const q = state.q.toLowerCase();
  const list = state.empty ? [] : state.items.filter(f => !q || f.n.toLowerCase().includes(q) || f.m.toLowerCase().includes(q));
  if (!list.length) return emptyState(q);
  return `
    <div class="listhead"><span></span><span>Name</span><span>Status</span><span>Modified</span><span></span></div>
    ${list.map((f, i) => `
      <div class="filerow" data-row="${i}">
        ${fileIco(f.t)}
        <div><div class="filerow__n">${f.n}</div><div class="filerow__m">${f.m}</div></div>
        <span class="filerow__st">${badge(f.s)}</span>
        <span class="filerow__d">${f.d}</span>
        <span class="filerow__s"><button class="iconbtn" data-menu="${f.n}" aria-label="Actions for ${f.n}" aria-haspopup="menu">${icon('dots', 18)}</button></span>
      </div>`).join('')}`;
}

function emptyState(q) {
  if (q) return `<div class="empty">
      <h3>No documents match “${q}”</h3>
      <p>Try the file name, the tax year, or the challan number.</p>
      <button class="btn btn--ghost" data-clear>Clear search</button></div>`;
  return `<div class="empty">
    <div class="empty__art">
      <svg viewBox="0 0 132 116" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 40a6 6 0 0 1 6-6h28l8 9h60a6 6 0 0 1 6 6v51a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6z"/>
        <path d="M14 58h104" opacity=".5"/>
        <rect x="40" y="8" width="52" height="34" rx="5" fill="var(--bg-surface)"/>
        <path d="M50 20h32M50 28h22" stroke-width="2"/>
        <circle cx="102" cy="26" r="12" fill="var(--bg-surface)" stroke="var(--emerald)" stroke-width="2"/>
        <path d="m97 26 4 4 7-8" stroke="var(--emerald)" stroke-width="2.4"/>
      </svg>
    </div>
    <h3>Nothing filed here yet</h3>
    <p>Documents you generate land here automatically, sorted into the tax year they belong to. You can also upload salary certificates and CPR challans for reference.</p>
    <a class="btn btn--primary" href="#/file">${icon('plus', 17)} Prepare a document</a>
  </div>`;
}

export function library() {
  return `
  <div class="shell">
    <header class="libhead">
      <div>
        <h1>Document Library</h1>
        <p>Everything you have generated or uploaded, kept for the six years FBR can ask about it.</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn--ghost" id="toggleEmpty">${icon('eye', 16)} ${state.empty ? 'Show my files' : 'Preview empty state'}</button>
        <button class="btn btn--primary" id="newFolder">${icon('folderPlus', 17)} New folder</button>
      </div>
    </header>

    <div class="libtools">
      <div class="search search--sm">
        <span class="search__ico">${icon('search', 17)}</span>
        <input class="search__input" id="libSearch" type="search" placeholder="Search documents…" value="${state.q}" aria-label="Search documents" />
      </div>
      <button class="btn btn--ghost btn--sm">${icon('filter', 15)} All types</button>
      <button class="btn btn--ghost btn--sm">${icon('calendar', 15)} Any date</button>
    </div>

    ${state.empty ? '' : `
    <div class="foldergrid" id="folderGrid">
      ${folders.map(f => `
        <button class="folder ${f.tone === 'gold' ? 'folder--gold' : ''}">
          <span class="folder__ico">${icon('folder', 20)}</span>
          <span><span class="folder__n">${f.n}</span><span class="folder__c">${f.c} documents</span></span>
        </button>`).join('')}
    </div>`}

    <div class="sechead"><div><h2>${state.empty ? 'Your documents' : 'Recent documents'}</h2></div></div>
    <div class="filelist" id="fileList">${rows()}</div>
  </div>`;
}

export function bindLibrary(root, ctx) {
  const list = root.querySelector('#fileList');
  const repaint = () => { list.innerHTML = rows(); wire(); };

  const search = root.querySelector('#libSearch');
  search?.addEventListener('input', () => { state.q = search.value; repaint(); });

  root.querySelector('#toggleEmpty')?.addEventListener('click', () => {
    state.empty = !state.empty; state.q = ''; ctx.rerender();
  });

  root.querySelector('#newFolder')?.addEventListener('click', () => {
    const n = prompt('Folder name');
    if (n && n.trim()) { folders.push({ n: n.trim(), c: 0, tone: '' }); ctx.rerender(); ctx.toast(`Folder “${n.trim()}” created`); }
  });

  let menu = null;
  const close = () => { menu?.remove(); menu = null; };

  function wire() {
    list.querySelector('[data-clear]')?.addEventListener('click', () => { state.q = ''; ctx.rerender(); });
    list.querySelectorAll('[data-menu]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const name = btn.dataset.menu;
        close();
        menu = document.createElement('div');
        menu.className = 'menu'; menu.setAttribute('role', 'menu');
        menu.innerHTML = `
          <button data-a="rename">${icon('pencil', 16)} Rename</button>
          <button data-a="move">${icon('moveTo', 16)} Move to folder…</button>
          <button data-a="download">${icon('download', 16)} Download</button>
          <hr/>
          <button data-a="delete" class="btn--danger" style="color:var(--danger)">${icon('trash', 16)} Delete</button>`;
        document.body.appendChild(menu);
        const r = btn.getBoundingClientRect();
        menu.style.top = Math.min(r.bottom + 6, window.innerHeight - menu.offsetHeight - 12) + 'px';
        menu.style.left = Math.max(12, r.right - menu.offsetWidth) + 'px';
        menu.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => {
          const a = b.dataset.a;
          close();
          if (a === 'delete') {
            if (confirm(`Delete “${name}”? This cannot be undone.`)) {
              state.items = state.items.filter(f => f.n !== name); repaint(); ctx.toast('Document deleted');
            }
          } else if (a === 'rename') {
            const v = prompt('Rename document', name);
            if (v && v.trim()) { const f = state.items.find(x => x.n === name); f.n = v.trim(); repaint(); ctx.toast('Renamed'); }
          } else if (a === 'move') { ctx.toast('Moved to Tax Year 2026'); }
          else { ctx.toast('Download started'); }
        }));
      });
    });
  }
  wire();

  const onDoc = () => close();
  const onEsc = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('click', onDoc);
  document.addEventListener('keydown', onEsc);
  ctx.onLeave(() => { close(); document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onEsc); });
}
