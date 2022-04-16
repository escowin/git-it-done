var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// fetch api
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
        // succesful request
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
          alert("404 | github user not found");
        }
      })
    
    //   .catch handles fetch api network errors
    .catch(function(error) {
        // fetch(apiUrl).then().catch()
        alert("connectivity issues with github")
    });
  };
  
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from <input>
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = ""; // clears <input>
    } else {
        alert("enter a github username");
    }
};

// displays repos
var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "repos not found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create <div> container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create <span> to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append <span> to <div> container | <div><span>repoName...</>
        repoEl.appendChild(titleEl);

        // create <span>status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if repo has issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // appened to <div> cotainer
        repoEl.appendChild(statusEl);

        // append <div> container to dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);  