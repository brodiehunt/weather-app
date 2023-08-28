const body = document.querySelector('body');
const settingsBtn = document.getElementById('settings-btn');


settingsBtn.addEventListener('click', (event) => {
  const dropDown = event.target.nextSibling.nextSibling;
  
  if (dropDown.classList.contains('show')) {
    const screen = document.querySelector('.screen');
    screen.parentElement.removeChild(screen);
    dropDown.classList.toggle('show');
  } else {
    const screen = document.createElement('div');
    screen.classList.add('screen');
    body.prepend(screen);
    dropDown.classList.toggle('show');
    screen.addEventListener('click', () => {
      dropDown.classList.toggle('show');
      screen.parentElement.removeChild(screen);
    })
  }
  
})