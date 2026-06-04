/**
 * nav.js — 共享导航栏组件
 * 验证 GitHub Pages 多页面 JS 复用
 */
(function () {
  'use strict';

  var PAGES = [
    { href: 'index.html',     icon: '🏠', label: '首页' },
    { href: 'projects.html',  icon: '🚀', label: '项目' },
    { href: 'about.html',     icon: '👤', label: '关于' }
  ];

  function getCurrentPage() {
    var path = window.location.pathname;
    var parts = path.split('/');
    var file = parts[parts.length - 1] || 'index.html';
    return file;
  }

  function buildNav() {
    var current = getCurrentPage();

    var bar = document.createElement('nav');
    bar.className = 'nav-bar';

    var inner = document.createElement('div');
    inner.className = 'nav-inner';

    PAGES.forEach(function (page) {
      var a = document.createElement('a');
      a.className = 'nav-link';
      a.href = page.href;

      var icon = document.createElement('span');
      icon.className = 'nav-icon';
      icon.textContent = page.icon;

      var label = document.createTextNode(' ' + page.label);

      var indicator = document.createElement('span');
      indicator.className = 'nav-indicator';

      a.appendChild(icon);
      a.appendChild(label);
      a.appendChild(indicator);

      if (current === page.href || 
          (current === '' && page.href === 'index.html')) {
        a.classList.add('active');
      }

      inner.appendChild(a);
    });

    bar.appendChild(inner);

    // 插入到 wrapper 内部的最前面
    var wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.insertBefore(bar, wrapper.firstChild);
    }
  }

  function boot() {
    console.log(
      '%c nav.js loaded %c ✓ %c — shared navigation for all pages',
      'background:#261e5c;color:#fff;padding:2px 8px;border-radius:3px;font-weight:bold;',
      'color:#261e5c;font-weight:bold;',
      'color:#3d5d7a;'
    );
    buildNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
