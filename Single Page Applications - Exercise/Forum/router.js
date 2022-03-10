import * as Components from './compile-components.js';

export const navigateToPost = () => {

    document.getElementsByClassName('container')[0].innerHTML = Components.containerPost;

    window.history.replaceState({}, '', 'post-details.html')

}

export const navigateToHome = () => {

    document.getElementsByClassName('container')[0].innerHTML = Components.containerHome;

    window.history.replaceState({}, '', 'index.html')

}