<!-- resources/views/emails/reset-password.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        /* Add any styles you want here */
    </style>
</head>
<body>
<h1>{{ $subject }}</h1>
<p>This is a custom message informing you about the password reset request.</p>
<p><a href="{{ $url }}">Reset Your Password</a></p>
<p>This link will expire in {{ $expireTime }} minutes.</p>
<p>If you did not request a password reset, please ignore this email.</p>
</body>
</html>
