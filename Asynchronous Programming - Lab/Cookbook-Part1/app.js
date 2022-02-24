window.onload = cookbook;

async function cookbook() {
    
    //localhost:3030 is the server running on my machine
    const mainContainer = document.getElementsByTagName('main')[0];
    
    const endpoint = `http://localhost:3030/jsonstore/cookbook/recipes`;

    const recipesResponse = await fetch(endpoint);

    if (recipesResponse.ok) {
        
        document.getElementsByTagName('p')[0].remove();

    }

    const recipesResult = await recipesResponse.json();

    for (const recipe in recipesResult) {
        
        const articleElement = document.createElement('article');
        articleElement.addEventListener('click', showDetails);
        articleElement.classList.add('preview');
        mainContainer.appendChild(articleElement);

        const divTitleElement = document.createElement('div');
        divTitleElement.classList.add('title');
        articleElement.appendChild(divTitleElement);
        const h2TitleElement = document.createElement('h2');
        h2TitleElement.textContent = `${recipesResult[recipe].name}`;
        divTitleElement.appendChild(h2TitleElement);

        const divImgElement = document.createElement('div');
        divImgElement.classList.add('small');
        articleElement.appendChild(divImgElement);

        const imgElement = document.createElement('img');
        imgElement.src = `${recipesResult[recipe].img}`;
        divImgElement.appendChild(imgElement);
        
    }

    async function showDetails(ev) {

        const recipeId = '0' + ev.target.children[0].children[0].textContent[ev.target.children[0].children[0].textContent.length - 1]; 
        //in this case I know we have only 3 recipes so I generate the id while taking the last character and adding a leading zero, 
        //in a real situation I would generate it with a split and a padStart if necessary
        
        const detailsEndpoint = `http://localhost:3030/jsonstore/cookbook/details/${recipeId}`;

        const detailsResponse = await fetch(detailsEndpoint);
        const detailsResult = await detailsResponse.json();

        ev.target.innerHTML = '';

        const h2TitleElement = document.createElement('h2');
        h2TitleElement.textContent = detailsResult.name;
        ev.target.appendChild(h2TitleElement);

        const bandDivElement = document.createElement('div');
        bandDivElement.classList.add('band');
        ev.target.appendChild(bandDivElement);

        const thumbDivElement = document.createElement('div');
        thumbDivElement.classList.add('thumb');
        bandDivElement.appendChild(thumbDivElement);

        const imgElement = document.createElement('img');
        imgElement.src = detailsResult.img;
        thumbDivElement.appendChild(imgElement);

        const ingredientsDivElement = document.createElement('div');
        ingredientsDivElement.classList.add('ingredients');
        bandDivElement.appendChild(ingredientsDivElement);

        const h3TitleElement = document.createElement('h3');
        h3TitleElement.textContent = `Ingredients:`;
        ingredientsDivElement.appendChild(h3TitleElement);

        const ulElement = document.createElement('ul');
        ingredientsDivElement.appendChild(ulElement);

        detailsResult.ingredients.forEach(ingredient => {
            
            const liElement = document.createElement('li');
            liElement.textContent = ingredient;
            ulElement.appendChild(liElement);

        });

        const descriptionDivElement = document.createElement('div');
        descriptionDivElement.classList.add('description');
        ev.target.appendChild(descriptionDivElement);

        const h3Element = document.createElement('h3');
        h3Element.textContent = `Preparation:`;
        descriptionDivElement.appendChild(h3Element);

        detailsResult.steps.forEach(step => {

            const pElement = document.createElement('p');
            pElement.textContent = step;
            descriptionDivElement.appendChild(pElement);

        })

    }

}