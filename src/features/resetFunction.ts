export const resetFunction = (resultField: HTMLElement | null, previousResultField: HTMLElement | null ) => {
  if (resultField && previousResultField) {
    resultField.classList.add('fade-in');
    resultField.textContent = '0';

    previousResultField.classList.add('fade-in');
    previousResultField.textContent = '0';

    setTimeout(() => {
      resultField.classList.remove('fade-in');
      previousResultField.classList.remove('fade-in');
    }, 500);
  }
}
