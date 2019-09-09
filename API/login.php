<?php
	// make sure the user gets here from navigation
	if (isset($_POST['loginSubmit']))
	{
		require 'dbh.php';

		$uid = $_POST['uid'];
		$pwd = $_POST['pwd'];

		// These are the error handlers
		// Check for empty fields
		if (empty($uid) || empty($pwd))
		{
			echo("Empty Fields");
			exit();
		}
		else
		{
			$sql = "SELECT * FROM users WHERE username=?";
			$stmt = mysqli_stmt_init($conn);

			if (!mysqli_stmt_prepare($stmt, $sql))
			{
				echo("login sql error 1");
				exit();
			}
			else
			{
				mysqli_stmt_bind_param($stmt, "s", $uid);
				mysqli_stmt_execute($stmt);

				$result = mysqli_stmt_get_result($stmt);

				if ($row = mysqli_fetch_assoc($result))
				{
					$pwdCheck = password_verify($pwd, $row['pwd']);
					if ($pwdCheck == false)
					{
						echo("invalid password");
						exit();
					}
					else
					{
						session_start();
						$_SESSION['id'] = $row['id'];
						$_SESSION['username'] = $row['username'];

						echo(1);
						exit();
					}
				}
				else
				{
					echo("login sql error 2, no user");
					exit();
				}
			}
		}
	}
	// They did not get to this page via the navigation
	else
	{
		echo("skipped logic, login");
		exit();
	}
?>