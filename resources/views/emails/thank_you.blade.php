<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dziękujemy za przesłanie formularza</title>
    <style>
        /* Podstawowe style dla e-maila */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        p {
            line-height: 1.5;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            margin: 20px 0;
            color: #fff;
            background-color: #4f914a;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #aaa;
            font-size: 12px;
        }
        img.logo {
            width: 150px; /* Dostosuj rozmiar logo */
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <img src="http://138.68.158.146/media/logo/besmartaircropped-trans.png" alt="Logo" class="logo">
    <h1>Dziękujemy za przesłanie formularza!</h1>
    <p>Hej {{ $formData['input6'] }},</p>
    <p>Dziękujemy za wypełnienie formularza. Twoje dane zostały pomyślnie zapisane.</p>
    <p>W razie jakichkolwiek pytań, prosimy o kontakt.</p>
    <p>Pozdrawiamy,</p>
    <p>BeSmartAir</p>
    <div class="footer">
        <p>&copy; {{ date('Y') }} BeSmartAir. Wszelkie prawa zastrzeżone.</p>
    </div>
</div>
</body>
</html>
