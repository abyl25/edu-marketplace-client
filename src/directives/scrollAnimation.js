const animaatedScrollObserver = new IntersectionObserver(
    (entries, animaatedScrollObserver) => {
        entries.forEach((entry)=> {
            if(entry.isIntersecting) {
                entry.target.classList.add('enter');
                animaatedScrollObserver.unobserve(entry.target)
            }
        });
    }
);

export default {
    bind(el) {
        el.classList.add('before-enter');
        animaatedScrollObserver.observe(el); 
    }
}