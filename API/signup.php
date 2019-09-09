<?php

	if (isset($_POST['signupSubmit']))
	{
		require 'dbh.php';

		$Username = $_POST['uid'];
		$Email = $_POST['mail'];
		$Password = $_POST['pwd'];
		$Password_r = $_POST['pwdrepeat'];

		// These are the error handlers
		// Check for empty fields
		if (empty($Username) || empty($Email) || empty($Password) || empty($Password_r))
		{
			echo("Empty Fields");
			// header("Location: ../signup.php?error=emptyfields&uid=".$Username."&mail=".$Email);
			exit();
		}
		// Check for valid email and username
		else if (!filter_var($Email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $Username))
		{
			echo("invalid email and user");
			// header("Location: ../signup.php?error=invalidmailuid");
			exit();
		}
		// Check for valid email address
		else if (!filter_var($Email, FILTER_VALIDATE_EMAIL))
		{
			echo("invalid email");
			// header("Location: ../signup.php?error=invalidmail&uid=".$Username);
			exit();
		}
		// Check for valid username
		else if (!preg_match("/^[a-zA-Z0-9]*$/", $Username))
		{
			echo("invalid user");
			// header("Location: ../signup.php?error=invaliduid&mail=".$Email);
			exit();
		}
		// Check if the two passwords match
		else if ($Password !== $Password_r)
		{
			echo("pwd no match");
			// header("Location: ../signup.php?error=passwordcheck&uid=".$Username."&mail=".$Email);
			exit();
		}
		// Check if the Username already exists
		else
		{
			$sql = "SELECT username FROM users WHERE username=?";
			$stmt = mysqli_stmt_init($conn);

			if (!mysqli_stmt_prepare($stmt, $sql))
			{
				echo("sql fail 1");
				// header("Location: ../signup.php?error=sqlerror&uid=".$Username."&mail=".$Email);
				exit();
			}
			else
			{
				mysqli_stmt_bind_param($stmt, "s", $Username);
				mysqli_stmt_execute($stmt);
				mysqli_stmt_store_result($stmt);

				$resultCheck = mysqli_stmt_num_rows($stmt);
				error_log($resultCheck);

				// username Matches to existing
				if ($resultCheck > 0)
				{
					echo("Double username");
					// header("Location: ../signup.php?error=usertaken&mail=".$Email);
					exit();
				}
			}
		}

		// From this point we run the code to add the user to the database

		$sql = "INSERT INTO users (username, email, pwd) VALUES (?, ?, ?)";
		$stmt = mysqli_stmt_init($conn);

		if (!mysqli_stmt_prepare($stmt, $sql))
		{
			echo("sql fail 2");
			// header("Location: ../signup.php?error=sqlerror&uid=".$Username."&mail=".$Email);
			exit();
		}
		else
		{
			$HashPassword = password_hash($Password, PASSWORD_DEFAULT);

			mysqli_stmt_bind_param($stmt, "sss", $Username, $Email, $HashPassword);
			mysqli_stmt_execute($stmt);

			echo(1);
			// header("Location: ../signup.php?signup=success");
			exit();
		}

		// At this point we are done with our statements and connection so we close them.
		mysqli_stmt_close($stmt);
		mysqli_close($conn);
	}
	// This means the user did not go to the signup page
	else
	{
		echo("skipped logic");
		exit();
	}