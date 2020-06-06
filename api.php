<?php
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    if($requestMethod == "GET"){
        $key = $_GET["key"];
        $data = json_decode(file_get_contents('data.json'));
        echo($data->$key);
    }else if($requestMethod == "POST"){
        $key = $_GET["key"];
        $data = json_decode(file_get_contents('data.json'));
        dbgLog($data);
        $data->$key = file_get_contents('php://input');
        file_put_contents('data.json', json_encode($data));
        http_response_code(200);
    }
    else{
        http_response_code(400);
    }

    function dbgLog($msg){
        file_put_contents('php://stderr', print_r($msg, TRUE));
    }
?>