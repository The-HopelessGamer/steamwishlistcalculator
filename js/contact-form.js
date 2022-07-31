function nameValidation() {
    let nameField = document.getElementById("name");

    let value = nameField.value;

    if (!value) {
        nameField.dataset.state = '';
        nameField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        return;
    }

    let trimmed = value.trim();

    if (trimmed && nameField.checkValidity()) {
        nameField.dataset.state = 'valid';
        nameField.style.background = "#EFEFEF url('/media/valid.png') no-repeat 98% center";
        document.getElementById("nameError").style.display = "none";
        document.getElementById("name").style.borderColor = "#c3c3c3";
    } else {
        nameField.dataset.state = 'invalid';
        nameField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
    }
}

function emailValidation() {
    let emailField = document.getElementById("email");

    let value = emailField.value;

    if (!value) {
        emailField.dataset.state = '';
        emailField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        return;
    }

    let trimmed = value.trim();

    if (trimmed && emailField.checkValidity()) {
        emailField.dataset.state = 'valid';
        emailField.style.background = "#EFEFEF url('/media/valid.png') no-repeat 98% center";
        document.getElementById("emailError").style.display = "none";
        document.getElementById("email").style.borderColor = "#c3c3c3";
    } else {
        emailField.dataset.state = 'invalid';
        emailField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
    }
}

function messageValidation() {
    let messageField = document.getElementById("message");

    let value = messageField.value;

    if (!value) {
        messageField.dataset.state = '';
        messageField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        return;
    }

    let trimmed = value.trim();

    if (trimmed && messageField.checkValidity()) {
        messageField.dataset.state = 'valid';
        messageField.style.background = "#EFEFEF url('/media/valid.png') no-repeat 98% center";
        document.getElementById("messageError").style.display = "none";
        document.getElementById("message").style.borderColor = "#c3c3c3";
    } else {
        messageField.dataset.state = 'invalid';
        messageField.style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
    }
}

function checkboxValidation() {
    let checkboxField = document.getElementById("checkbox");
    let checkboxValidationSymbol = document.getElementById("checkboxValidationSymbol");
    if (checkboxField.checked) {
        checkboxValidationSymbol.style.content = "url('/media/valid.png')";
        document.getElementById("checkboxError").style.display = "none";
        document.getElementById("checkbox").style.outline = "none";
    } else {
        checkboxValidationSymbol.style.content = "url('/media/invalid.png')";
    }
}

$(function() {

    let submitFunction = document.getElementById('submit');
    if (submitFunction) {
        submitFunction.addEventListener('focusin', (event) => {
          document.getElementById("ajax-contact").action = "php/MailHandlerContact.php";
        });

        submitFunction.addEventListener('focusout', (event) => {
          document.getElementById("ajax-contact").action = "Going no where until a real user clicks submit.";
        });
    }


    $(document).on("keypress", '#ajax-contact', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    });

    let form = $('#ajax-contact');
    $(form).submit(function(e) {
        e.preventDefault();

        let formData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            success();
            document.getElementById("successMsg").innerHTML = response;
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorText").style.display = "none";
            document.getElementById("successMsg").style.display = "block";
            document.getElementById("container-results").style.display = "none";
            document.getElementById("container-results").style.setProperty("display", "none", "important");
            document.getElementById("wishlist-container").style.paddingBottom = "1.5em";
            document.getElementById("wishlist-container").style.paddingTop = "1.5em";
            document.getElementById("nameError").style.display = "none";
            document.getElementById("name").style.borderColor = "#c3c3c3";
            document.getElementById("emailError").style.display = "none";
            document.getElementById("email").style.borderColor = "#c3c3c3";
            document.getElementById("messageError").style.display = "none";
            document.getElementById("message").style.borderColor = "#c3c3c3";
            document.getElementById("checkboxError").style.display = "none";
            document.getElementById("checkbox").style.outline = "none";
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        }).fail(function(data) {
            if (data.status === 400) {
                let errorCode = JSON.parse(data.responseText);
                for (let i = 0; i < errorCode.length; i++) {
                    switch (errorCode[i]) {
                        case 1:
                            document.getElementById("nameError").style.display = "inline-block";
                            document.getElementById("name").style.borderColor = "red";
                            break;
                        case 5:
                            document.getElementById("nameError").style.display = "none";
                            document.getElementById("name").style.borderColor = "#c3c3c3";
                            break;
                        case 2:
                            document.getElementById("emailError").style.display = "inline-block";
                            document.getElementById("email").style.borderColor = "red";
                            break;
                        case 6:
                            document.getElementById("emailError").style.display = "none";
                            document.getElementById("email").style.borderColor = "#c3c3c3";
                            break;
                        case 3:
                            document.getElementById("messageError").style.display = "inline-block";
                            document.getElementById("message").style.borderColor = "red";
                            break;
                        case 7:
                            document.getElementById("messageError").style.display = "none";
                            document.getElementById("message").style.borderColor = "#c3c3c3";
                            break;
                        case 4:
                            document.getElementById("checkboxError").style.display = "inline-block";
                            document.getElementById("checkbox").style.outline = "2px solid red";
                            break;
                        case 8:
                            document.getElementById("checkboxError").style.display = "none";
                            document.getElementById("checkbox").style.outline = "none";
                            break;
                        case 9:
                            throwError();
                            document.getElementById("resetButtonContact").style.display = "block";
                            document.getElementById("errorBox").style.display = "block";
                            document.getElementById("errorText").style.display = "block";
                            document.getElementById("successMsg").style.display = "none";
                            document.getElementById("errorText").innerHTML = ('Oops! An error occured and your message could not be sent.');
                            document.getElementById("resetButtonError").style.display = "none";
                            break;
                    }

                }

            } else {
                throwError();
                document.getElementById("resetButtonContact").style.display = "block";
                document.getElementById("errorBox").style.display = "block";
                document.getElementById("errorText").style.display = "block";
                document.getElementById("successMsg").style.display = "none";
                document.getElementById("errorText").innerHTML = (data.responseText);
                document.getElementById("resetButtonError").style.display = "none";
            }

        });

    });

});
