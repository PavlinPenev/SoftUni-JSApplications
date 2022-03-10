// Posts
export const postStructureHomePage = () => {

    const divWrapper = createElementFactory('div', 'topic-name-wrapper');

    const topicNameDivElement = createElementFactory('div', 'topic-name-home');
    divWrapper.appendChild(topicNameDivElement);

    const postDetailsAnchor = createElementFactory('a', 'normal');
    topicNameDivElement.appendChild(postDetailsAnchor);

    const h2TitleElement = createElementFactory('h2');
    postDetailsAnchor.appendChild(h2TitleElement);

    const columnsDiv = createElementFactory('div', 'columns');
    topicNameDivElement.appendChild(columnsDiv);

    const div = createElementFactory('div');
    columnsDiv.appendChild(div);

    const p = createElementFactory('p');
    p.textContent = 'Date: ';
    div.appendChild(p);

    const timeElement = createElementFactory('time');
    p.appendChild(timeElement);

    const nicknameElement = createElementFactory('div', 'nick-name');
    div.appendChild(nicknameElement);

    const pNicknameElement = createElementFactory('p');
    pNicknameElement.textContent = `Username: `;
    nicknameElement.appendChild(pNicknameElement);

    const spanName = createElementFactory('span', 'name');
    pNicknameElement.appendChild(spanName);

    return divWrapper;
}

export const postStructurePostDetailsPage = () => {

    const divHeader = createElementFactory('div', 'header');

    const img = createElementFactory('img');
    img.src = "./static/profile.png";
    img.alt = "avatar";
    divHeader.appendChild(img);

    const p = createElementFactory('p');
    const spanPostName = createElementFactory('span', 'post-name');
    p.appendChild(spanPostName);
    const textNode = document.createTextNode(' posted on ');
    p.appendChild(textNode);
    const time = createElementFactory('time', 'post-time');
    p.appendChild(time);
    divHeader.appendChild(p);

    const pContent = createElementFactory('p', 'post-content');
    divHeader.appendChild(pContent);

    return divHeader;

}

export const commentStructure = () => {

    const divWrapper = createElementFactory('div', 'user-comment');

    const topicNameWrapper = createElementFactory('div', 'topic-name-wrapper');
    divWrapper.appendChild(topicNameWrapper);

    const topicName = createElementFactory('div', 'topic-name');
    topicNameWrapper.appendChild(topicName);

    const p = createElementFactory('p');
    const strong = createElementFactory('strong', 'name-comment');
    p.appendChild(strong);
    const textNode = document.createTextNode(' commented on ');
    p.appendChild(textNode);
    const time = createElementFactory('time', 'time-content');
    p.appendChild(time);
    topicName.appendChild(p);

    const postContent = createElementFactory('div', 'post-content');
    topicName.appendChild(postContent);

    const pDetailsComment = createElementFactory('p', 'post-details-comment');
    postContent.appendChild(pDetailsComment);

    return divWrapper;

}

function createElementFactory(type, classOfElement) {

    const element = document.createElement(type);
    element.className = classOfElement ? classOfElement : '';

    return element;

}

//post-details
export const containerPost = `<div class="theme-content">
<!-- theme-title  -->
<div class="theme-title">
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2 class="title-topic"></h2>

        </div>

    </div>
</div>
<!-- comment  -->

<div class="comment">

</div>

<div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form id="comment-form">
            <textarea name="post-text" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>

</div>`;

//home container
export const containerHome = `<main>
<div class="new-topic-border">
    <div class="header-background">
        <span>New Topic</span>
    </div>
    <form id="post-form">
        <div class="new-topic-title">
            <label for="topicName">Title <span class="red">*</span></label>
            <input type="text" name="topicName" id="topicName">
        </div>
        <div class="new-topic-title">
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <div class="new-topic-content">
            <label for="postText">Post <span class="red">*</span></label>
            <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
        </div>
        <div class="new-topic-buttons">
            <button class="cancel">Cancel</button>
            <button class="public">Post</button>
        </div>

    </form>
</div>

<div class="topic-title">

    <!-- topic component  -->
    <div class="topic-container">

    </div>
        
</div>
    

</main>`;