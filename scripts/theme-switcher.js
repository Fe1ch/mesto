const switcherContainerTheme = document.querySelector('.header__container');
const switcherTheme = document.querySelector('.header__indicator');
const logo = document.querySelector('.header__logo');
const switcherIcon = document.querySelector('.header__icon');

function switcher() {
  switcherTheme.classList.toggle('header__indicator_active');
  switcherContainerTheme.classList.toggle('header__container_active');
  switcherIcon.classList.toggle('header__icon_active');
}

switcherTheme.onclick = function () {
  const theme = document.querySelector('[title="theme"]');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.href = savedTheme;
  }

  if (theme.getAttribute('href') == './pages/theme-dark.css') {
    theme.href = './pages/theme-light.css';
    logo.src = "image/header-logo-black.svg";
  } else {
    theme.href = './pages/theme-dark.css';
    logo.src = "image/header-logo.svg";
  }
  localStorage.setItem('theme', theme.getAttribute('href'));

  switcher();
}

function applySavedTheme() {
  const theme = document.querySelector('[title="theme"]');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.href = savedTheme;
    if (savedTheme === './pages/theme-light.css') {
      logo.src = "image/header-logo-black.svg";
      switcher();
    } else {
      logo.src = "image/header-logo.svg";
    }
  }
}
applySavedTheme();