function loadRepos() {

   const divElement = document.getElementById('res');

   const xhr = new XMLHttpRequest();
   const method = "GET";
   const url = "https://api.github.com/users/testnakov/repos";

   xhr.open(method, url, true);
   xhr.onreadystatechange = function () {

      if (xhr.readyState === 4) {
         
         divElement.textContent = xhr.responseText;

      }

   }

   xhr.send();

}