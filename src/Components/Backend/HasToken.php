<?php 
if (@$permission !== 'granted'){
    die('bad call');
}
die("You are logged in and this is a text that only displays if you are logged in")
?>