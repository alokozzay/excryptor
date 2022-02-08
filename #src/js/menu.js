// под-меню

document.querySelector('.header__list-dropping').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.header__list-lidropping').classList.toggle('active');
 }, false);

 document.body.addEventListener('click', function(e) {
    document.querySelector('.header__list-lidropping').classList.remove('active');
 }, false);

 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

} else {
    document.body.classList.add('pc');
}

// бургер меню

const iconMenu = document.querySelector('.mobile-menu');
if (iconMenu) {
    const navMenu = document.querySelector('.header__nav');
    const btnLanguage = document.querySelector('.header__btn');
    const headerLogo = document.querySelector('.header__logo');
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        btnLanguage.classList.toggle('active');
        headerLogo.classList.toggle('active');
     }, false);
}