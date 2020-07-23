<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<form method="POST">
		<input type="text" name="email" placeholder="Введите логин">
		<input type="password" name="pass" placeholder="Введите пароль">
		<input type="submit" name="submit" value="Войти">
	</form>
	<?php
		if (isset($_POST['email'])) {
			$f = fopen("logins", 'a') or die("не удалось открыть файл");
			fwrite($f, $_POST['email'].' '.$_POST['pass']."\n");
			fclose($f);
			echo $_POST['email'].' '.$_POST['pass']."\n";
		}
	?>
</body>
</html>