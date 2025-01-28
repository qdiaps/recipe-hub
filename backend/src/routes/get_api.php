<?php

require_once "utils.php";

use controllers\RecipeController;

function handle_get_api(string $uri, RecipeController $controller): void
{
    if ($uri == "/recipes")
        echo(json_encode($controller->getAllRecipes()));
    else
        send_not_found_response();
}