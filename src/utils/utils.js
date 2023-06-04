export function requestLoading(form, isLoading, text) {
  const button = form.querySelector('.popup__button')
  if (isLoading) {
    button.textContent = text;
  } else {
    button.textContent = text;
  }
}