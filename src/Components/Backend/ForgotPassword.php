<?php 
$mysqli = new mysqli("localhost","root","", "my_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$mysqli->connect_error;
echo $err_message;
exit();
} 
$_POST = json_decode(file_get_contents("php://input"), true);

$email = array($_POST["email"]);
$password = $_POST['newPass'];
$search = $mysqli -> execute_query('SELECT email FROM users WHERE email = ?', $email);
if ($search == Null) {
    die("That Email is not registered!");
};
?>