/*
 *	Simple login using only localStorage.
 *
 *	We just need a storage beacause the true login is implemented by soulseek
 *
 */

let isAuth = () => {

	return localStorage.getItem("username") ? true : false;
};

let login = (username, password) => {

	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
};

let getLoginData = (username, password) => {

	return {
		username: localStorage.getItem("username"),
		password: localStorage.getItem("password"),
	};
};

let logout = () => {

	localStorage.removeItem("username");
	localStorage.removeItem("password");
};

let Login = {

	isAuth: isAuth,
	login: login,
	getLoginData: getLoginData,
	logout: logout,
};

export default Login;