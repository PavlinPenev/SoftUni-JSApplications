function solve() {

    let busStop = 'depot';
    let currentBusStop = '';
    const baseUrl = 'http://localhost:3030';
    
    const spanInfoElement = document.querySelector('.info');

    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    function disableButtons() {

        departButton.disabled = departButton.disabled ? false : true;
        arriveButton.disabled = arriveButton.disabled ? false : true;

    }

    async function depart() {

        const busStopEndpoint = `${baseUrl}/jsonstore/bus/schedule/${busStop}`;

        try {
            
            const busStopResponse = await fetch(busStopEndpoint);
            const busStopResult = await busStopResponse.json();
            
            spanInfoElement.textContent  = `Next stop ${busStopResult.name}`;
            currentBusStop = busStopResult.name;
            busStop = busStopResult.next;
    
            disableButtons();

        } catch {
            
            spanInfoElement.textContent = `Error`;
            departButton.disabled = true;
            arriveButton.disabled = true;

        }

    }

    function arrive() {

        spanInfoElement.textContent = `Arriving at ${currentBusStop}`;

        disableButtons();

    }

    return {
        depart,
        arrive
    };
}

let result = solve();