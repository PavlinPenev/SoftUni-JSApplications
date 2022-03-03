function attachEvents() {

    const baseUrl = `http://localhost:3030`;
    const phonebookUrl = `/jsonstore/phonebook`;
    const phonebookEndpoint = `${baseUrl}${phonebookUrl}`;

    const phonebookElement = document.getElementById('phonebook');

    const personInputField = document.getElementById('person');
    const phoneInputField = document.getElementById('phone');

    const createRecordButton = document.getElementById('btnCreate');
    createRecordButton.addEventListener('click', createRecord);

    const loadButton = document.getElementById('btnLoad');
    loadButton.addEventListener('click', loadPhonebook);

    async function createRecord() {

        const requestBody = { person: personInputField.value, phone: phoneInputField.value };

        await fetch(phonebookEndpoint, {

            method: 'POST',
            headers: {

                'Content-type': 'application/json'

            },
            body: JSON.stringify(requestBody)

        })

        loadPhonebook(); // reload the phonebook data after creating a record

    }

    async function deleteRecord(ev) {

        ev.preventDefault();

        const deleteEndpoint = `${phonebookEndpoint}/${ev.target.parentNode.id}`;

        await fetch(deleteEndpoint, {

            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }

        });

        loadPhonebook(); //reload the phonebook data after deleting a record

    }

    async function loadPhonebook() {

        phonebookElement.innerHTML = '';

        const phonebookResponse = await fetch(phonebookEndpoint);
        const phonebookResult = await phonebookResponse.json();

        for (const record in phonebookResult) {

            const liElement = document.createElement('li');
            liElement.textContent = `${phonebookResult[record].person}: ${phonebookResult[record].phone}`;
            liElement.id = record;
            phonebookElement.appendChild(liElement);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = `Delete`;
            deleteButton.addEventListener(`click`, deleteRecord);
            liElement.appendChild(deleteButton);


        }

    }

}

attachEvents();