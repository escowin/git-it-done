var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
  // fnding the repo name from the query string
  var queryString = document.location.search;
  // splitting the query string into an array & getting its second element
  var repoName = queryString.split("=")[1];

  // passing the variable into the function to fetch related issues from the api issues endpoint
  getRepoIssues(repoName);

  repoNameEl.textContent = repoName;
};

var displayWarning = function(repo) {
  limitWarningEl.textContent = "want to see full list of issues? visit ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "github.com to see more";
  linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

var displayIssues = function(issues) {
  // if there are no open issues in repo
  if (issues.length === 0) {
    issueContainerEl.textContent = "this repo currently hasn't any open issues";
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to issues on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to parent container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(issue)";
    }

    // append to parent container
    issueEl.appendChild(typeEl);

    // append to dom element container 
    issueContainerEl.appendChild(issueEl);
  }
};

var getRepoIssues = function(repo) {
  var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

  fetch(apiUrl).then(function(response) {
    // successful request
    if (response.ok) {
      response.json().then(function(data) {
        // pass response data to dom function
        displayIssues(data);

        // check if api has pagination
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      console.log("problem with request.")
    }
  });
};

getRepoIssues();
getRepoName();