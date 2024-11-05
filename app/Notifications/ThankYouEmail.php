<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ThankYouEmail extends Mailable // Remove Mailable here
{
    use Queueable;

    public $formData;

    public function __construct($formData)
    {
        $this->formData = $formData;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function build()
    {
        return $this
            ->from('szymon@grupalucrum.pl', 'BeSmartAir') // Change these values
            ->to($this->formData['input6b']) // Accessing as an array
            ->subject('Dziękujemy za przesłanie formularza')
            ->view('emails.thank_you')
            ->with([
                'formData' => $this->formData,
                'subject' => 'Dziękujemy za przesłanie formularza',
                'message' => 'This is a custom message informing you about the password reset request.',
            ]);
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
