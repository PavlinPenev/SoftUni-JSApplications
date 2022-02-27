async function solution() {

    const baseUrl = `http://localhost:3030`;
    const articlesEndpoint = `${baseUrl}/jsonstore/advanced/articles/list`;

    const articlesResponse = await fetch(articlesEndpoint);
    const articlesResult = await articlesResponse.json();

    const sectionElement = document.getElementById('main');

    articlesResult.forEach(async (article) => {
        
        const singleArticleEndpoint = `${baseUrl}/jsonstore/advanced/articles/details/${article._id}`;

        const singleArticleResponse = await fetch(singleArticleEndpoint);
        const singleArticleResult = await singleArticleResponse.json();

        const accordionDivElement = document.createElement('div');
        accordionDivElement.classList.add('accordion');

        const headDivElement = document.createElement('div');
        headDivElement.classList.add('head');
        accordionDivElement.appendChild(headDivElement);

        const spanTitleElement = document.createElement('span');
        spanTitleElement.textContent = singleArticleResult.title;
        headDivElement.appendChild(spanTitleElement);

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('button');
        buttonElement.id = singleArticleResult._id;
        buttonElement.textContent = `More`;
        buttonElement.addEventListener('click', showHideContent);
        headDivElement.appendChild(buttonElement);

        const extraDivElement = document.createElement('div');
        extraDivElement.classList.add('extra');
        accordionDivElement.appendChild(extraDivElement);

        const pElement = document.createElement('p');
        pElement.textContent = singleArticleResult.content;
        extraDivElement.appendChild(pElement);

        sectionElement.appendChild(accordionDivElement);

        function showHideContent(ev) {

            switch(ev.target.textContent) {
                case 'More':
                    ev.target.textContent = 'Less';
                    ev.target.parentNode.nextSibling.style.display = 'block';
                    break;
                case 'Less':
                    ev.target.textContent = 'More';
                    ev.target.parentNode.nextSibling.style.display = 'none';
                    break;
            }
    
        }

    });

}
solution();