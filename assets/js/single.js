var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // successful request
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("problem with request");
        }
    });
};

getRepoIssues("escowin/git-it-done");