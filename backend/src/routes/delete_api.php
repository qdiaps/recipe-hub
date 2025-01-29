<?php

require_once "utils.php";

use controllers\RecipeController;

function handle_delete_api(string $uri, RecipeController $controller): void
{
    if (preg_match("/^\/recipes\/(\d+)$/", $uri, $matches))
        $controller->deleteRecipe($matches[1]);
    else
        send_not_found_response();
}