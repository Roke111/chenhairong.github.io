/**
 * effects.js — 互动效果脚本
 * 验证 GitHub Pages 外部 JS 加载
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════
  // 1. 鼠标跟随光晕
  // ═══════════════════════════════════════
  function initCursorGlow() {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow hidden';
    document.body.appendChild(glow);

    var rafId = null;
    var mouseX = -1000;
    var mouseY = -1000;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.classList.remove('hidden');
      if (!rafId) {
        rafId = requestAnimationFrame(function update() {
          glow.style.left = mouseX + 'px';
          glow.style.top = mouseY + 'px';
          rafId = null;
        });
      }
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.add('hidden');
    });

    // 移动端不显示光晕（无鼠标）
    if ('ontouchstart' in window) {
      glow.classList.add('hidden');
      glow.style.display = 'none';
    }
  }

  // ═══════════════════════════════════════
  // 2. 点击涟漪效果（玻璃卡片）
  // ═══════════════════════════════════════
  function initRippleEffect() {
    document.addEventListener('click', function (e) {
      var target = e.target.closest('.glass-card');
      if (!target) return;

      // 确保卡片是定位容器
      if (getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }

      var ripple = document.createElement('span');
      ripple.className = 'ripple';

      var rect = target.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      target.appendChild(ripple);

      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  }

  // ═══════════════════════════════════════
  // 3. 主题切换按钮
  // ═══════════════════════════════════════
  function initThemeToggle() {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', '切换深色/浅色模式');
    btn.title = '切换深色/浅色模式';
    btn.innerHTML =
      '<span class="icon-moon">🌙</span>' +
      '<span class="icon-sun">☀️</span>';
    document.body.appendChild(btn);

    // 读取保存的主题
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    // 初始化
    if (!saved) {
      setTheme(prefersDark ? 'dark' : 'light');
    }

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ═══════════════════════════════════════
  // 4. 实时时钟
  // ═══════════════════════════════════════
  function initLiveClock() {
    var footer = document.querySelector('.footer');
    if (!footer) return;

    var clockWrap = document.createElement('div');
    clockWrap.className = 'footer-clock';

    var clock = document.createElement('span');
    clock.className = 'live-clock';
    clock.innerHTML = '<span class="clock-dot"></span><span class="clock-text"></span>';
    clockWrap.appendChild(clock);

    // 插入到 footer 之后
    footer.parentNode.insertBefore(clockWrap, footer.nextSibling);

    var textEl = clock.querySelector('.clock-text');

    function update() {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, '0');
      var m = String(now.getMinutes()).padStart(2, '0');
      var s = String(now.getSeconds()).padStart(2, '0');
      textEl.textContent = h + ':' + m + ':' + s + ' 北京时间';
    }

    update();
    setInterval(update, 1000);
  }

  // ═══════════════════════════════════════
  // 启动所有效果
  // ═══════════════════════════════════════
  function boot() {
    // 打印加载标记，方便通过 DevTools 验证
    console.log(
      '%c effects.js loaded %c ✓ ',
      'background:#4ca5d7;color:#fff;padding:2px 8px;border-radius:3px;font-weight:bold;',
      'color:#4ca5d7;font-weight:bold;'
    );
    console.log(
      '%c Effects: %c cursor glow | click ripple | theme toggle | live clock',
      'color:#3d5d7a;',
      'color:#261e5c;'
    );

    initCursorGlow();
    initRippleEffect();
    initThemeToggle();
    initLiveClock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
