<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CustomResetPasswordNotification extends Notification
{
    use Queueable, SerializesModels;

    public $token;
    public static $createUrlCallback;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = $this->resetUrl($notifiable);

        // Retrieve the user's email and name
        $email = $notifiable->getEmailForPasswordReset();
        $name = $notifiable->name; // Assuming you have a 'name' field in your User model

        return (new Mailable)
            ->from('szymon@grupalucrum.pl', 'BeSmartAir') // Change these values
            ->to($email) // Specify the recipient's email and name
            ->subject('Reset Hasła')
            ->view('emails.reset-password')
            ->with([
                'url' => $url,
                'subject' => 'Reset Hasła',
                'message' => 'This is a custom message informing you about the password reset request.',
                'expireTime' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'),
            ]);
    }

    protected function resetUrl($notifiable)
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        }

        return url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));
    }

    public static function createUrlUsing($callback)
    {
        static::$createUrlCallback = $callback;
    }
}

