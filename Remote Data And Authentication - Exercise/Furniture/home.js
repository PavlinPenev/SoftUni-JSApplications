import * as utility from "./utility.js";

window.onload = (ev) => {

  ev.preventDefault();

  const logoutButton = document.getElementById('logoutBtn');
  if (logoutButton) {

    logoutButton.addEventListener('click', utility.logout);

  }

  const createForm = document.getElementById('create-form');
  if (createForm) {

    createForm.addEventListener('submit', (ev) => {

      ev.preventDefault();

      utility.createProduct(createForm);

    });

  }

  const buyButton = document.getElementById('buy-button');
  if (buyButton) {

    buyButton.addEventListener('click', utility.buyProducts);

  }

  const viewOrdersButton = document.getElementById('all-orders');
  if (viewOrdersButton) {

    viewOrdersButton.addEventListener('click', utility.viewBoughtFurniture);

  }

  utility.loadFurniture();

}
