var clientId = '592277374552.apps.googleusercontent.com';
var apiKey = 'AIzaSyDzNmn7AtXYnZE2c0KCoMUA7fj7FxwqJzE';
var scopes = 'https://www.googleapis.com/auth/userinfo.email';


function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function makeApiCall() {
	  gapi.client.load('plus', 'v1', function() {
	      var request = gapi.client.plus.people.get({
	          'userId': 'me'
	            });
	      request.execute(function(resp) {
	          var heading = document.createElement('h4');
	          var image = document.createElement('img');
	          image.src = resp.image.url;
	          heading.appendChild(image);
	          heading.appendChild(document.createTextNode(resp.displayName));

	          document.getElementById('content').appendChild(heading);
	        });
	    });
}