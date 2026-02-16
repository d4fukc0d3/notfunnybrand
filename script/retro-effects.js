/* ============================================
   NOTFUNNYBRAND - 90s/2000s RETRO EFFECTS
   ============================================ */

// === SPARKLE CURSOR TRAIL ===
const sparkleChars = ['✦', '✧', '★', '☆', '✶', '✷', '✸', '✹', '⋆', '✫'];
const sparkleColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#ff6600'];

document.addEventListener('mousemove', function(e) {
  if (Math.random() > 0.7) return; // throttle
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
  sparkle.style.left = e.pageX + 'px';
  sparkle.style.top = e.pageY + 'px';
  sparkle.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
  sparkle.style.fontSize = (8 + Math.random() * 16) + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

// === VISITOR COUNTER (fake, stored in localStorage) ===
function initVisitorCounter() {
  const counter = document.querySelector('.retro-counter .counter-digits');
  if (!counter) return;

  let visits = parseInt(localStorage.getItem('nfb_visits') || '0');
  visits++;
  localStorage.setItem('nfb_visits', visits.toString());

  const digits = String(visits).padStart(6, '0').split('');
  counter.innerHTML = digits.map(d => `<span class="digit">${d}</span>`).join('');
}

// === TITLE EMOTICON ANIMATION ===
const emoticons = [
  '¯\\_(ツ)_/¯', '乁(✧ ͜ʖ ✧)ㄏ', '乁[ᓀ˵ ▾˵ᓂ]ㄏ',
  '¯_༼ᕤ◕◕༽ᕤ_/¯', '¯_( ͡° ͜ʖ ͡°)/¯', '乁( ◔̯◔ )ㄏ',
  '¯_(⊙︿⊙)/¯', '乁( •̀ ω •́ )ㄏ', '¯_༼ ಠ_ಠ ༽/¯',
  '乁(♥♥ )ㄏ', '¯_㋡/¯', '¯_(ヅ)/¯',
  'ᕦ(ツ)ᕤ', '╮(╯╰)╭', '乁༼ಠ益ಠ༽ㄏ',
  '乁(⌐■■)ㄏ', '¯_ȌᴥȌ/¯', '乁( ˙ ω˙乁)',
  '乁༼✿◕╭╮◕✿༽ㄏ', '¯_༼⌐■ل͜■༽/¯'
];

let emoticonIdx = 0;
function updateTitle() {
  const base = document.title.replace(/^[^\w]*/, '').trim();
  document.title = emoticons[emoticonIdx] + ' ' + (base || 'NOTFUNNYBRAND');
  emoticonIdx = (emoticonIdx + 1) % emoticons.length;
}
setInterval(updateTitle, 1000);

// === ANIMATED FAVICON (tab animation) ===
function initFaviconAnimation() {
  const favicon = document.getElementById('dynamic-favicon');
  if (!favicon) return;

  const frames = [];
  for (let i = 1; i <= 40; i++) {
    frames.push('images/tab-images/ezgif-frame-' + String(i).padStart(3, '0') + '.png');
  }
  let frameIdx = 0;
  setInterval(() => {
    favicon.href = frames[frameIdx];
    frameIdx = (frameIdx + 1) % frames.length;
  }, 200);
}

// === RANDOM STATUS BAR MESSAGES ===
function initStatusMessages() {
  const el = document.getElementById('retro-status-text');
  if (!el) return;

  const messages = [
    'Downloading more RAM...',
    'Connecting to AOL...',
    'You\'ve got mail!',
    'Buffering... please wait...',
    'Defragmenting hard drive...',
    'Installing Bonzi Buddy...',
    'Scanning for viruses...',
    'Loading Geocities page...',
    'Dialing up... *beeep boop*',
    'Optimizing pixels...',
    'Reticulating splines...',
    'notfunnybrand.exe is running...',
  ];

  let msgIdx = 0;
  setInterval(() => {
    el.textContent = messages[msgIdx];
    msgIdx = (msgIdx + 1) % messages.length;
  }, 3000);
}

// === INIT ON DOM READY ===
document.addEventListener('DOMContentLoaded', function() {
  initVisitorCounter();
  initFaviconAnimation();
  initStatusMessages();
});
