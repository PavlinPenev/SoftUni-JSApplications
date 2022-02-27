async function lockedProfile() {

    const baseUrl = `http://localhost:3030`;
    const profilesEndpoint = `${baseUrl}/jsonstore/advanced/profiles`;

    const profilesResponse = await fetch(profilesEndpoint);
    const profilesResult = await profilesResponse.json();
    const mainElement = document.getElementById('main');
    mainElement.innerHTML = '';
    
    let counter = 0;
    for (const key in profilesResult) {

        const profileHtmlTemplate = `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${++counter}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${counter}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${counter}Username" value="${profilesResult[key].username}" disabled readonly />
            <div class="hiddenInfo" disabled readonly>
                <hr>
                <label>Email:</label>
                <input type="email" name="user${counter}Email" value="${profilesResult[key].email}"/>
                <label>Age:</label>
                <input type="email" name="user${counter}Age" value="${profilesResult[key].age}"/>
            </div>
    
            <button>Show more</button>
        </div>`;

        mainElement.innerHTML += profileHtmlTemplate + '\n';

    }

    mainElement.innerHTML.trimEnd();

    const buttons = Array.from(document.getElementsByTagName('button'));
    buttons.forEach(x => x.addEventListener('click', showHideFields));

    function showHideFields(ev) {

        if(ev.target.parentNode.children[2].checked) {

            return;

        }
        
        if(ev.target.textContent === 'Show more') {
            
            ev.target.parentNode.children[9].style.display = 'block';
            ev.target.parentNode.children[9].classList.remove('hiddenInfo');
            ev.target.parentNode.children[9].children[2].style.display = 'block';
            ev.target.parentNode.children[9].children[3].style.display = 'block';
            ev.target.textContent = 'Hide it';

        } else {

            ev.target.parentNode.children[9].style.display = 'none';
            ev.target.parentNode.children[9].classList.add('hiddenInfo');

            ev.target.textContent = 'Show more'

        }

    }

}