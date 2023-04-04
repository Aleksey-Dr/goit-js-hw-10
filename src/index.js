import './css/styles.css';
// Add debounce from library lodash
import debounce from "lodash.debounce";
// Add Report from library notiflix
import { Report } from "notiflix/build/notiflix-report-aio";
// Import fetchCountries
import { fetchCountries } from './fetchCountries';
// console.log(fetchCountries);

// console.log('Hello!');

// Find elements
// Create object with elements
const refs = {
    inputCountry: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
};
// console.log(refs.inputCountry);
// console.log(refs.countryInfo);
// console.log(refs.countryList);

// Added CONST for delay
const DEBOUNCE_DELAY = 300;

// Added listener for input with function fetchCountries() in callback
refs.inputCountry.addEventListener('input',
    // Added debounce function
    debounce(() =>
        fetchCountries(), DEBOUNCE_DELAY)
);