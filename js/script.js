import { formatData, change24HourData, changeUnitsData } from './utilityFunctions.js';

// global state of measurement units / default;
const units = {
  tempUnit: 'c',
  speedUnit: 'kph',
  rainUnit: 'mm'
}

// Search location input
const inputEl = document.getElementById('search-input');
inputEl.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchVal = event.target.value;
    formatData(units, searchVal);
  }
})

// settings button dropdown interactivity
const settingsBtn = document.getElementById('settings-btn');

settingsBtn.addEventListener('click', (event) => {
  const dropDown = event.target.nextSibling.nextSibling;
  const body = document.querySelector('body');
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
});

//  24 hours select input element and event handler
const selectInput = document.getElementById('condition');
selectInput.addEventListener('change', (event) => {
  
  const newInput = event.target.value;
  change24HourData(newInput, units)
});

// Toggle unit measurements and handle displaying new data;
const handleUnitToggle = (event) => {
  
  if (event.target.id === 'temperature-toggle') {
    units.tempUnit = (event.target.checked) ? 'f' : 'c';
  } else if (event.target.id === 'speed-toggle') {
    units.speedUnit = (event.target.checked) ? 'mph' : 'kph';
  } else {
    units.rainUnit = (event.target.checked) ? 'in' : 'mm';
  }
  
  const current24Hour = selectInput.value;
  changeUnitsData(units, current24Hour);
};

const toggleTemp = document.getElementById('temperature-toggle');
const toggleSpeed = document.getElementById('speed-toggle');
const toggleRain = document.getElementById('rain-toggle');

toggleTemp.addEventListener('change', handleUnitToggle);
toggleSpeed.addEventListener('change', handleUnitToggle);
toggleRain.addEventListener('change', handleUnitToggle);