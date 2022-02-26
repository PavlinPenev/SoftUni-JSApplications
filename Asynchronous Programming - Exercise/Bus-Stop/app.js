window.onload = getInfo;

function getInfo() {

    const baseUrl = 'http://localhost:3030';

    const buttonElement = document.getElementById('submit');
    buttonElement.addEventListener('click', loadBusStopInfo);

    const busIdElement = document.getElementById('stopId');

    const ulElement = document.getElementById('buses');
    const nameDivElement = document.getElementById('stopName');

    async function loadBusStopInfo(ev) {
        
        ev.preventDefault();

        if (busIdElement.value) {
            
            const busIdValue = busIdElement.value;

            const endpoint = `${baseUrl}/jsonstore/bus/businfo/${busIdValue}`;

            ulElement.innerHTML = '';

            try {

                const busStopResponse = await fetch(endpoint);

                const busStopResult = await busStopResponse.json();

                nameDivElement.textContent = busStopResult.name;

                for (const key in busStopResult.buses) {
                
                    const liElement = document.createElement('li');
                    liElement.textContent = `Bus ${key} arrives in ${busStopResult.buses[key]} minutes`;
                    ulElement.appendChild(liElement);

                }

            } catch {

                nameDivElement.textContent = `Error`;
                
            }

        }
    }
}