<?php
$servername = "localhost";
$username = "root";
$password = "";
$result = "";

// Create connection
$connect = new mysqli($servername, $username, $password);

// Check connection
if ($conn -> connect_errno) {
  return "Connection failed: " . $conn->connect_error;

} else {
  return "Connected";
}
?>