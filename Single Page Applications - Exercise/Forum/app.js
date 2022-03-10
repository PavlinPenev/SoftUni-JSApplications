import * as Components from './compile-components.js';
import * as Routes from './router.js';
import * as HttpClient from './http-client.service.js';

let isPathHomePage = true;
let formOnPage;
let topicContainer = document.getElementsByClassName('topic-container')[0];
let MutationObserver = window.MutationObserver;
let postsLoaded = false;
let commentsLoaded = false;
let topicId;

let observer = new MutationObserver(() => {

    topicContainer = document.getElementsByClassName('topic-container')[0];

    isPathHomePage = window.location.pathname.includes('index') ? true : false;

    if (!postsLoaded && isPathHomePage) {

        loadPosts();

        postsLoaded = true;

    }

    if (!commentsLoaded && !isPathHomePage) {

        loadTopicHeader();
        loadComments();

        commentsLoaded = true;

    }

    formOnPage = getForm();

});

observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
});

window.onload = async (ev) => {

    if (!postsLoaded) {

        loadPosts();

        postsLoaded = true;

    }

    formOnPage = getForm();

    document.getElementById('anchor-home').addEventListener('click', () => {

        navigateToHome();

        postsLoaded = false;

    });

    document.getElementsByClassName('cancel')[0].addEventListener('click', () => formOnPage.reset())

}

//Ajax Function Invoke
function makePostAsync(ev) {

    ev.preventDefault();

    HttpClient.makePostAsync(formOnPage);

    loadPosts();

}

function postCommentAsync(ev) {

    ev.preventDefault();

    HttpClient.postCommentAsync(formOnPage, topicId);

    loadTopicHeader();
    loadComments();

}

async function loadPosts() {

    const posts = await HttpClient.getPostsAsync();

    if (isPathHomePage) {

        for (const post in posts) {

            const component = Components.postStructureHomePage();
            component.querySelector('a').id = posts[post]._id;
            component.querySelector('a').onclick = navigateToPost;
            component.querySelector('h2').textContent = posts[post].topicName;
            component.querySelector('time').textContent = posts[post].createdOn;
            component.querySelector('.name').textContent = posts[post].username;

            topicContainer.append(component);
        }

    }

}

async function loadComments() {

    const comments = await HttpClient.getCommentsAsync();

    const commentContainer = document.getElementsByClassName('comment')[0];

    const commentsArr = Object.entries(comments).filter(([, value]) => value.topicId === topicId);

    commentsArr.forEach(comment => {

        const component = Components.commentStructure();
        component.querySelector('.name-comment').textContent = comment[1].username;
        component.querySelector('.time-content').textContent = comment[1].createdOn;
        component.querySelector('.post-details-comment').textContent = comment[1].comment;

        commentContainer.appendChild(component);

    })

    commentsLoaded = true;

}

async function loadTopicHeader() {

    const topic = await HttpClient.getHeaderAsync(topicId);

    const commentDiv = document.getElementsByClassName('comment')[0];
    commentDiv.innerHTML = '';
    const component = Components.postStructurePostDetailsPage();
    component.querySelector('.post-name').textContent = topic.username;
    component.querySelector('.post-time').textContent = topic.createdOn;
    component.querySelector('.post-content').textContent = topic.content;
    commentDiv.appendChild(component);

    const titleHeading = document.querySelector('.title-topic');
    titleHeading.textContent = topic.topicName;

}

//Routing Invoke
function navigateToPost() {

    topicId = this.id;

    commentsLoaded = false;

    Routes.navigateToPost();

}

function navigateToHome() {

    commentsLoaded = false;

    Routes.navigateToHome();

}

//utility
function getForm() {

    const form = isPathHomePage
        ? document.getElementById('post-form')
        : document.getElementById('comment-form');

    form.addEventListener('submit', isPathHomePage
        ? makePostAsync
        : postCommentAsync);

    return form;

}