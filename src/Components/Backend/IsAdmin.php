<?php 
if (@$permission !== 'granted'){
    die('bad call');
}
die("you have admin permissions, this can be set in database, you can only see this message if you are an admin")
?>