/* ================================================================
   PARK SCOUT AWARDS 2026 — ROBLOX TPT2
   app.js — Core Voting Application
   ================================================================ */

'use strict';

/* ================================================================
   ICONS (SVG path strings — no emojis, ever)
   ================================================================ */
const ICONS = {
  coaster: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18 L6 10 L10 14 L14 6 L18 12 L22 8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="14" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  darkride: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flatride: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><path d="M12 3 L12 6M12 18 L12 21M3 12 L6 12M18 12 L21 12" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke-width="1.8"/></svg>`,
  water: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12 C5 9 7 15 10 12 C13 9 15 15 18 12 C21 9 22 12 22 12" stroke-width="1.8" stroke-linecap="round"/><path d="M2 17 C5 14 7 20 10 17 C13 14 15 20 18 17 C21 14 22 17 22 17" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  food: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2 L3 12 C3 14.2 4.8 16 7 16 L7 22M7 2 L7 8M11 2 C11 2 15 4 15 9 C15 11 13.5 12.8 11.5 13.5L11.5 22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  show: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  theming: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21 L3 10 L8 4 L13 10 L13 21Z M13 21 L13 14 L17 10 L21 14 L21 21" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  new: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  family: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="5" r="2.5" stroke-width="1.8"/><circle cx="16" cy="6" r="2" stroke-width="1.8"/><path d="M4 20 L4 14 C4 11.8 6.2 10 9 10 C11.8 10 14 11.8 14 14 L14 20" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 20 L16 15 C16 13.3 17.3 12 19 12 L22 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  scenery: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 20 L7 11 L12 16 L15 12 L22 20Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17" cy="6" r="3" stroke-width="1.8"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 21 L16 21M12 17 L12 21M7 4 L17 4 L17 11 C17 14.31 14.76 17 12 17 C9.24 17 7 14.31 7 11 Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 6 C7 6 4 6 4 9 C4 11 5.5 12.5 7 13" stroke-width="1.8" stroke-linecap="round"/><path d="M17 6 C17 6 20 6 20 9 C20 11 18.5 12.5 17 13" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke-width="1.8"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="1.5" stroke-width="1.8"/><polyline points="21,15 16,10 5,21" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* category icon key → icon svg */
const ICON_KEYS = Object.keys(ICONS);

function getIcon(key) {
  return ICONS[key] || ICONS.trophy;
}

/* ================================================================
   STORAGE KEYS
   ================================================================ */
const STORE = {
  config: 'psa2026_config',
  voted:  'psa2026_voted',
};

/* ================================================================
   DEFAULT CONFIG (12 categories, 3+ options each)
   ================================================================ */
const DEFAULT_CONFIG = {
  webhookUrl: 'https://discord.com/api/webhooks/1486411564151079145/RUcUc0mPD-z3tq7tUDgUN0rOpfDlj8u8Z9b11rcixeBcO8GToTRNl9aialndjLiOARpI',
  categories: [
    {
      id: 'cat_coaster', icon: 'coaster', name: 'Best Roller Coaster',
      options: [
        { id: 'o1', name: 'Thunder Dragon',  description: 'Dreamland Resort', image: '' },
        { id: 'o2', name: 'Neon Rush',       description: 'Neon Valley Park',  image: '' },
        { id: 'o3', name: 'Crystal Fury',    description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_dark', icon: 'darkride', name: 'Best Dark Ride',
      options: [
        { id: 'o4', name: 'Phantom Chase',   description: 'Dreamland Resort', image: '' },
        { id: 'o5', name: 'The Void',        description: 'Neon Valley Park',  image: '' },
        { id: 'o6', name: 'Crystal Depths',  description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_flat', icon: 'flatride', name: 'Best Flat Ride',
      options: [
        { id: 'o7',  name: 'Gravity Spin',  description: 'Dreamland Resort', image: '' },
        { id: 'o8',  name: 'Neon Whirl',    description: 'Neon Valley Park',  image: '' },
        { id: 'o9',  name: 'Ice Cyclone',   description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_water', icon: 'water', name: 'Best Water Ride',
      options: [
        { id: 'o10', name: 'Tidal Wave',    description: 'Dreamland Resort', image: '' },
        { id: 'o11', name: 'Crystal Falls', description: 'Crystal Kingdom',   image: '' },
        { id: 'o12', name: 'Neon Splash',   description: 'Neon Valley Park',  image: '' },
      ]
    },
    {
      id: 'cat_food', icon: 'food', name: 'Best Food & Beverage',
      options: [
        { id: 'o13', name: 'Dreamland Grill',  description: 'Dreamland Resort', image: '' },
        { id: 'o14', name: 'Neon Bites',       description: 'Neon Valley Park',  image: '' },
        { id: 'o15', name: 'Crystal Café',     description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_show', icon: 'show', name: 'Best Show & Entertainment',
      options: [
        { id: 'o16', name: 'Lights of Dreamland', description: 'Dreamland Resort', image: '' },
        { id: 'o17', name: 'Neon Nights Parade',  description: 'Neon Valley Park',  image: '' },
        { id: 'o18', name: 'Crystal Spectacular',  description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_theming', icon: 'theming', name: 'Best Theme Area',
      options: [
        { id: 'o19', name: 'Dragon Realm',   description: 'Dreamland Resort', image: '' },
        { id: 'o20', name: 'Cyber District', description: 'Neon Valley Park',  image: '' },
        { id: 'o21', name: 'Ice Pinnacle',   description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_new', icon: 'new', name: 'Best New Attraction 2026',
      options: [
        { id: 'o22', name: 'Hyper Loop X',   description: 'Dreamland Resort', image: '' },
        { id: 'o23', name: 'Neon Skyrise',   description: 'Neon Valley Park',  image: '' },
        { id: 'o24', name: 'Frost Comet',    description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_family', icon: 'family', name: 'Best Family Attraction',
      options: [
        { id: 'o25', name: 'Balloon Safari',    description: 'Dreamland Resort', image: '' },
        { id: 'o26', name: 'Pixel Playground',  description: 'Neon Valley Park',  image: '' },
        { id: 'o27', name: 'Crystal Adventure', description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_scenery', icon: 'scenery', name: 'Best Scenery & Theming',
      options: [
        { id: 'o28', name: 'Enchanted Forest', description: 'Dreamland Resort', image: '' },
        { id: 'o29', name: 'Holographic Bay',  description: 'Neon Valley Park',  image: '' },
        { id: 'o30', name: 'Crystal Peaks',    description: 'Crystal Kingdom',   image: '' },
      ]
    },
    {
      id: 'cat_overall', icon: 'trophy', name: 'Best Park Overall',
      options: [
        { id: 'o31', name: 'Dreamland Resort', description: 'by Player123',   image: '' },
        { id: 'o32', name: 'Neon Valley Park', description: 'by PlayerXYZ',   image: '' },
        { id: 'o33', name: 'Crystal Kingdom',  description: 'by CrystalBuild', image: '' },
      ]
    },
    {
      id: 'cat_experience', icon: 'heart', name: 'Best Guest Experience',
      options: [
        { id: 'o34', name: 'Dreamland Resort', description: 'Dreamland Resort', image: '' },
        { id: 'o35', name: 'Neon Valley Park', description: 'Neon Valley Park',  image: '' },
        { id: 'o36', name: 'Crystal Kingdom',  description: 'Crystal Kingdom',   image: '' },
      ]
    },
  ]
};

/* ================================================================
   CONFIG HELPERS
   ================================================================ */
function loadConfig() {
  try {
    const raw = localStorage.getItem(STORE.config);
    if (raw) return JSON.parse(raw);
  } catch {}
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function saveConfig(cfg) {
  localStorage.setItem(STORE.config, JSON.stringify(cfg));
}

function hasVoted() {
  return localStorage.getItem(STORE.voted) === '1';
}

function markVoted() {
  localStorage.setItem(STORE.voted, '1');
}

/* ================================================================
   VOTING STATE
   ================================================================ */
let state = {
  config: null,
  step: 0,         // current category index (0 = intro, then 0..n-1, then review)
  votes: {},       // { categoryId: optionId }
  phase: 'intro',  // 'intro' | 'voting' | 'review' | 'thanks' | 'already'
};

/* ================================================================
   SCREEN MANAGEMENT
   ================================================================ */
const screens = {
  intro:         document.getElementById('screen-intro'),
  already:       document.getElementById('screen-already-voted'),
  voting:        document.getElementById('screen-voting'),
  review:        document.getElementById('screen-review'),
  thanks:        document.getElementById('screen-thanks'),
};

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => {
    if (!el) return;
    el.style.display = k === name ? '' : 'none';
  });
  state.phase = name;
}

/* ================================================================
   INTRO
   ================================================================ */
function initIntro() {
  if (hasVoted()) {
    showScreen('already');
    return;
  }
  showScreen('intro');

  document.getElementById('btn-start-voting')?.addEventListener('click', () => {
    state.config = loadConfig();
    state.step   = 0;
    state.votes  = {};
    showScreen('voting');
    renderStep();
  });
}

/* ================================================================
   VOTING WIZARD
   ================================================================ */
function renderStep() {
  const cats   = state.config.categories;
  const total  = cats.length;
  const idx    = state.step;
  const cat    = cats[idx];

  // Progress
  const pct = Math.round((idx / total) * 100);
  document.getElementById('progress-fill').style.width  = pct + '%';
  document.getElementById('progress-current').textContent = idx + 1;
  document.getElementById('progress-total').textContent   = total;

  // Category header
  document.getElementById('cat-icon').innerHTML = getIcon(cat.icon);
  document.getElementById('cat-name').textContent = cat.name;
  document.getElementById('cat-step-num').textContent = `Category ${idx + 1} of ${total}`;

  // Options
  renderOptions(cat);

  // Nav buttons
  const backBtn = document.getElementById('btn-back');
  const nextBtn = document.getElementById('btn-next');

  backBtn.disabled = idx === 0;

  const picked = state.votes[cat.id];
  nextBtn.disabled = !picked;

  // Last step label
  const isLast = idx === total - 1;
  document.getElementById('next-label').textContent = isLast ? 'Review Ballot' : 'Continue';
  const nextIcon = document.getElementById('next-icon');
  if (isLast) {
    nextIcon.innerHTML = `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`;
  } else {
    nextIcon.innerHTML = `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`;
  }
}

function renderOptions(cat) {
  const grid   = document.getElementById('options-grid');
  const picked = state.votes[cat.id];

  grid.innerHTML = cat.options.map(opt => {
    const isSelected = picked === opt.id;

    const imgHtml = opt.image
      ? `<div class="option-img-wrap">
           <img class="option-img" src="${esc(opt.image)}" alt="${esc(opt.name)}"
                onerror="this.parentElement.innerHTML='<div class=\\'option-no-img\\'>${ICONS.image.replace(/'/g, "\\'")}</div>'">
           <div class="option-selected-bar"></div>
           <div class="option-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
         </div>`
      : `<div class="option-img-wrap">
           <div class="option-no-img">${ICONS.image}</div>
           <div class="option-selected-bar"></div>
           <div class="option-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
         </div>`;

    return `<div class="option-card${isSelected ? ' selected' : ''}"
                 data-option-id="${esc(opt.id)}"
                 onclick="selectOption('${esc(opt.id)}')">
               ${imgHtml}
               <div class="option-body">
                 <span class="option-tag">${esc(opt.description)}</span>
                 <div class="option-name">${esc(opt.name)}</div>
               </div>
             </div>`;
  }).join('');
}

function selectOption(optionId) {
  const cat = state.config.categories[state.step];
  state.votes[cat.id] = optionId;

  // Update cards
  document.querySelectorAll('.option-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.optionId === optionId);
  });

  // Enable next
  document.getElementById('btn-next').disabled = false;
}

function goBack() {
  if (state.step > 0) {
    state.step--;
    renderStep();
  }
}

function goNext() {
  const cats = state.config.categories;
  if (state.step < cats.length - 1) {
    state.step++;
    renderStep();
  } else {
    showReview();
  }
}

function skipCurrent() {
  const cat = state.config.categories[state.step];
  delete state.votes[cat.id];
  goNext();
}

/* ================================================================
   REVIEW SCREEN
   ================================================================ */
function showReview() {
  showScreen('review');
  const cats = state.config.categories;
  const list = document.getElementById('review-list');

  list.innerHTML = cats.map((cat, i) => {
    const vote   = state.votes[cat.id];
    const option = cat.options.find(o => o.id === vote);

    return `<div class="review-row">
      <span class="review-row-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="review-row-category">${esc(cat.name)}</span>
      ${option
        ? `<span class="review-row-choice">${esc(option.name)}</span>`
        : `<span class="review-row-choice review-row-skipped">Skipped</span>`
      }
      <button class="review-row-edit" title="Edit this vote" onclick="editVote(${i})">
        <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
    </div>`;
  }).join('');
}

function editVote(stepIndex) {
  state.step = stepIndex;
  showScreen('voting');
  renderStep();
}

/* ================================================================
   SUBMIT
   ================================================================ */
async function submitVotes() {
  const btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> Submitting…`;

  const cfg  = state.config;
  const cats = cfg.categories;

  // Build Discord embed fields
  const fields = cats.map(cat => {
    const vote   = state.votes[cat.id];
    const option = cat.options.find(o => o.id === vote);
    return {
      name: cat.name,
      value: option ? option.name : '*— No vote —*',
      inline: true,
    };
  });

  const payload = {
    username: 'Park Scout Awards 2026',
    avatar_url: 'https://i.imgur.com/4M34hi2.png',
    embeds: [{
      title: 'New Ballot Received',
      description: 'A community member has submitted their Park Scout Awards 2026 ballot.',
      color: 0xC8A84B,
      fields: fields,
      footer: {
        text: `Park Scout Awards 2026 · Roblox TPT2 · ${new Date().toUTCString()}`
      },
      thumbnail: {
        url: 'https://i.imgur.com/4M34hi2.png'
      }
    }]
  };

  try {
    const resp = await fetch(cfg.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (resp.ok || resp.status === 204) {
      markVoted();
      showScreen('thanks');
    } else {
      throw new Error(`HTTP ${resp.status}`);
    }
  } catch (err) {
    console.error('Webhook error:', err);
    // Even on error, we still mark as voted and show thanks
    // (prevents double-submission attempts)
    markVoted();
    showScreen('thanks');
  }
}

/* ================================================================
   UTILITY
   ================================================================ */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Wire nav buttons
  document.getElementById('btn-back')?.addEventListener('click', goBack);
  document.getElementById('btn-next')?.addEventListener('click', goNext);
  document.getElementById('btn-skip')?.addEventListener('click', skipCurrent);
  document.getElementById('btn-submit')?.addEventListener('click', submitVotes);
  document.getElementById('btn-review-back')?.addEventListener('click', () => {
    showScreen('voting');
    renderStep();
  });

  // Init the right screen
  initIntro();
});
