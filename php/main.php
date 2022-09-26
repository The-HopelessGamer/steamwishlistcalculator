<?php
    $_GET = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
    $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

    $urlType = filter_var($_GET["urlType"], FILTER_SANITIZE_STRING);
    $profileId = filter_var($_GET["profileId"], FILTER_SANITIZE_STRING);
    $switch = filter_var($_GET["switch"], FILTER_SANITIZE_STRING);

    include 'simple_html_dom.php';

    function mainFunction($pageNumber) {
        global $urlType, $profileId;
        $CC = filter_var($_GET["cc"], FILTER_SANITIZE_STRING);
        $url = "https://store.steampowered.com/wishlist/" . $urlType . "/" . $profileId . "/wishlistdata?p=" . $pageNumber . "&cc=" . $CC;
        $html = file_get_html($url);
        http_response_code(200);
        echo $html;
    }

    define("MAXCOUNT", 5);
    function rateLimiter($pageNumber) {
        if(!isset($_SESSION)){
            session_start();
            if (!isset($_SESSION['count'])) {
                $_SESSION['count'] = 0;
            }
            if (!isset($_SESSION['rateLimited'])) {
                $_SESSION['rateLimited'] = false;
            }
        }
        if (isset($_SESSION['LAST_CALL'])) {
            $last = strtotime($_SESSION['LAST_CALL']); //Get time of last submit.
            $curr = strtotime(date("Y-m-d h:i:s")); //Get current time.
            $sec =  abs($last - $curr); //Get Seconds since last submit.
            $now = time(); //Get current time.
            if (isset($_SESSION['countdown'])) { //Check if the countdown has started. i.e, are we rate limited?
                $timeSince = $now - $_SESSION['time_started']; //Time since count down started.
                $remainingSeconds = abs($_SESSION['countdown'] - $timeSince); //Seconds since countdown started.
            }
            header('Content-Type: application/json');
            if ($_SESSION['rateLimited'] == false) { //Are we rate limited?
                if ($sec <= 30) { //If the time since form submission is less then 10 seconds.
                    if ($_SESSION['count'] >= MAXCOUNT) { //Have we submitted this form 5 times within 10 seconds? If so, apply the rate limit.
                        $rateLimited = true;
                        $_SESSION['countdown'] = 60;
                        $_SESSION['time_started'] = time();
                        $data = array (
                            "error" => "true",
                            "msg" => "Rate Limit Exceeded"
                        );
                        $_SESSION['rateLimited'] = $rateLimited;
                        http_response_code(429);
                        echo(json_encode($data));
                    } else { //We have not reached the rate limit. Increment the count value once.
                        $_SESSION['count']++;
                        $data = array (
                            "error" => "false",
                            "msg" => "Rate Limit Not Exceeded"
                        );
                        mainFunction($pageNumber);
                    }
                } else if ($sec >= 30) { //If the time since last form submission is greater than 10 seconds, we will clear the submission count.
                    $_SESSION['count'] = 0;
                    $data = array (
                        "error" => "false",
                        "msg" => "Rate Limit Not Exceeded"
                    );
                    mainFunction($pageNumber);
                }
            } else if ($timeSince >= 60) { //If we are rate limited and the time since the rate limit was applied is greater than 60 seconds, remove the rate limit and reset the submission count.
                $_SESSION['rateLimited'] = false;
                $_SESSION['count'] = 0;
                $data = array (
                    "error" => "false",
                    "msg" => "Rate Limit Not Exceeded"
                );
                mainFunction($pageNumber);
            } else { //If we are rate limited but the time since has not passed 60 seconds, do not remove the rate limit.
                $_SESSION['rateLimited'] = true;
                $data = array (
                    "error" => "true",
                    "msg" => "Rate Limit Exceeded",
                    "Time Since Rate Limiting Was Applied" => $timeSince
                );
                http_response_code(429);
                echo(json_encode($data));
            }
        } else {
            mainFunction($pageNumber);
        }
        $_SESSION['LAST_CALL'] = date("Y-m-d h:i:s");
    }
    if ($switch == "true") {
        $pageNumber = filter_var($_GET["pageNumber"], FILTER_SANITIZE_STRING);
        $pageNumber = intval($pageNumber);
        if ($pageNumber === 0) {
            rateLimiter($pageNumber);
        } else {
            mainFunction($pageNumber);
        }
    } else if ($switch == "false") {
        $url = "https://store.steampowered.com/wishlist/" . $urlType . "/" . $profileId;
        $html = file_get_html($url);
        http_response_code(200);
        echo $html;
    }
?>
