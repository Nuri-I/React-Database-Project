<?php 
require __DIR__ . '\vendor\autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$mysqli = new mysqli("localhost","root","", "my_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$mysqli->connect_error;
die($err_message);
} 
$_POST = json_decode(file_get_contents("php://input"), true);

@$usertoken =  getallheaders()['Authorization'];
@$tokenOBJ = JWT::decode($usertoken, new Key('key', 'HS256'));
//A real program will never have a key this weak
@$token = (array)$tokenOBJ;
@$username = $token['username'];

$search = $mysqli->prepare("SELECT id, pass, permission FROM users WHERE username = BINARY ? ");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$stored = $result->fetch_assoc();

if (@$stored['pass'] == null || substr(@$stored['pass'], -6) !== @$token['pass'] || @$stored['id'] !== @$token['id']){
    die("Invalid Token");
};

$accessableFiles = array('HasToken.php');
//this variable would include all non-restricted files in a bigger project
$adminFiles = array('IsAdmin.php');
// this variable would include all admin access only files in a bigger project
@$directTo =  getallheaders()['ConnectTo'];
if (in_array($directTo, $accessableFiles)){
    $permission = 'granted';
// in a real program $permission variable would be treated like a key  
//to reduce to chance of mailicous parties to guess or brute force the variable and access the backend without proper authorazition
    include($directTo);
};
if (in_array($directTo, $adminFiles) && $stored['permission'] == "admin"){
    $permission = 'granted';
    include($directTo);
} else {
    die("Not an admin");
};
die("Can not access files that should be accessed")
?>