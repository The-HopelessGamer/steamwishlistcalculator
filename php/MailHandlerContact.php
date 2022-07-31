<?php
    // Original code from: http://blog.teamtreehouse.com/create-ajax-contact-form

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //echo "This contact form has been disabled. Sorry for any inconvenience.";
        //return false; //Disabled the contact form indefinitely due to an increase in spam.

        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]), FILTER_SANITIZE_STRING);
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);


        $flag = false;
        $nameErrorCode = 5;
        if (empty($name) || strlen($name) > 50) {
            $nameErrorCode = 1;
            $flag = true;
        }
        $emailErrorCode = 6;
        if (empty($email) || strlen($email) > 254) {
            $emailErrorCode = 2;
            $flag = true;
        }
        $messageErrorCode = 7;
        if (empty($message) || strlen($message) > 2000) {
            $messageErrorCode = 3;
            $flag = true;
        }
        $checkboxErrorCode = 8;
        if (filter_var($_POST["checkbox"] !== "on", FILTER_SANITIZE_STRING)) {
            $checkboxErrorCode = 4;
            $flag = true;
        }

        $honeypot_fields = [
            $messageBox = filter_var(trim($_POST["messageBox"]), FILTER_SANITIZE_STRING),
            $emailBox = filter_var(trim($_POST["emailBox"]), FILTER_SANITIZE_STRING),
            $nameBox = filter_var(trim($_POST["nameBox"]), FILTER_SANITIZE_STRING)
        ];

        $honeyPotErrorCode = 10;
        foreach ($honeypot_fields as $fields) {
            if (!empty($_POST[$fields])) {
                $honeyPotErrorCode = 9;
                $flag = true;
            }
        }

        $flags = [
            $nameErrorCode,
            $emailErrorCode,
            $messageErrorCode,
            $checkboxErrorCode,
            $honeyPotErrorCode
        ];

        if ($flag == true) {
            http_response_code(400);
            echo json_encode($flags);
            return false;
        }

        // Set the recipient email address.
        $recipient = "contact@steamwishlistcalculator.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "From: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Message: $message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank you $name! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>
