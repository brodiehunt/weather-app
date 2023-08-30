import { formatData, change24HourData, changeUnitsData } from './utilityFunctions.js';

let recentData;

const body = document.querySelector('body');
const settingsBtn = document.getElementById('settings-btn');
const button = document.getElementById('button');
const secondBtn = document.getElementById('second-button');

const selectInput = document.getElementById('condition');
const toggleTemp = document.getElementById('temperature-toggle');
const toggleSpeed = document.getElementById('speed-toggle');
const toggleRain = document.getElementById('rain-toggle');

const handleUnitToggle = (event) => {
  console.log(event.target.id);
  if (event.target.id === 'temperature-toggle') {
    units.tempUnit = (event.target.checked) ? 'f' : 'c';
  } else if (event.target.id === 'speed-toggle') {
    units.speedUnit = (event.target.checked) ? 'mph' : 'kph';
  } else {
    units.rainUnit = (event.target.checked) ? 'in' : 'mm';
  }
  
  const current24Hour = selectInput.value;
  changeUnitsData(units, current24Hour);
}

selectInput.addEventListener('change', (event) => {
  
  const newInput = event.target.value;
  change24HourData(newInput, units)
})

toggleTemp.addEventListener('change', handleUnitToggle);
toggleSpeed.addEventListener('change', handleUnitToggle);
toggleRain.addEventListener('change', handleUnitToggle);

const units = {
  tempUnit: 'c',
  speedUnit: 'kph',
  rainUnit: 'mm'
}

button.addEventListener('click', () => {
  formatData(units)
})





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