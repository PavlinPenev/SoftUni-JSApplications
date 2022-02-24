async function loadCommits() {
    
    const username = document.getElementById('username').value;
    const repoName = document.getElementById('repo').value;

    const ulCommits = document.getElementById('commits');
    ulCommits.innerHTML = '';

    const endpoint = `https://api.github.com/repos/${username}/${repoName}/commits`;

    let errorHandle = '';

    try {
        
        const commitsResponse = await fetch(endpoint);
        errorHandle = commitsResponse.status;

        const commitsResult = await commitsResponse.json();

        commitsResult.forEach(commit => {
            
            const liCommitInfo = document.createElement('li');
            liCommitInfo.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            ulCommits.appendChild(liCommitInfo);

        });

    } catch {
        
        const liCommitInfo = document.createElement('li');
        liCommitInfo.textContent = `Error: ${errorHandle} (Not Found)`;
        ulCommits.appendChild(liCommitInfo);

    }



}