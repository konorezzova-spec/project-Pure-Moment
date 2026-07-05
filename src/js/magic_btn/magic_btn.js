const magicBtn = document.querySelector('.magic-btn');
let timerId;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      magicBtn.style.display = 'flex';
      clearTimeout(timerId);
      timerId = setTimeout(()=>{
        magicBtn.style.display = 'none';
      }, 5000);
    } else if (window.scrollY < 100) {
      magicBtn.style.display = 'none';
    }
});

magicBtn.addEventListener('mouseenter', () => {
  clearTimeout(timerId);
})

magicBtn.addEventListener('mouseleave', () => {
  timerId = setTimeout(()=>{
        magicBtn.style.display = 'none';
      }, 5000);
})