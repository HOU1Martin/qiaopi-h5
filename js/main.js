/* =========================================================
   侨批中的家国情怀 · H5 网页版 共享脚本
   根据 <body data-page="..."> 初始化对应交互
   ========================================================= */
(function () {
  'use strict';

  var page = document.body.getAttribute('data-page');

  /* ---------- 通用：滚动渐显（替代小程序 onPageScroll 阈值） ---------- */
  function initReveal() {
    var targets = document.querySelectorAll(
      '.catalog-hero, .catalog-item, .catalog-footer, ' +
      '.section, .note-item, .notes-conclusion, .family-section, ' +
      '.testament-section, .testament-text-section, .newspaper-section, ' +
      '.quote-source, .notes-section-2'
    );
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 通用：图片灯箱（替代 wx.previewImage） ---------- */
  function initLightbox() {
    var zoomables = document.querySelectorAll('.archive-image, .family-image, .testament-image');
    if (!zoomables.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<div class="lightbox-close">✕</div><img alt="预览">';
    document.body.appendChild(box);
    var img = box.querySelector('img');

    function open(src) {
      img.src = src;
      box.classList.add('show');
    }
    function close() { box.classList.remove('show'); }

    zoomables.forEach(function (el) {
      el.addEventListener('click', function () { open(el.getAttribute('src')); });
    });
    box.addEventListener('click', close);
  }

  /* ---------- 首页：水波纹 + 信封弹窗 ---------- */
  function initIndex() {
    var bg = document.querySelector('.bg-layer');
    var rippleId = 0;
    function addRipple(x, y) {
      if (!bg) return;
      rippleId++;
      var r = document.createElement('div');
      r.className = 'ripple';
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      bg.appendChild(r);
      setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 1200);
    }
    if (bg) {
      bg.addEventListener('touchstart', function (e) {
        var t = e.touches[0]; addRipple(t.clientX, t.clientY);
      }, { passive: true });
      bg.addEventListener('touchmove', function (e) {
        var t = e.touches[0]; addRipple(t.clientX, t.clientY);
      }, { passive: true });
      bg.addEventListener('mousemove', function (e) { addRipple(e.clientX, e.clientY); });
    }

    // 入场动画
    setTimeout(function () { var t = document.querySelector('.title-area'); if (t) t.classList.add('visible'); }, 300);
    setTimeout(function () { var m = document.querySelector('.main-area'); if (m) m.classList.add('visible'); }, 800);

    // 访客计数（替代 wx.getStorageSync）
    var overlay = document.querySelector('.envelope-overlay');
    var numEl = document.querySelector('.envelope-num');
    var nameEl = document.querySelector('.envelope-name');
    var input = document.querySelector('.nickname-input');

    function showEnvelope() {
      if (!overlay) return;
      var n = parseInt(localStorage.getItem('qiaopi_visitor') || '0', 10);
      n = n + 1;
      localStorage.setItem('qiaopi_visitor', String(n));
      if (numEl) numEl.textContent = ('000' + n).slice(-4);
      if (nameEl) nameEl.textContent = (input && input.value.trim()) ? input.value.trim() : '访客';
      overlay.classList.add('show');
    }

    var enterBtn = document.querySelector('.enter-btn');
    if (enterBtn) enterBtn.addEventListener('click', showEnvelope);

    var closeBtn = document.querySelector('.envelope-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { overlay.classList.remove('show'); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('show');
    });
  }

  /* ---------- 启动 ---------- */
  function boot() {
    if (page === 'index') initIndex();
    if (page === 'catalog' || page === 'chapter') {
      initReveal();
      initLightbox();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
