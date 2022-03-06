const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', logUser);
registerForm.addEventListener('submit', registerUser);

async function logUser(ev) {

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

        location.href = `homeLogged.html`;
        return;

    }

    alert('Invalid email or password');

}

async function registerUser(ev) {

    ev.preventDefault();

    const baseUrl = `http://localhost:3030/users/register`;

    const formData = new FormData(registerForm);

    if (formData.get('rePass') !== formData.get('password')) {

        alert('Password and Password Repeat don\'t match');
        return;

    }

    const registerRequestBody = { email: formData.get('email'), password: formData.get('password') };

    const registerResponse = await fetch(baseUrl, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json"

        },
        body: JSON.stringify(registerRequestBody)

    })

    if (registerResponse.ok) {

        const registerResult = await registerResponse.json();

        const username = registerResult.email.split('@');

        const registeredUserObject = {
            email: registerResult.email,
            username: username[0][0].toUpperCase() + username[0].slice(1),
            accessToken: registerResult.accessToken,
            _id: registerResult._id
        };

        sessionStorage.setItem('user', JSON.stringify(registeredUserObject));

        location.href = 'homeLogged.html';

    }

    registerForm.reset();

}