var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // successful request
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom()
                displayIssues(data);

                // check for api paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
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

var displayWarning = function(repo) {
    // add text | <div id="limit-warning">...</>
    limitWarningEl.textContent = "see more than these 30 issues, visit ";

    // add | <a href="..." target="...">...</>
    var linkEl = document.createElement("a")
    linkEl.textContent = "github.com to see more";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append | <div...><a...>...</>
    limitWarningEl.appendChild(linkEl);

};

getRepoIssues("facebook/react");