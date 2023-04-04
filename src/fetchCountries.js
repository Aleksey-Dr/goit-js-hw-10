// Module with function for fetch attributes of countries
// Added export
export function fetchCountries(name) {
    // Parts URL
    name = 'deutschland'
    const frontURL = 'https://restcountries.com/v3.1/name/';
    const backURL = '?fields=name,capital,population,flags,languages';
    // Complete URL
    let URL = frontURL + name + backURL;
    // console.log(URL);
    // Function fetch()
    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(countries => {
            for (const country of countries) {
                // console.log(countries);
                // console.log(country);
                // console.log(name.name);
                console.log(country.name.official);
                console.log(country.capital[0]);
                console.log(country.population);
                console.log(country.flags.svg);
                console.log(...Object.values(country.languages));
            }
        });
}