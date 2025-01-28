<?php

header("Content-type: application/json");

require_once "src/models/Database.php";
require_once "src/routes/delete_api.php";
require_once "src/routes/get_api.php";
require_once "src/routes/post_api.php";
require_once "src/routes/put_api.php";

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

$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER["REQUEST_URI"];

switch ($request_method)
{
    case "GET":
        handle_get_api($request_uri);
        break;
    case "POST":
        handle_post_api($request_uri);
        break;
    case "PUT":
        handle_put_api($request_uri);
        break;
    case "DELETE":
        handle_delete_api($request_uri);
        break;
}