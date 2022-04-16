var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // successful request
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom()
                displayIssues(data);
            });
        } else {
            alert("problem with request");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "no open issues";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create <a href="issues[i].html_url" target="_blank"> | target opens issue in new tab
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create | <span>issues[i].title</>
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append | <a...><span>...</>
        issueEl.appendChild(titleEl);

        // create | <span></> type element
        var typeEl = document.createElement("span");

        // check if issue is issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(pull request)";
        } else {
            typeEl.textContent = "(issue)";
        }

        // append | <a...><span>...</>
        issueEl.appendChild(typeEl);

        // append | <div id="issues-container"><a...>...</>
        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("escowin/git-it-done");