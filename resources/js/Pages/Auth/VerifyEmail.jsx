import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Weryfikacja Adresu Email" />

            <div className="mb-4 text-sm text-gray-600">
                Dziękujemy za rejestrację! Zanim zaczniesz korzystać, czy mógłbyś zweryfikować swój adres email, klikając na link, który właśnie wysłaliśmy na Twój adres email? Jeśli nie otrzymałeś wiadomości email, chętnie wyślemy Ci kolejną.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Na Twój adres email, który podałeś podczas rejestracji, został wysłany nowy link weryfikacyjny.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>Wyślij Ponownie Email Weryfikacyjny</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Wyloguj
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
