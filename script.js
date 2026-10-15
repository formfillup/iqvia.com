(function () {
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var modal = document.getElementById('apply-modal');
  var form = document.getElementById('apply-form');
  var error = document.getElementById('form-error');
  var toggle = document.getElementById('toggle-details');
  var details = document.getElementById('cx-details');
  var opener = document.getElementById('open-apply');

  toggle.addEventListener('click', function () {
    var open = details.hidden;
    details.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Hide details' : 'View details';
  });

  opener.addEventListener('click', function () { modal.showModal(); });
  document.getElementById('close-apply').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var missing = [];
    ['name', 'email', 'phone'].forEach(function (n) {
      var f = form.elements[n];
      var bad = !f.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('invalid', bad);
      if (bad) missing.push(f);
    });
    var cv = form.elements.cv.files[0];
    if (cv && !/\.(pdf|docx?)$/i.test(cv.name)) {
      error.textContent = 'Upload your resume as a .pdf, .doc, or .docx file.';
      error.hidden = false;
      return;
    }
    if (missing.length) {
      error.textContent = 'Enter your full name, a valid email address, and your phone number.';
      error.hidden = false;
      missing[0].focus();
      return;
    }
    error.hidden = true;
    window.location.href = 'thankyou.html';
  });
})();
