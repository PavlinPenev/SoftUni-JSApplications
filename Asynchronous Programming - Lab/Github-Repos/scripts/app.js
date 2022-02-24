async function loadRepos() {

	const inputField = document.getElementById('username');
	const username = inputField.value;

	const ulRepos = document.getElementById('repos');
	ulRepos.innerHTML = '';

	const endpoint = `https://api.github.com/users/${username}/repos`;

	let errorHandle = '';

	try {
		
		const repos = await fetch(endpoint);
		errorHandle = `Status code: ${repos.status} ${repos.statusText}`;
		const reposData = await repos.json();
		reposData.forEach(repo => {
			
			const fullName = repo.full_name;
			const url = repo.html_url;
	
			const liElement = document.createElement('li');
			ulRepos.appendChild(liElement);
	
			const aHyperLinkRepo = document.createElement('a');
			aHyperLinkRepo.href = `${url}`;
			aHyperLinkRepo.textContent = `${fullName}`;
			liElement.appendChild(aHyperLinkRepo);
	
		});

	} catch {
		
		const liElement = document.createElement('li');
		ulRepos.appendChild(liElement);
		liElement.textContent = errorHandle;

	}

}