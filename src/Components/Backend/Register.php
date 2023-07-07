<?php
require __DIR__ . '\vendor\autoload.php';

$mysqli = new mysqli("localhost","root","", "my_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$mysqli->connect_error;
echo $err_message;
exit();
} 
$_POST = json_decode(file_get_contents("php://input"), true);
@$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
@$username = $_POST['username'];
@$email = $_POST['email'];

if ($email == "" || $email == null ){
    die("One or multiple fields are empty");
}

$users = $mysqli -> query('SELECT MAX(id) FROM users'); 

$checkIfExists = $mysqli->prepare("SELECT * FROM users WHERE username = BINARY ? OR email = BINARY ?");
$checkIfExists->bind_param("ss", $username, $email);
$checkIfExists->execute();
$checkResult = $checkIfExists->get_result();
$checkStored = $checkResult->fetch_assoc();

if (!empty($checkStored)){
    die("The Username or Email is  already registered");
}

$highIdObj = $mysqli -> query('SELECT MAX(id) FROM users');
$highIdArr = $highIdObj -> fetch_assoc();
$newId = $highIdArr['MAX(id)'] + 1;

$insertQ = ("INSERT INTO users (id, username, email, pass, permission) VALUES(?,?,?,?,?)");
$params = array($newId, $username, $email, $password, 'member');

$import = $mysqli -> execute_query($insertQ, $params);
echo 'new user registered';
// $import = $mysqli->prepare("INSERT INTO users (id, username, email, pass, permission) VALUES(?,?,?,?,member)");
// $search->bind_param("ssss", $newId, $username, $email, $password);
// $search->execute();
// $result = $search->get_result();
// $stored = $result->fetch_assoc();
?>