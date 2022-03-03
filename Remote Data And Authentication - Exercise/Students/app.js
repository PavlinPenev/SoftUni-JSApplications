window.onload = attachEvents;

function attachEvents() {

    const baseUrl = `http://localhost:3030`;
    const studentsUrl = `/jsonstore/collections/students`;
    const studentsEndpoint = `${baseUrl}${studentsUrl}`;

    const tableBody = document.getElementById('results').children[1];

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', createStudentRecord);

    loadStudents();

    async function createStudentRecord(ev) {

        ev.preventDefault();

        const form = new FormData(ev.target);

        const studentRequestBody = {

            firstName: form.get('firstName'),
            lastName: form.get('lastName'),
            facultyNumber: form.get('facultyNumber'),
            grade: form.get('grade')

        }

        await fetch(studentsEndpoint, {

            method: 'POST',
            headers: {

                'Content-type': 'application/json'

            },
            body: JSON.stringify(studentRequestBody)

        });

        loadStudents();

    }

    async function loadStudents() {

        const studentsResponse = await fetch(studentsEndpoint);
        const studentsResult = await studentsResponse.json();

        tableBody.innerHTML = '';

        for (const student in studentsResult) {

            const trElement = document.createElement('tr');
            tableBody.appendChild(trElement);

            const tdFirstNameElement = document.createElement('td');
            tdFirstNameElement.textContent = studentsResult[student].firstName;
            trElement.appendChild(tdFirstNameElement);

            const tdLastNameElement = document.createElement('td');
            tdLastNameElement.textContent = studentsResult[student].lastName;
            trElement.appendChild(tdLastNameElement);

            const tdFNumberElement = document.createElement('td');
            tdFNumberElement.textContent = studentsResult[student].facultyNumber;
            trElement.appendChild(tdFNumberElement);

            const tdGradeElement = document.createElement('td');
            tdGradeElement.textContent = studentsResult[student].grade;
            trElement.appendChild(tdGradeElement);

        }

    }

}