/* ============================================================
   PARK SCOUT AWARDS 2026 — ROBLOX TPT2
   app.js — Core Application Logic
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════════════════════════ */
const DEFAULT_CONFIG = {
  password: 'admin2026',
  siteName: 'Park Scout Awards 2026',
  subtitle: 'Roblox — Theme Park Tycoon 2',
  votingOpen: true,
  parks: [
    { id: 'park_1', name: 'Dreamland Resort', image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400' },
    { id: 'park_2', name: 'Neon Valley Park',  image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400' },
    { id: 'park_3', name: 'Crystal Kingdom',   image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400' }
  ],
  categories: [
    {
      id: 'cat_coaster', icon: '🎢',
      name: 'Best Roller Coaster',
      nominees: [
        { id: 'n1', name: 'Thunder Dragon', park: 'Dreamland Resort', image: '' },
        { id: 'n2', name: 'Neon Rush',      park: 'Neon Valley Park',  image: '' },
        { id: 'n3', name: 'Crystal Fury',   park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_dark', icon: '🌑',
      name: 'Best Dark Ride',
      nominees: [
        { id: 'n4', name: 'Phantom Chase',    park: 'Dreamland Resort', image: '' },
        { id: 'n5', name: 'The Void Escape',  park: 'Neon Valley Park',  image: '' },
        { id: 'n6', name: 'Crystal Depths',   park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_flat', icon: '🌀',
      name: 'Best Flat Ride',
      nominees: [
        { id: 'n7', name: 'Gravity Spin',   park: 'Dreamland Resort', image: '' },
        { id: 'n8', name: 'Neon Whirl',     park: 'Neon Valley Park',  image: '' }
      ]
    },
    {
      id: 'cat_water', icon: '💧',
      name: 'Best Water Ride',
      nominees: [
        { id: 'n9',  name: 'Tidal Wave',   park: 'Dreamland Resort', image: '' },
        { id: 'n10', name: 'Crystal Falls', park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_food', icon: '🍔',
      name: 'Best Food & Beverage',
      nominees: [
        { id: 'n11', name: 'Dreamland Grill',    park: 'Dreamland Resort', image: '' },
        { id: 'n12', name: 'Neon Bites',          park: 'Neon Valley Park',  image: '' },
        { id: 'n13', name: 'Crystal Café',         park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_show', icon: '🎭',
      name: 'Best Show & Entertainment',
      nominees: [
        { id: 'n14', name: 'Lights of Dreamland', park: 'Dreamland Resort', image: '' },
        { id: 'n15', name: 'Neon Nights Parade',   park: 'Neon Valley Park',  image: '' }
      ]
    },
    {
      id: 'cat_theming', icon: '🏰',
      name: 'Best Theme Area / Land',
      nominees: [
        { id: 'n16', name: 'Dragon Realm',   park: 'Dreamland Resort', image: '' },
        { id: 'n17', name: 'Cyber District',  park: 'Neon Valley Park',  image: '' },
        { id: 'n18', name: 'Ice Pinnacle',    park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_new', icon: '✨',
      name: 'Best New Attraction',
      nominees: [
        { id: 'n19', name: 'Hyper Loop X',     park: 'Dreamland Resort', image: '' },
        { id: 'n20', name: 'Neon Skyrise',      park: 'Neon Valley Park',  image: '' }
      ]
    },
    {
      id: 'cat_family', icon: '👨‍👩‍👧',
      name: 'Best Family Attraction',
      nominees: [
        { id: 'n21', name: 'Balloon Safari',    park: 'Dreamland Resort', image: '' },
        { id: 'n22', name: 'Pixel Playground',   park: 'Neon Valley Park',  image: '' },
        { id: 'n23', name: 'Crystal Adventure',  park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_scenery', icon: '🎨',
      name: 'Best Scenery & Theming',
      nominees: [
        { id: 'n24', name: 'Enchanted Forest',  park: 'Dreamland Resort', image: '' },
        { id: 'n25', name: 'Holographic Bay',    park: 'Neon Valley Park',  image: '' }
      ]
    },
    {
      id: 'cat_overall', icon: '🏆',
      name: 'Best Park Overall',
      nominees: [
        { id: 'n26', name: 'Dreamland Resort', park: 'Dreamland Resort', image: '' },
        { id: 'n27', name: 'Neon Valley Park',  park: 'Neon Valley Park',  image: '' },
        { id: 'n28', name: 'Crystal Kingdom',   park: 'Crystal Kingdom',   image: '' }
      ]
    },
    {
      id: 'cat_experience', icon: '⭐',
      name: 'Best Guest Experience',
      nominees: [
        { id: 'n29', name: 'Dreamland Resort', park: 'Dreamland Resort', image: '' },
        { id: 'n30', name: 'Crystal Kingdom',   park: 'Crystal Kingdom',   image: '' }
      ]
    }
  ]
};

/* ══════════════════════════════════════════════════════════
   STORAGE HELPERS
══════════════════════════════════════════════════════════ */
const STORAGE_KEYS = {
  config: 'psa2026_config',
  votes:  'psa2026_votes',
  voter:  'psa2026_voter_id'
};

function getConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.config);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_CONFIG)); }
}

function saveConfig(cfg) {
  localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(cfg));
}

function getVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.votes);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveVotes(v) {
  localStorage.setItem(STORAGE_KEYS.votes, JSON.stringify(v));
}

function getVoterId() {
  let id = localStorage.getItem(STORAGE_KEYS.voter);
  if (!id) {
    id = 'v_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.voter, id);
  }
  return id;
}

/* ══════════════════════════════════════════════════════════
   VOTE HELPERS
══════════════════════════════════════════════════════════ */
function getUserVotes() {
  const vid = getVoterId();
  const allVotes = getVotes();
  return allVotes[vid] || {};
}

function castVote(categoryId, nomineeId) {
  const vid = getVoterId();
  const allVotes = getVotes();
  if (!allVotes[vid]) allVotes[vid] = {};
  allVotes[vid][categoryId] = nomineeId;
  saveVotes(allVotes);
}

function getTallyForCategory(categoryId) {
  const allVotes = getVotes();
  const tally = {};
  for (const vid in allVotes) {
    const pick = allVotes[vid][categoryId];
    if (pick) tally[pick] = (tally[pick] || 0) + 1;
  }
  return tally;
}

function getTotalVoters() {
  return Object.keys(getVotes()).length;
}

function getCategoriesVoted() {
  const userVotes = getUserVotes();
  return Object.keys(userVotes).length;
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
let toastTimer = null;

function showToast(icon, title, body) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-icon').textContent = icon;
  t.querySelector('.toast-text strong').textContent = title;
  t.querySelector('.toast-text span').textContent = body;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ══════════════════════════════════════════════════════════
   MAIN INDEX PAGE — VOTING UI
══════════════════════════════════════════════════════════ */
function initVotingPage() {
  const cfg = getConfig();
  updateHeroStats();

  // Render category tabs
  const tabsContainer  = document.getElementById('categoryTabs');
  const panelsContainer = document.getElementById('categoryPanels');
  if (!tabsContainer || !panelsContainer) return;

  tabsContainer.innerHTML  = '';
  panelsContainer.innerHTML = '';

  cfg.categories.forEach((cat, i) => {
    // Tab button
    const tab = document.createElement('button');
    tab.className = 'cat-tab' + (i === 0 ? ' active' : '');
    tab.dataset.cat = cat.id;
    tab.innerHTML = `<span class="cat-tab-icon">${cat.icon || '🎡'}</span>${cat.name}`;
    tab.addEventListener('click', () => switchCategory(cat.id));
    tabsContainer.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'nominees-panel' + (i === 0 ? ' active' : '');
    panel.id = 'panel_' + cat.id;
    panel.innerHTML = buildNomineesGrid(cat);
    panelsContainer.appendChild(panel);
  });

  // Wire vote buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.vote-btn[data-cat][data-nom]');
    if (!btn) return;
    handleVote(btn.dataset.cat, btn.dataset.nom, btn.dataset.nomName, btn.dataset.catName);
  });
}

function buildNomineesGrid(cat) {
  const userVotes = getUserVotes();
  const myVote    = userVotes[cat.id];

  if (!cat.nominees || cat.nominees.length === 0) {
    return `<div class="nominees-grid">
      <div class="empty-state">
        <div class="empty-state-icon">🏗️</div>
        <p>No nominees added yet for this category.</p>
      </div>
    </div>`;
  }

  const cards = cat.nominees.map(n => {
    const voted = myVote === n.id;
    const imgHtml = n.image
      ? `<img class="card-img" src="${escapeHtml(n.image)}" alt="${escapeHtml(n.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholderHtml = `<div class="card-img-placeholder" style="${n.image ? 'display:none' : ''}">${cat.icon || '🎡'}</div>`;

    return `<div class="nominee-card${voted ? ' voted' : ''}" data-cat="${cat.id}" data-nom="${n.id}">
      <div class="card-img-wrap">
        ${imgHtml}${placeholderHtml}
        <div class="card-voted-badge">✓ My Vote</div>
      </div>
      <div class="card-body">
        <div class="card-park-tag">${escapeHtml(n.park)}</div>
        <div class="card-name">${escapeHtml(n.name)}</div>
        <button class="vote-btn"
          data-cat="${cat.id}"
          data-nom="${n.id}"
          data-nom-name="${escapeHtml(n.name)}"
          data-cat-name="${escapeHtml(cat.name)}"
          ${voted ? '' : ''}>
          ${voted ? '✓ Voted' : 'Cast Vote'}
        </button>
      </div>
    </div>`;
  }).join('');

  return `<div class="nominees-grid">${cards}</div>`;
}

function switchCategory(catId) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === catId));
  document.querySelectorAll('.nominees-panel').forEach(p => p.classList.toggle('active', p.id === 'panel_' + catId));
}

function handleVote(categoryId, nomineeId, nomName, catName) {
  const cfg = getConfig();
  if (!cfg.votingOpen) { showToast('🔒', 'Voting Closed', 'The voting period has ended.'); return; }

  castVote(categoryId, nomineeId);

  // Update UI for this category panel
  const cat = cfg.categories.find(c => c.id === categoryId);
  if (cat) {
    const panel = document.getElementById('panel_' + categoryId);
    if (panel) panel.innerHTML = buildNomineesGrid(cat);
  }

  showToast('🏆', 'Vote Cast!', `You voted for "${nomName}" in ${catName}`);
  updateHeroStats();
}

function updateHeroStats() {
  const cfg = getConfig();
  const totalCats  = cfg.categories.length;
  const totalNoms  = cfg.categories.reduce((s, c) => s + (c.nominees?.length || 0), 0);
  const totalVoters = getTotalVoters();
  const voted       = getCategoriesVoted();

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('stat-categories', totalCats);
  el('stat-nominees',   totalNoms);
  el('stat-voters',     totalVoters);
  el('stat-voted',      `${voted}/${totalCats}`);
}

/* ══════════════════════════════════════════════════════════
   RESULTS PAGE
══════════════════════════════════════════════════════════ */
function initResultsSection() {
  const cfg = getConfig();
  const container = document.getElementById('resultsGrid');
  if (!container) return;

  container.innerHTML = cfg.categories.map(cat => {
    const tally   = getTallyForCategory(cat.id);
    const total   = Object.values(tally).reduce((a, b) => a + b, 0);

    const sorted = (cat.nominees || [])
      .map(n => ({ ...n, votes: tally[n.id] || 0 }))
      .sort((a, b) => b.votes - a.votes);

    const rows = sorted.slice(0, 3).map((n, i) => {
      const pct = total > 0 ? Math.round((n.votes / total) * 100) : 0;
      return `<div class="result-row">
        <span class="result-rank rank-${i+1}">${['🥇','🥈','🥉'][i]}</span>
        <div class="result-bar-wrap">
          <div class="result-name">${escapeHtml(n.name)}</div>
          <div class="result-bar-bg">
            <div class="result-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <span class="result-count">${n.votes}</span>
      </div>`;
    }).join('');

    return `<div class="result-card">
      <div class="result-category">${cat.icon || '🎡'} ${escapeHtml(cat.name)}</div>
      ${rows || '<p style="font-size:0.8rem;color:var(--text-dim)">No votes yet</p>'}
      <div style="margin-top:0.8rem;font-size:0.7rem;color:var(--text-dim);">${total} vote${total !== 1 ? 's' : ''} total</div>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   SETTINGS PAGE LOGIC
══════════════════════════════════════════════════════════ */
function initSettingsPage() {
  loadGeneralSettings();
  renderParksSettings();
  renderCategoriesSettings();
  bindSettingsTabs();
  bindPasswordForm();
}

/* ── Settings Tabs ───────────────────────────────────────── */
function bindSettingsTabs() {
  document.querySelectorAll('.stab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.stab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('stab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

/* ── General Settings ────────────────────────────────────── */
function loadGeneralSettings() {
  const cfg = getConfig();
  const el = id => document.getElementById(id);
  if (el('gs-site-name'))   el('gs-site-name').value   = cfg.siteName   || '';
  if (el('gs-subtitle'))    el('gs-subtitle').value    = cfg.subtitle   || '';
  if (el('gs-voting-open')) el('gs-voting-open').value = cfg.votingOpen ? 'open' : 'closed';
}

function saveGeneralSettings() {
  const cfg = getConfig();
  const el  = id => document.getElementById(id);
  if (el('gs-site-name'))   cfg.siteName   = el('gs-site-name').value.trim();
  if (el('gs-subtitle'))    cfg.subtitle   = el('gs-subtitle').value.trim();
  if (el('gs-voting-open')) cfg.votingOpen = el('gs-voting-open').value === 'open';
  saveConfig(cfg);
  showSaveMsg('save-msg-general');
}

/* ── Password ────────────────────────────────────────────── */
function bindPasswordForm() {
  const btn = document.getElementById('btn-change-pw');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.getElementById('pw-current')?.value;
    const newPw   = document.getElementById('pw-new')?.value;
    const confirm = document.getElementById('pw-confirm')?.value;
    const cfg     = getConfig();
    const errEl   = document.getElementById('pw-error');

    if (current !== cfg.password) {
      if (errEl) { errEl.textContent = 'Current password is incorrect.'; errEl.classList.add('show'); } return;
    }
    if (!newPw || newPw.length < 4) {
      if (errEl) { errEl.textContent = 'Password must be at least 4 characters.'; errEl.classList.add('show'); } return;
    }
    if (newPw !== confirm) {
      if (errEl) { errEl.textContent = 'Passwords do not match.'; errEl.classList.add('show'); } return;
    }
    if (errEl) errEl.classList.remove('show');
    cfg.password = newPw;
    saveConfig(cfg);
    ['pw-current','pw-new','pw-confirm'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
    showSaveMsg('save-msg-pw');
  });
}

/* ── Parks ───────────────────────────────────────────────── */
function renderParksSettings() {
  const cfg = getConfig();
  const container = document.getElementById('parks-list');
  if (!container) return;

  container.innerHTML = cfg.parks.length === 0
    ? '<p style="color:var(--text-muted);font-size:0.85rem;">No parks added yet.</p>'
    : cfg.parks.map(park => `
        <div class="park-item" data-park-id="${park.id}">
          <img class="park-item-img"
               src="${escapeHtml(park.image || '')}"
               alt="${escapeHtml(park.name)}"
               onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%230d1629\\'/></svg>'">
          <div class="park-item-info">
            <div class="park-item-name">${escapeHtml(park.name)}</div>
            <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:6px;word-break:break-all;">${escapeHtml(park.image || 'No image')}</div>
            <button class="btn-danger" onclick="removePark('${park.id}')">🗑 Remove</button>
          </div>
        </div>`).join('');
}

function addPark() {
  const nameEl  = document.getElementById('new-park-name');
  const imgEl   = document.getElementById('new-park-img');
  const name    = nameEl?.value.trim();
  const image   = imgEl?.value.trim();

  if (!name) { alert('Please enter a park name.'); return; }

  const cfg = getConfig();
  cfg.parks.push({ id: 'park_' + Date.now(), name, image: image || '' });
  saveConfig(cfg);
  if (nameEl) nameEl.value = '';
  if (imgEl)  imgEl.value  = '';
  renderParksSettings();
  showSaveMsg('save-msg-parks');
}

function removePark(parkId) {
  if (!confirm('Remove this park? Nominees referencing this park will remain.')) return;
  const cfg = getConfig();
  cfg.parks = cfg.parks.filter(p => p.id !== parkId);
  saveConfig(cfg);
  renderParksSettings();
}

/* ── Categories ──────────────────────────────────────────── */
function renderCategoriesSettings() {
  const cfg = getConfig();
  const container = document.getElementById('categories-list');
  if (!container) return;

  container.innerHTML = cfg.categories.map(cat => `
    <div class="cat-item" id="catitem_${cat.id}">
      <div class="cat-item-header" onclick="toggleCatItem('${cat.id}')">
        <span class="cat-item-icon">${cat.icon || '🎡'}</span>
        <span class="cat-item-name">${escapeHtml(cat.name)}</span>
        <span class="cat-item-count">${(cat.nominees||[]).length} nominees</span>
        <button class="btn-danger" style="margin-left:auto;margin-right:0.5rem;"
          onclick="event.stopPropagation();removeCategory('${cat.id}')">🗑</button>
        <span class="cat-item-toggle">▼</span>
      </div>
      <div class="cat-item-body">
        <div style="display:grid;grid-template-columns:80px 1fr 1fr 1fr;gap:0.5rem;align-items:end;margin:1rem 0 0.8rem;">
          <div>
            <label class="s-label">Icon</label>
            <input class="s-input" id="cat-icon-${cat.id}" value="${escapeHtml(cat.icon||'🎡')}" style="text-align:center;" maxlength="4">
          </div>
          <div style="grid-column:span 3">
            <label class="s-label">Category Name</label>
            <div style="display:flex;gap:0.5rem;">
              <input class="s-input" id="cat-name-${cat.id}" value="${escapeHtml(cat.name)}">
              <button class="btn-add" onclick="updateCategoryMeta('${cat.id}')">Save</button>
            </div>
          </div>
        </div>
        <span class="gold-line-full" style="margin-bottom:1rem;display:block;"></span>
        <div style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.7rem;">Nominees</div>
        <div class="nominee-list" id="nominees-${cat.id}">
          ${renderNomineeItems(cat)}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 2fr auto;gap:0.5rem;align-items:end;margin-top:1rem;">
          <div>
            <label class="s-label">Nominee Name</label>
            <input class="s-input" id="nom-name-${cat.id}" placeholder="e.g. Thunder Dragon">
          </div>
          <div>
            <label class="s-label">Park</label>
            <input class="s-input" id="nom-park-${cat.id}" placeholder="Park name">
          </div>
          <div>
            <label class="s-label">Image URL (optional)</label>
            <input class="s-input" id="nom-img-${cat.id}" placeholder="https://...">
          </div>
          <div>
            <button class="btn-add" onclick="addNominee('${cat.id}')">+ Add</button>
          </div>
        </div>
      </div>
    </div>`).join('');
}

function renderNomineeItems(cat) {
  if (!cat.nominees || cat.nominees.length === 0) {
    return '<p style="font-size:0.8rem;color:var(--text-dim);">No nominees yet.</p>';
  }
  return cat.nominees.map(n => `
    <div class="nominee-item">
      <div class="nominee-item-info">
        <div class="nominee-item-name">${escapeHtml(n.name)}</div>
        <div class="nominee-item-park">${escapeHtml(n.park)}</div>
      </div>
      ${n.image ? `<img src="${escapeHtml(n.image)}" style="width:40px;height:30px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">` : ''}
      <button class="btn-danger" onclick="removeNominee('${cat.id}','${n.id}')">🗑</button>
    </div>`).join('');
}

function toggleCatItem(catId) {
  const el = document.getElementById('catitem_' + catId);
  if (el) el.classList.toggle('expanded');
}

function updateCategoryMeta(catId) {
  const cfg  = getConfig();
  const cat  = cfg.categories.find(c => c.id === catId);
  if (!cat) return;
  const nameEl = document.getElementById('cat-name-' + catId);
  const iconEl = document.getElementById('cat-icon-' + catId);
  if (nameEl) cat.name = nameEl.value.trim() || cat.name;
  if (iconEl) cat.icon = iconEl.value.trim() || cat.icon;
  saveConfig(cfg);
  renderCategoriesSettings();
  const item = document.getElementById('catitem_' + catId);
  if (item) { item.classList.add('expanded'); }
}

function addNominee(catId) {
  const nameEl = document.getElementById('nom-name-' + catId);
  const parkEl = document.getElementById('nom-park-' + catId);
  const imgEl  = document.getElementById('nom-img-'  + catId);
  const name   = nameEl?.value.trim();
  const park   = parkEl?.value.trim();
  const img    = imgEl?.value.trim();

  if (!name || !park) { alert('Please enter both a nominee name and park name.'); return; }

  const cfg = getConfig();
  const cat = cfg.categories.find(c => c.id === catId);
  if (!cat) return;
  if (!cat.nominees) cat.nominees = [];

  cat.nominees.push({ id: 'n_' + Date.now(), name, park, image: img || '' });
  saveConfig(cfg);
  if (nameEl) nameEl.value = '';
  if (parkEl) parkEl.value = '';
  if (imgEl)  imgEl.value  = '';

  const listEl = document.getElementById('nominees-' + catId);
  if (listEl) listEl.innerHTML = renderNomineeItems(cat);

  // update count badge
  const countEl = document.querySelector(`#catitem_${catId} .cat-item-count`);
  if (countEl) countEl.textContent = `${cat.nominees.length} nominees`;
}

function removeNominee(catId, nomineeId) {
  const cfg = getConfig();
  const cat = cfg.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.nominees = (cat.nominees || []).filter(n => n.id !== nomineeId);
  saveConfig(cfg);
  const listEl = document.getElementById('nominees-' + catId);
  if (listEl) listEl.innerHTML = renderNomineeItems(cat);
  const countEl = document.querySelector(`#catitem_${catId} .cat-item-count`);
  if (countEl) countEl.textContent = `${cat.nominees.length} nominees`;
}

function addCategory() {
  const cfg = getConfig();
  cfg.categories.push({
    id:        'cat_' + Date.now(),
    icon:      '🎡',
    name:      'New Category',
    nominees:  []
  });
  saveConfig(cfg);
  renderCategoriesSettings();
  // expand last
  const items = document.querySelectorAll('.cat-item');
  if (items.length) items[items.length - 1].classList.add('expanded');
}

function removeCategory(catId) {
  if (!confirm('Remove this category and all its nominees?')) return;
  const cfg = getConfig();
  cfg.categories = cfg.categories.filter(c => c.id !== catId);
  saveConfig(cfg);
  renderCategoriesSettings();
}

/* ── Reset Votes ─────────────────────────────────────────── */
function resetAllVotes() {
  if (!confirm('⚠️ This will permanently delete ALL votes. Continue?')) return;
  localStorage.removeItem(STORAGE_KEYS.votes);
  localStorage.removeItem(STORAGE_KEYS.voter);
  alert('All votes have been reset.');
}

function resetToDefaults() {
  if (!confirm('⚠️ This will reset ALL settings to defaults and clear all votes. Continue?')) return;
  localStorage.removeItem(STORAGE_KEYS.config);
  localStorage.removeItem(STORAGE_KEYS.votes);
  localStorage.removeItem(STORAGE_KEYS.voter);
  location.reload();
}

/* ── Save Feedback ───────────────────────────────────────── */
function showSaveMsg(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

/* ══════════════════════════════════════════════════════════
   PASSWORD MODAL (index.html → settings.html)
══════════════════════════════════════════════════════════ */
function initPasswordModal() {
  const overlay = document.getElementById('pwModal');
  const input   = document.getElementById('pwInput');
  const errEl   = document.getElementById('pwError');

  document.getElementById('openSettingsBtn')?.addEventListener('click', () => {
    overlay?.classList.add('open');
    setTimeout(() => input?.focus(), 300);
  });

  document.getElementById('pwCancelBtn')?.addEventListener('click', () => {
    overlay?.classList.remove('open');
    if (input) input.value = '';
    errEl?.classList.remove('show');
  });

  document.getElementById('pwSubmitBtn')?.addEventListener('click', () => {
    const cfg = getConfig();
    if (input?.value === cfg.password) {
      sessionStorage.setItem('psa_auth', '1');
      window.location.href = 'settings.html';
    } else {
      input?.classList.add('error');
      if (errEl) errEl.classList.add('show');
      setTimeout(() => { input?.classList.remove('error'); errEl?.classList.remove('show'); }, 2000);
    }
  });

  input?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('pwSubmitBtn')?.click(); });
}

/* ── Guard for Settings Page ─────────────────────────────── */
function guardSettings() {
  if (window.location.pathname.includes('settings') && sessionStorage.getItem('psa_auth') !== '1') {
    window.location.href = 'index.html';
  }
}

/* ══════════════════════════════════════════════════════════
   UTILITY
══════════════════════════════════════════════════════════ */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateId(prefix) {
  return prefix + '_' + Math.random().toString(36).substr(2, 8);
}

/* ══════════════════════════════════════════════════════════
   EXPORT GLOBALS (called from HTML)
══════════════════════════════════════════════════════════ */
window.PSA = {
  initVotingPage,
  initResultsSection,
  initSettingsPage,
  initPasswordModal,
  guardSettings,
  addPark,
  removePark,
  addCategory,
  removeCategory,
  addNominee,
  removeNominee,
  toggleCatItem,
  updateCategoryMeta,
  saveGeneralSettings,
  resetAllVotes,
  resetToDefaults
};
