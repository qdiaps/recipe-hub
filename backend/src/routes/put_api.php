<?php

require_once "utils.php";

use controllers\RecipeController;

function handle_put_api(string $uri, RecipeController $controller): void
{
    if (preg_match("/^\/recipes\/(\d+)$/", $uri, $matches))
    {
        $json = file_get_contents("php://input");
        $controller->updateRecipe($matches[1], json_decode($json, true));
    }
    else
        send_not_found_response();
}