var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// logic.display data to page
var displayRepos = function(repos, searchTerm) {
  // checks if api returns any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "no repos found";
    return;
  }

  // clear old content
  repoContainerEl.textContent = "";
  // display value from formSubmitHandler(username) > getUserRepos(user)
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = `${repos[i].owner.login}/${repos[i].name}`;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", `./single-repo.html?repo=${repoName}`);
    // ** pause 6.4.4 **

    // create span element to hold repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append | <div .repoEl><span>repoName</span></div>
    repoEl.appendChild(titleEl);

    // create status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i>${repos[i].open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`;
    }

    // append to container
    repoEl.appendChild(statusEl);
    
    // append | <repoContainer><repoEl/></repoContainer>
    repoContainerEl.appendChild(repoEl);
  }
};

// logic.using the user-submitted username
var formSubmitHandler = function(event) {
  event.preventDefault();
  
  // removes whitespace from user input
  var username = nameInputEl.value.trim();

  if (username) {
    // pass username as an argument into getUserRepos()
    getUserRepos(username);
    // clears form input field
    nameInputEl.value = "";
  } else {
    console.log("enter github username");
  }
};

// logic.get api data
var getUserRepos = function (user) {
  // formatting api url
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // api fetch request
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      console.log("error: github user not found");
    }
  })
  .catch(function(error) {
    // method format: fetch().then().catch()
    // connectivity issues
    console.log("unable to connect to github");
  });
};

var getFeaturedRepos = function (language) {
  var apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      console.log("error: github user not found");
    }
  });
};

// logic.clicked button specifies searched language
var buttonClickHandler = function(event) {
  var language = event.target.getAttribute("data-language");
  if (language) {
    getFeaturedRepos(language);
    // clear old content
    repoContainerEl.textContent = "";
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler)
