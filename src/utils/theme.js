const switcherContainerTheme = document.querySelector('.header__container');
export const switcherIndicator = document.querySelector('.header__indicator');
const switcherIcon = document.querySelector('.header__icon');


export function switcher() {
  switcherIndicator.classList.toggle('header__indicator_active');
  switcherContainerTheme.classList.toggle('header__container_active');
  switcherIcon.classList.toggle('header__icon_active');
  const lightMode = document.body.toggleAttribute('lightmode');
  localStorage.setItem('theme', lightMode ? 'light' : 'dark');
}