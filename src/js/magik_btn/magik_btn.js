const magikBtn = document.querySelector('.magik-btn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 1000) {
      magikBtn.style.display = 'flex';
    } else if (window.scrollY < 1000) {
      magikBtn.style.display = 'none';
    }
});