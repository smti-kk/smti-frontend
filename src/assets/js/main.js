const accordBtn = document.querySelectorAll('.c-accordion-title');
accordBtn.forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.querySelector('.c-accordion-button').classList.toggle('is-open');
    this.nextElementSibling.classList.toggle('is-open');
  });
});
