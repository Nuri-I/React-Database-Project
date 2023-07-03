<?php

$mysqli = new mysqli("localhost","root","", "my_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$conn->connect_error;
echo $err_message;
exit();
} 
$_POST = json_decode(file_get_contents("php://input"), true);
//Handle if input is empty or can not be recieved, may be taken out soon soon
if ($_POST == null){
    echo "Unable to retrieve credentials";
    exit();
} else {
    @$password = $_POST['password'];
    @$username = $_POST['username'];
};

$search = $mysqli->prepare("SELECT pass FROM users WHERE username = ?");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$storedHash = $result->fetch_assoc();
//Check for passwords associated with username
if (!@$storedHash["pass"]){
    echo "Username is not registered";
    exit();
}
if (!password_verify($password, $storedHash['pass'])){
    echo "The Password is Wrong";
    exit();
}
//Todo, Create a session where the user is logged in
echo $storedHash["pass"];
exit();

?>