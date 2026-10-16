(function () {
  var PHONE_WA = '917834838485';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentNode;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Appointment forms: build a WhatsApp message with the details, no backend needed.
  document.querySelectorAll('form[data-wa-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = [
        'Hello Noida Dental Hospital, I would like to book an appointment.',
        'Name: ' + (d.get('name') || ''),
        'Phone: ' + (d.get('phone') || ''),
        'Reason for visit: ' + (d.get('reason') || ''),
        'Preferred date: ' + (d.get('date') || 'Not specified'),
        'Preferred time: ' + (d.get('time') || 'Not specified')
      ];
      var msg = d.get('message');
      if (msg) lines.push('Note: ' + msg);
      var url = 'https://wa.me/' + PHONE_WA + '?text=' + encodeURIComponent(lines.join('\n'));
      var w = window.open(url, '_blank', 'noopener');
      if (!w) window.location.href = url;
    });
  });


  // Tap-to-enlarge viewer for infographics (keeps text readable on phones).
  var lb = null;
  function closeLb() { if (lb) { lb.hidden = true; document.body.style.overflow = ''; } }
  document.querySelectorAll('a[data-zoom]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!lb) {
        lb = document.createElement('div');
        lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
        lb.innerHTML = '<div class="lb-bar"><span>Scroll or pinch to zoom</span><button type="button" class="lb-close">Close</button></div><div class="lb-scroll"><img alt=""></div>';
        document.body.appendChild(lb);
        lb.querySelector('.lb-close').addEventListener('click', closeLb);
        lb.addEventListener('click', function (ev) { if (ev.target === lb || ev.target.className === 'lb-scroll') closeLb(); });
        document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeLb(); });
      }
      var im = lb.querySelector('img');
      im.src = a.getAttribute('href'); im.alt = (a.querySelector('img') || {}).alt || '';
      lb.hidden = false; document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-scroll').scrollTop = 0; lb.querySelector('.lb-close').focus();
    });
  });


  // Intro video on the home page: plays once per visit, then shows an Open Website button.
  (function () {
    var box = document.getElementById('intro');
    if (!box || !document.documentElement.classList.contains('intro-on')) return;
    var v = document.getElementById('introVideo'), open = document.getElementById('introOpen'),
        skip = document.getElementById('introSkip'), snd = document.getElementById('introSound');
    var finished = false;
    function done() { if (finished) return; finished = true; box.classList.add('done'); try { open.focus({ preventScroll: true }); } catch (e) {} }
    function close() {
      try { sessionStorage.setItem('ndh_intro', '1'); } catch (e) {}
      try { v.pause(); } catch (e) {}
      box.classList.add('out');
      setTimeout(function () { document.documentElement.classList.remove('intro-on'); box.classList.remove('out'); }, 500);
    }
    v.addEventListener('ended', done);
    v.addEventListener('error', done);
    open.addEventListener('click', close);
    skip.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.documentElement.classList.contains('intro-on')) close(); });
    snd.addEventListener('click', function () {
      v.muted = !v.muted; snd.textContent = v.muted ? 'Sound off' : 'Sound on'; snd.setAttribute('aria-pressed', v.muted ? 'false' : 'true');
      if (v.paused && !finished) v.play().catch(function () {});
    });
    var p = v.play();
    if (p && p.catch) p.catch(done);          // autoplay blocked: go straight to the button
    setTimeout(done, 15000);                   // safety net
  })();

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
