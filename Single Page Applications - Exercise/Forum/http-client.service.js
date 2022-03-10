const postsEndpoint = `http://localhost:3030/jsonstore/collections/myboard/posts`;
const commentsEndpoint = `http://localhost:3030/jsonstore/collections/myboard/comments`;

export const getPostsAsync = async () => {

    const postsResponse = await fetch(postsEndpoint);

    const postsResult = await postsResponse.json();

    return postsResult;

}

export const makePostAsync = async (form) => {

    const formData = new FormData(form);

    const date = new Date();

    const requestBody = {

        topicName: formData.get('topicName'),
        username: formData.get('username'),
        content: formData.get('postText'),
        createdOn: date.toISOString()

    };

    await fetch(postsEndpoint, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json"

        },
        body: JSON.stringify(requestBody)

    });

    form.reset();

}

export const postCommentAsync = async (form, id) => {

    const formData = new FormData(form);

    const date = new Date();

    const requestBody = {

        username: formData.get('username'),
        comment: formData.get('post-text'),
        createdOn: date.toISOString(),
        topicId: id

    };

    await fetch(commentsEndpoint, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json"

        },
        body: JSON.stringify(requestBody)

    });

    form.reset();

}

export const getCommentsAsync = async (id) => {

    const commentsResponse = await fetch(commentsEndpoint);
    const commentsResult = await commentsResponse.json();

    return commentsResult;

}

export const getHeaderAsync = async (id) => {

    const topicResponse = await fetch(`${postsEndpoint}/${id}`);
    const topicResult = await topicResponse.json();

    return topicResult;

}