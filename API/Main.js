function doLogin()
{
	// collect info
	var JSuid = document.getElementById("log_uid").value;
	var JSpwd = document.getElementById("log_password").value;

	var params = "uid="+JSuid+"&pwd="+JSpwd+"&loginSubmit=true";

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'API/login.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onload = function()
	{
		var response = this.responseText;

		if (response == 1)
		{
			document.getElementById("genMsg").innerHTML = "Login successful";
			hideOrShow( "logInField", false);
			hideOrShow( "logOutField", true);
			hideOrShow("displaySignup", false);
			return;
		}

		document.getElementById("logInResult").innerHTML = this.responseText;
	}

	xhr.send(params);
}

function doLogout()
{
	var params = "";

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'API/logout.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onload = function()
	{
		var response = this.responseText;

		if (response == 1)
		{
			document.getElementById("genMsg").innerHTML = "Logout successful";
			hideOrShow( "logInField", true);
			hideOrShow( "logOutField", false);
			hideOrShow("displaySignup", true);
			return;
		}

		document.getElementById("logInResult").innerHTML = this.responseText;
	}

	xhr.send(params);
	hideOrShow( "logInField", true);
	hideOrShow( "logOutField", false);
}

function goHome()
{
	// This means they are logged in
	if (document.getElementById("logOutField").style.display != "none")
	{
		// this is where we take them to the repective home page layouts
	}
	else
	{
		// since they are not logged in we can just reload
		location.reload();
	}
}

// if this function recieves false it displays the signup boxes
// if this function recieves true it processes the sigup
function doSignup(val)
{
	if (!val)
	{
		hideOrShow("signupField", true);
		hideOrShow("displaySignup", false);
		return;
	}

	// store the information passed
	var JSuid = document.getElementById("sign_uid").value;
	var JSmail = document.getElementById("sign_mail").value;
	var JSpwd = document.getElementById("sign_pwd").value;
	var JSpwdr = document.getElementById("sign_pwdr").value;

	// from this point we can call the signup php using ajax

	// form the params for the call
	var params = "uid="+JSuid+"&mail="+JSmail+"&pwd="+JSpwd+"&pwdrepeat="+JSpwdr+"&signupSubmit=true"

	// start ajax call
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'API/signup.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onload = function()
	{
		// get this response it will either be an error msg or 1
		var response = this.responseText;

		// this represents a success
		if (response == 1)
		{
			document.getElementById("genMsg").innerHTML = "Signup successful!";
			hideOrShow("signupField", false);
			hideOrShow("displaySignup", true);
			return;
		}

		// show error messages
		document.getElementById("signupResult").innerHTML = this.responseText;
	}

	xhr.send(params);
}

// toggle visablity of elements thanks professor
function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}