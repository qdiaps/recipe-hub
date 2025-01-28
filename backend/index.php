<?php

header("Content-type: application/json");

require_once "src/models/Database.php";

use DB\Database;

$db = new Database("mysql.ini");