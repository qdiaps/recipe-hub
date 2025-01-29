<?php

require_once "utils.php";

use controllers\RecipeController;

function handle_post_api(string $uri, RecipeController $controller): void
{
    if ($uri == "/recipes" && $_SERVER["CONTENT_TYPE"] == "application/json")
    {
        $json = file_get_contents("php://input");
        $controller->addRecipe(json_decode($json, true));
    }
    else
        send_not_found_response();
}