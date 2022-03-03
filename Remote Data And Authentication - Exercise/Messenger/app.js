function attachEvents() {

    const baseUrl = `http://localhost:3030`;
    const messengerUrl = `/jsonstore/messenger`;
    const endpoint = `${baseUrl}${messengerUrl}`;

    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', postToMessenger);

    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', showMessages);

    const textArea = document.getElementById('messages');

    const authorInputField = document.querySelector('#controls').children[1];
    const messageInputField = document.querySelector('#controls').children[4];

    async function postToMessenger(ev) {

        ev.preventDefault();

        const authorValue = authorInputField.value;
        const messageValue = messageInputField.value;

        authorInputField.value = '';
        messageInputField.value = '';

        const requestBody = { author: authorValue, content: messageValue };
        const postResponse = await fetch(endpoint, {

            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(requestBody)

        })

    }

    async function showMessages(ev) {

        ev.preventDefault();

        textArea.textContent = '';

        const responseMessages = await fetch(endpoint);
        const resultMessages = await responseMessages.json();

        for (const message in resultMessages) {

            textArea.textContent += `${resultMessages[message].author}: ${resultMessages[message].content}\n`;

        }
        textArea.textContent.trimEnd();

    }

}

attachEvents();