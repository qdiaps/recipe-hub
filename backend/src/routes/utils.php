<?php
function send_not_found_response(): void
{
    http_response_code(404);
    echo(json_encode(["message" => "Endpoint not found"]));
}