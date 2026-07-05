const magikBtn = document.querySelector('.magik-btn');
let timerId;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      magikBtn.style.display = 'flex';
      clearTimeout(timerId);
      timerId = setTimeout(()=>{
        magikBtn.style.display = 'none';
      }, 5000);
    } else if (window.scrollY < 100) {
      magikBtn.style.display = 'none';
    }
});

magikBtn.addEventListener('mouseenter', () => {
  clearTimeout(timerId);
})

magikBtn.addEventListener('mouseleave', () => {
  timerId = setTimeout(()=>{
        magikBtn.style.display = 'none';
      }, 5000);
})