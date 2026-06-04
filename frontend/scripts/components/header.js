const header = document.getElementById('header');

window.addEventListener('scroll', () =>{

    if (window.scrollY > 50) {
        header.classList.remove('bg-transparent', 'transition-all', 'duration-[300ms]');
        header.classList.add('bg-white', 'transition-all', 'duration-[600ms]');
    } else {
        header.classList.remove('bg-white', 'transition-all', 'duration-[600ms]');
        header.classList.add('bg-transparent', 'transition-all', 'duration-[300ms]');
    }
})