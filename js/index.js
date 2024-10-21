let form = document.querySelector('#github-form');
let usersContainer = document.querySelector('#user-list');
let reposContainer = document.querySelector('#repos-list');
let searchField = document.getElementById('search');
let githubContainer = document.getElementById('github-container');

form.addEventListener('submit', (event) => {
  usersContainer.innerHTML = '';
  reposContainer.innerHTML = '';
  event.preventDefault();
  let userInput = searchField.value;
  fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then((response) => response.json())
    .then((userData) => {
      let user = document.createElement('li');

      let userName = document.createElement('p');
      userName.textContent = userData.items[0].login;
      user.appendChild(userName);

      let userAvatar = document.createElement('img');
      userAvatar.setAttribute('src', userData.items[0].avatar_url);
      user.appendChild(userAvatar);

      let userUrl = document.createElement('a');
      userUrl.setAttribute('href', userData.items[0].url);
      userUrl.textContent = `Link to ${userData.items[0].login}'s profile`;
      user.appendChild(userUrl);

      user.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${userName.innerText}/repos`)
          .then((response) => response.json())
          .then((repoData) => {
            for (let repo of repoData) {
              let repository = document.createElement('p');
              repository.innerText = repo.name;
              reposContainer.appendChild(repository);
            }
          });
      });
      usersContainer.appendChild(user);
    });
  form.reset();
});