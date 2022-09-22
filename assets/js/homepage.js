var getUserRepos = function (user) {
  // formatting api url
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // api fetch request
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

getUserRepos("escowin");