<?php

require_once "utils.php";

function handle_post_api(string $uri): void
{
    if ($uri == "/recipes")
    {
        echo(json_encode(["message" => "Good"]));
    }
    else
        send_not_found_response();
}