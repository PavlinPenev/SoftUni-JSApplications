function attachEvents() {

    const baseUrl = `http://localhost:3030`;
    const postsEndpoint = `${baseUrl}/jsonstore/blog/posts`;
    const commentsEndpoint = `${baseUrl}/jsonstore/blog/comments`;

    const dropdownPostsMenu = document.getElementById('posts');

    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const buttonLoadPosts = document.getElementById('btnLoadPosts');
    buttonLoadPosts.addEventListener('click', loadPosts);

    const buttonViewPost = document.getElementById('btnViewPost');
    buttonViewPost.addEventListener('click', viewPost);

    async function viewPost() {

        postComments.innerHTML = '';

        const postsResponse = await fetch(postsEndpoint);
        const postsResult = await postsResponse.json();

        postTitle.textContent = postsResult[dropdownPostsMenu.value].title.toUpperCase();
        postBody.textContent = postsResult[dropdownPostsMenu.value].body;

        const commentsResponse = await fetch(commentsEndpoint);
        const commentsResult = await commentsResponse.json();

        let asArr = Object.entries(commentsResult);
        asArr = asArr.filter(([, value]) => value.postId === dropdownPostsMenu.value);

        for (const [key, value] of asArr) {

            const liElement = document.createElement('li');
            liElement.id = key;
            liElement.textContent = value.text;
            postComments.appendChild(liElement);

        }

    }

    async function loadPosts() {

        const postsResponse = await fetch(postsEndpoint);
        const postsResult = await postsResponse.json();

        for (const key in postsResult) {

            const optionElement = document.createElement('option');
            optionElement.textContent = postsResult[key].title;
            optionElement.value = key;
            dropdownPostsMenu.appendChild(optionElement);

        }

    }

}

attachEvents();