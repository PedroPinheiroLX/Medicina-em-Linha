$(document).ready(function () {
    (function ($) {
        "use strict";

        $(function () {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 3
                    },
                    subject: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: "Por favor, introduza o seu nome.",
                        minlength: "O nome deve ter pelo menos 3 caracteres."
                    },
                    subject: {
                        required: "Por favor, selecione o motivo da consulta."
                    },
                    email: {
                        required: "Por favor, introduza o seu email.",
                        email: "Introduza um email válido (ex: nome@exemplo.com)."
                    },
                    message: {
                        required: "Por favor, escreva uma mensagem.",
                        minlength: "A mensagem deve ter pelo menos 10 caracteres."
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "contact_process.php",
                        success: function () {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo("slow", 1, function () {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#success').fadeIn();
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            });
                        },
                        error: function () {
                            $('#contactForm').fadeTo("slow", 1, function () {
                                $('#error').fadeIn();
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            });
                        }
                    });
                }
            });
        });

    })(jQuery);
});
