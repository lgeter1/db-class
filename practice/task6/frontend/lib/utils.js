require("isomorphic-fetch");
import BPromise from "bluebird";

function getJson(url) {
  return fetch(url).then(function (resp) {
    console.log(url, resp);
    return resp.json();
//i    x = 43;
  });
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  createAccount: function (user_info) {
	     let data = {
		           username: user_info.username,
		           password: user_info.password,
		           screenname: user_info.screenname
		         }

	      console.log(user_info.username);
	      console.log(user_info.password);
	      console.log(user_info.screename);

	      return fetch("http://localhost:8080/create", {
		            method: 'POST',
		            headers: {
				            'Accept': 'application/json',
				            'Content-Type': 'application/json'
				          },
		            body: JSON.stringify(data)}).then(function(resp) { return resp.json() });
	    },
  getLogin: function (user_info) {
    	     let data = {
		           username: user_info.username,
		           password: user_info.password
		         }

	      console.log(user_info.username);
	      console.log(user_info.password);

	      return fetch("http://localhost:8080/login", {
		                method: 'POST',
		                headers: {
					            'Accept': 'application/json',
					            'Content-Type': 'application/json'
					          },
		                body: JSON.stringify(data)}).then(function(resp) { return resp.json() });
  },
};
