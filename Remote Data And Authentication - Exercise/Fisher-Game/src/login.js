const loginForm = document.getElementById('login-form');
const anchors = document.getElementsByTagName('a');

const userSpanElement = document.getElementById('user-span');
const divGuestElement = document.getElementById('guest');
const logoutAnchor = document.getElementById('logout');

logoutAnchor.addEventListener('click', async () => {

    const baseUrl = `http://localhost:3030/users/logout`;

    const logoutResponse = await fetch(baseUrl);

    if (logoutResponse.ok) {

        sessionStorage.clear();
        location.href = `index.html`;

    }

})

loginForm.addEventListener('submit', async (ev) => {

    ev.preventDefault();

    const baseUrl = `http://localhost:3030/users/login`;

    const formData = new FormData(loginForm);

    const loginBody = { email: formData.get('email'), password: formData.get('password') };

    const loginResponse = await fetch(baseUrl, {

        method: 'POST',
        headers: {

            "Content-type": "application/json"

        },
        body: JSON.stringify(loginBody)

    });
    const loginResult = await loginResponse.json();

    sessionStorage.setItem('user', JSON.stringify(loginResult));

    loginForm.reset();

    if (loginResponse.ok) {

        location.href = `index.html`;
        return;

    }

    alert('Invalid email or password');
});

window.onload = () => {

    Array.from(anchors).forEach(a => a.classList.remove('active'));

    document.getElementById('login').classList.add('active');

    if (sessionStorage.user) {

        const userObject = JSON.parse(sessionStorage.user);

        userSpanElement.textContent = userObject.username;
        divGuestElement.classList.add('hide-navigation');
        logoutAnchor.classList.remove('hide-navigation');

    } else {

        divGuestElement.classList.remove('hide-navigation');
        userSpanElement.textContent = 'guest';
        logoutAnchor.classList.add('hide-navigation');

    }

}
