<?php
require __DIR__ . '\vendor\autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$mysqli = new mysqli("localhost","root","", "my_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$conn->connect_error;
echo $err_message;
exit();
} 
$_POST = json_decode(file_get_contents("php://input"), true);
//Handle if input is empty or can not be recieved, may be taken out soon with changes to front end code
if ($_POST == null){
    echo "Unable to retrieve credentials";
    exit();
} else {
    @$password = $_POST['password'];
    @$username = $_POST['username'];
};

$search = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$stored = $result->fetch_assoc();
//Check for passwords associated with username
if (!@$stored["pass"]){
    echo "The Username is not registered";
    exit();
}
if (!password_verify($password, $stored['pass'])){
    echo "The Password is Wrong";
    exit();
}
//Todo, Create a session where the user is logged in
// Token creation for cookie based sessions

$key = "key";
//a real project would not contain a token key like this
$payload = [
    'username' => $stored['username'],
    'pass' => substr($stored['pass'], -5),
//the reason for adding part of the password hash is to make sure the session token always changes up on password changes
    'id' => $stored['id']
];
$token = JWT::encode($payload, $key, 'HS256');


echo $token;
exit();

?>