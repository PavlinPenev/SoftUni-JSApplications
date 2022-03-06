const baseUrlFurniture = `http://localhost:3030/data/furniture`;
const baseUrlOrders = `http://localhost:3030/data/orders`;
const baseUrlLogout = `http://localhost:3030/users/logout`;

export const logout = async () => {

    const userObject = JSON.parse(sessionStorage.user);

    const logoutResponse = await fetch(baseUrlLogout, {

        headers: {

            "X-Authorization": userObject.accessToken

        }

    });

    if (logoutResponse.ok) {

        sessionStorage.clear();
        location.href = `home.html`;

    }

}


export const loadFurniture = async () => {

    const furnitureResponse = await fetch(baseUrlFurniture);
    const furnitureResult = await furnitureResponse.json();

    if (furnitureResponse.ok) {

        createAndAppendDOM(furnitureResult);

    }

    if (furnitureResult.length === 0) {

        const tableBody = document.getElementById('table-body');

        tableBody.innerHTML = 'No items currently are available in the catalog';
        tableBody.style.textAlign = 'center';

    }

}

export const createProduct = async (createForm) => {

    const formData = new FormData(createForm);

    const productRequestBody = {

        furnitureName: formData.get('name'),
        price: formData.get('price'),
        factor: formData.get('factor'),
        imgUrl: formData.get('img')

    };

    await fetch(baseUrlFurniture, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        },
        body: JSON.stringify(productRequestBody)

    })

    loadFurniture();

};

export const buyProducts = async () => {

    const checkedFurniture = Array.from(document.querySelectorAll('input.checkbox')).filter(x => x.checked);

    const allFurnitureResponse = await fetch(baseUrlFurniture);
    const allFurnitureResult = await allFurnitureResponse.json();

    for (const checkbox of checkedFurniture) {

        const furnitureChecked = allFurnitureResult.find(x => x._id === checkbox.id);

        const requestBody = {

            furnitureName: furnitureChecked.furnitureName,
            price: furnitureChecked.price,
            factor: furnitureChecked.factor,
            imgUrl: furnitureChecked.imgUrl

        };

        await fetch(baseUrlOrders, {

            method: 'POST',
            headers: {

                "Content-Type": "application/json",
                "X-Authorization": JSON.parse(sessionStorage.user).accessToken

            },
            body: JSON.stringify(requestBody)

        })

    }

    checkedFurniture.forEach(x => x.checked = false);

};

export const viewBoughtFurniture = async (ev) => {

    ev.preventDefault();

    const boughtFurnitureResponse = await fetch(baseUrlOrders);
    const boughtFurnitureResult = await boughtFurnitureResponse.json();

    const stringBoughtFurniture = boughtFurnitureResult.map(x => x.furnitureName).join(', ');
    const price = boughtFurnitureResult.reduce((a, b) => a + Number(b.price), 0);

    document.getElementById('bought-furniture').textContent = stringBoughtFurniture;
    document.getElementById('price-for-bought').textContent = `${price} $`;

}

const createAndAppendDOM = (furniture) => {

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    for (const item of furniture) {

        const rowElement = document.createElement('tr');
        tableBody.appendChild(rowElement);

        const imgTdElement = document.createElement('td');
        rowElement.appendChild(imgTdElement);

        const imgElement = document.createElement('img');
        imgElement.src = item.imgUrl;
        imgTdElement.appendChild(imgElement);

        const furnitureNameTdElement = document.createElement('td');
        rowElement.appendChild(furnitureNameTdElement);

        const furnitureNamePElement = document.createElement('p');
        furnitureNamePElement.textContent = item.furnitureName;
        furnitureNameTdElement.appendChild(furnitureNamePElement);

        const priceTdElement = document.createElement('td');
        rowElement.appendChild(priceTdElement);

        const pricePElement = document.createElement('p');
        pricePElement.textContent = item.price;
        priceTdElement.appendChild(pricePElement);

        const factorTdElement = document.createElement('td');
        rowElement.appendChild(factorTdElement);

        const factorPElement = document.createElement('p');
        factorPElement.textContent = item.factor;
        factorTdElement.appendChild(factorPElement);

        const checkboxTdElement = document.createElement('td');
        rowElement.appendChild(checkboxTdElement);

        const checkboxElement = document.createElement('input');
        checkboxElement.type = 'checkbox';
        checkboxElement.disabled = sessionStorage.user ? false : true;
        checkboxElement.id = item._id;
        checkboxElement.classList.add('checkbox');
        checkboxTdElement.appendChild(checkboxElement);

    }

};