<?php

require_once "utils.php";

function handle_put_api(string $uri): void
{
    if (preg_match("/^\/recipes\/(\d+)$/", $uri, $matches))
    {
        echo(json_encode(["message" => "Good"]));
    }
    else
        send_not_found_response();
}