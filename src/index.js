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
    debounce( 
        onSearch, DEBOUNCE_DELAY)
);

function onSearch(evt) {
    // stop reboot page
    evt.preventDefault();
    const countryName = refs.inputCountry.value.trim();
    console.log(countryName);
    // Cleare markup when input clean
    if (!countryName) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
    // Show message when error
    if (countryName != '') {
        fetchCountries(countryName)
            .then(renderCountry)
            .catch(error => {
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';
                console.log("Oops, there is no country with that name", error)
            });
    }
}

// Added function for rendering markup when found country/countries
function renderCountry(countries) {
    // console.log(countries);
    // switzerland
    // When found 1 a country
    if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        const markup = countries.map((country) => {
            return `<img src="${country.flags.svg}" alt="${country.official}" width='80'>
        <h2>${country.name.official}</h2>
        <p><b>Capital</b>: ${country.capital[0]}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
        })
            .join("");
        refs.countryInfo.innerHTML = markup;
    // When found from 2 to 10 countries
    } else if (countries.length > 1 && countries.length < 11) {
        refs.countryInfo.innerHTML = '';
        const markup = countries.map((country) => {
            return `<li class="item-card">
            <img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" class="img-item">
            ${country.name.official}
            </li>`;
        })
            .join("");
        refs.countryList.innerHTML = markup;
    // When found more 10 countries
    } else if (countries.length > 10) {
        refs.countryList.innerHTML = '';
        // Message when found too many countries. List cleaned
        return console.log("Too many matches found. Please enter a more specific name.");
    }
}