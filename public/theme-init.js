(function () {
  var key = 'pawhome-theme';
  var stored = localStorage.getItem(key);
  var dark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.classList.add('dark');
})();
