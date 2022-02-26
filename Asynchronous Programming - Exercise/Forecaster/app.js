function attachEvents() {

    const baseUrl = `http://localhost:3030`;

    const forecastDivElement = document.getElementById('forecast');
    const currentWeatherDivElement = document.getElementById('current');
    const upcomingWeatherDivElement = document.getElementById('upcoming');

    const locationInput = document.getElementById('location');
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', getWeatherAsync);

    async function getWeatherAsync(ev) {

        ev.preventDefault();

        currentWeatherDivElement.innerHTML = `<div class="label">Current conditions</div>`;
        upcomingWeatherDivElement.innerHTML = `<div class="label">Three-day forecast</div>`;
        const pElementToRemove = document.querySelector('#forecast p');
        if (pElementToRemove) {
            
            pElementToRemove.remove();

        }

        if (locationInput.value) {

            const locationsEndpoint = `${baseUrl}/jsonstore/forecaster/locations`;

            try {

                const locationsResponse = await fetch(locationsEndpoint);
                const locationsResult = await locationsResponse.json();

                const specificLocation = locationsResult.find(loc => loc.code === locationInput.value.toLowerCase());

                const currentWeatherEndpoint = `${baseUrl}/jsonstore/forecaster/today/${specificLocation.code}`;
                const upcomingWeatherEndpoint = `${baseUrl}/jsonstore/forecaster/upcoming/${specificLocation.code}`;

                const currentWeatherResponse = await fetch(currentWeatherEndpoint);
                const currentWeatherResult = await currentWeatherResponse.json();

                const upcomingWeatherResponse = await fetch(upcomingWeatherEndpoint);
                const upcomingWeatherResult = await upcomingWeatherResponse.json();

                forecastDivElement.style.display = 'inline';

                const forecastCurrentDivElement = document.createElement('div');
                forecastCurrentDivElement.classList.add('forecasts');
                currentWeatherDivElement.appendChild(forecastCurrentDivElement);

                const spanSymbolElement = document.createElement('span');
                spanSymbolElement.classList.add('condition');
                spanSymbolElement.classList.add('symbol');

                switch (currentWeatherResult.forecast.condition) {
                    case 'Sunny':
                        spanSymbolElement.innerHTML = `&#x2600`;
                        break;
                    case 'Partly sunny':
                        spanSymbolElement.innerHTML = `&#x26C5`;
                        break;
                    case 'Overcast':
                        spanSymbolElement.innerHTML = `&#x2601`;
                        break;
                    case 'Rain':
                        spanSymbolElement.innerHTML = `&#x2614`;
                        break;
                    case 'Degrees':
                        spanSymbolElement.innerHTML = `&#176`;
                        break;
                }

                forecastCurrentDivElement.appendChild(spanSymbolElement);

                const spanConditionElement = document.createElement('span');
                spanConditionElement.classList.add('condition');
                forecastCurrentDivElement.appendChild(spanConditionElement);

                const spanLocationElement = document.createElement('span');
                spanLocationElement.textContent = currentWeatherResult.name;
                spanLocationElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanLocationElement);

                const spanTempElement = document.createElement('span');
                spanTempElement.innerHTML = `${currentWeatherResult.forecast.low}&deg;/${currentWeatherResult.forecast.high}&deg;`;
                spanTempElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanTempElement);

                const spanWordConditionElement = document.createElement('span');
                spanWordConditionElement.textContent = `${currentWeatherResult.forecast.condition}`;
                spanWordConditionElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanWordConditionElement);

                const forecastInfoUpcomingDivElement = document.createElement('div');
                forecastInfoUpcomingDivElement.classList.add('forecast-info');
                upcomingWeatherDivElement.appendChild(forecastInfoUpcomingDivElement);

                upcomingWeatherResult.forecast.forEach(forecast => {

                    const spanUpcomingElement = document.createElement('span');
                    spanUpcomingElement.classList.add('upcoming');
                    forecastInfoUpcomingDivElement.appendChild(spanUpcomingElement);

                    const spanUpcomingSymbolElement = document.createElement('span');
                    spanUpcomingSymbolElement.classList.add('symbol');

                    switch (forecast.condition) {
                        case 'Sunny':
                            spanUpcomingSymbolElement.innerHTML = `&#x2600;`;
                            break;
                        case 'Partly sunny':
                            spanUpcomingSymbolElement.innerHTML = `&#x26C5;`;
                            break;
                        case 'Overcast':
                            spanUpcomingSymbolElement.innerHTML = `&#x2601;`;
                            break;
                        case 'Rain':
                            spanUpcomingSymbolElement.innerHTML = `&#x2614;`;
                            break;
                        case 'Degrees':
                            spanUpcomingSymbolElement.innerHTML = `&#176;`;
                            break;
                    }

                    spanUpcomingElement.appendChild(spanUpcomingSymbolElement);

                    const spanUpcomingTempElement = document.createElement('span');
                    spanUpcomingTempElement.innerHTML = `${forecast.low}&deg;/${forecast.high}&deg;`;
                    spanUpcomingTempElement.classList.add('forecast-data');
                    spanUpcomingElement.appendChild(spanUpcomingTempElement);

                    const spanUpcomingWordConditionElement = document.createElement('span');
                    spanUpcomingWordConditionElement.textContent = `${forecast.condition}`;
                    spanUpcomingWordConditionElement.classList.add('forecast-data');
                    spanUpcomingElement.appendChild(spanUpcomingWordConditionElement);

                })

            } catch {

                forecastDivElement.style.display = 'inline';
                const labels = Array.from(document.querySelectorAll('.label'));
                labels.forEach(label => {

                    label.style.display = 'none';

                })

                const pElement = document.createElement('p');
                pElement.textContent = `Error`;
                forecastDivElement.appendChild(pElement);

            }

        }

    }

}

attachEvents();