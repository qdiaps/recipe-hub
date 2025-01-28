<?php

header("Content-type: application/json");

require_once "src/models/Database.php";

use DB\Database;

$db_config_path = "mysql.ini";
$db = new Database($db_config_path);
if (!$settings = parse_ini_file($db_config_path, true))
    throw new Exception("Unable to open database configuration file: " . $db_config_path);
if (!$db->tableExists($settings["database"]["table"]))
{
    $db->createTable($settings["database"]["table"],
        ["id INT AUTO_INCREMENT PRIMARY KEY",
            "title VARCHAR(255) NOT NULL",
            "ingredients TEXT NOT NULL",
            "instructions TEXT NOT NULL",
            "cook_time INT DEFAULT NULL",
            "category VARCHAR(255) DEFAULT NULL"]);
}
