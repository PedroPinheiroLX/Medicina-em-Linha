<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Obter e limpar os valores do formulário
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $name    = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email   = isset($_POST['email']) ? trim($_POST['email']) : '';

    // Inicializar array para mensagens de erro
    $errors = [];

    // Validar email (tem de conter '@')
    if (empty($email) || strpos($email, '@') === false) {
        $errors[] = "Por favor, introduza um endereço de email válido.";
    }

    // Validar nome (mais de 2 caracteres)
    if (empty($name) || strlen($name) <= 2) {
        $errors[] = "Por favor, introduza o seu nome completo (mínimo 3 caracteres).";
    }

    // Validar mensagem (mais de 10 caracteres)
    if (empty($message) || strlen($message) <= 10) {
        $errors[] = "Por favor, escreva uma mensagem com pelo menos 10 caracteres.";
    }

    // Validar se o assunto foi selecionado
    if (empty($subject)) {
        $errors[] = "Por favor, selecione o motivo da consulta.";
    }

    // Se houver erros, mostrá-los e terminar
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
        exit;
    }

    // Preparar parâmetros do email
    $para = $email;
    $assunto_email = "Nova mensagem através do site - " . $subject;
    $corpo_email = "Recebeu uma nova mensagem através do formulário de contacto do site.\n\n".
                   "Detalhes:\n".
                   "Nome: $name\n".
                   "Email: $email\n".
                   "Mensagem:\n$message\n";

    // Cabeçalhos do email
    $headers = "From: medicinaemlinha@outlook.pt\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Tentar enviar o email
    if (mail($para, $assunto_email, $corpo_email, $headers)) {
        echo "<p>Obrigado pelo seu contacto. A sua mensagem foi enviada com sucesso.</p>";
    } else {
        echo "<p>Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente mais tarde.</p>";
    }
}
?>
