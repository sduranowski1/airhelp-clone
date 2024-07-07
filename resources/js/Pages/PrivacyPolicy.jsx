import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";

const Privacy = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">Polityka Prywatności</h1>
            <div className="container mx-auto">
                <ul className="list-none space-y-4">
                    <li className="shadow rounded p-4 hover:bg-gray-100">
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="text-gray-700">Suspendisse venenatis venenatis risus, at scelerisque sem euismod ut. Nam a lorem ligula. Cras vel leo sit amet eros tempor pretium. Aliquam blandit mauris nec metus pellentesque, vel tincidunt urna scelerisque. Sed ac diam nec sapien condimentum bibendum. Nulla facilisi. Nulla facilisi. Ut ullamcorper metus vel mauris fermentum, sed auctor odio tincidunt. Phasellus aliquam sem nec sem vulputate, in aliquet felis dignissim. Integer ac massa vitae odio pharetra tincidunt. Nam ut nisl ac arcu volutpat malesuada. Proin vitae libero lorem.</p>
                        <p className="text-gray-700">Curabitur interdum, nisi sit amet auctor lacinia, metus odio fringilla ex, at euismod urna mi a purus. Maecenas ultrices fermentum orci vel dapibus. Integer blandit tellus sed nisi dapibus tristique. Suspendisse volutpat lacus vitae nunc finibus, at auctor felis aliquet. Proin luctus risus et tortor vestibulum, ac rhoncus ipsum cursus. In sed nunc a justo eleifend dictum vel sed neque. Mauris quis ligula nec elit ultricies varius. Aliquam condimentum felis at magna ultricies varius.</p>
                        <p className="text-gray-700">Fusce sit amet nisi id leo iaculis fringilla. Nullam hendrerit vehicula nunc, et cursus ex ultrices nec. Curabitur vel ante ac sapien ultricies rhoncus. Nullam ut erat at felis venenatis efficitur. Quisque a sagittis felis. Donec ultricies sollicitudin sem, at sodales metus feugiat a. Nam aliquam enim at leo efficitur gravida. Nulla nec arcu eu lectus finibus dictum.</p>
                        <p className="text-gray-700">Sed ut dolor posuere, blandit eros a, vehicula leo. Nulla tincidunt pretium metus sit amet fringilla. Nulla facilisi. Vivamus quis dui varius, pellentesque sapien sit amet, volutpat elit. Suspendisse congue odio odio, eget fermentum nisi congue non. Mauris ullamcorper nulla ac leo fermentum, id accumsan tortor dictum. Phasellus fringilla, enim in iaculis aliquam, nulla ante posuere lorem, non condimentum neque lacus sit amet odio. Integer interdum urna nec libero tristique, id ullamcorper nisi facilisis. Suspendisse potenti.</p>
                        <p className="text-gray-700">Vestibulum eget facilisis lorem, nec scelerisque ex. Vestibulum vel nunc erat. Sed sodales, nulla at bibendum dictum, enim dolor malesuada velit, nec volutpat sapien velit a ligula. Ut consequat ex non libero hendrerit faucibus. Vestibulum luctus lorem sit amet erat cursus, id tincidunt nunc venenatis. Sed tempor nisl a libero tempus, eget fringilla enim laoreet. Vivamus ut suscipit nulla. Donec iaculis tortor at est hendrerit luctus.</p>
                        <p className="text-gray-700">Nullam posuere leo at diam tincidunt, sed tristique nulla tincidunt. Integer ornare felis eros, quis varius turpis feugiat at. Integer aliquet volutpat nulla, a molestie sapien sodales a. Morbi euismod consequat libero vel vestibulum. Mauris elementum accumsan tortor, at venenatis nisl congue non. Nulla facilisi. Nulla tristique, est sed consectetur facilisis, mi velit sodales nulla, non sodales neque mauris in magna. Nulla luctus felis vel mauris posuere, id bibendum orci varius.</p>
                        <p className="text-gray-700">Donec at risus a eros lobortis suscipit et non risus. Sed at mauris id lectus scelerisque venenatis sit amet a elit. Aenean posuere arcu eu magna ultrices, sed accumsan eros iaculis. Nullam fringilla odio erat, non pharetra enim congue eget. Duis eget tellus libero. Vestibulum ultricies velit vel convallis suscipit. Aliquam vel metus tincidunt, aliquet libero a, efficitur mauris. Donec et dolor pharetra, iaculis nisl id, finibus neque.</p>
                        <p className="text-gray-700">Etiam eget mauris non leo lacinia cursus nec non turpis. Curabitur in massa sed risus consequat malesuada. Proin mollis volutpat risus, at dignissim orci. Maecenas non tincidunt lorem. Nullam in turpis dolor. Sed faucibus orci eu orci cursus, sit amet pellentesque mi efficitur. Nam tincidunt, ligula eu aliquet sagittis, est augue vehicula mi, sit amet cursus risus arcu non risus. Donec vulputate leo et quam dignissim tincidunt. Aenean sit amet vehicula justo, et venenatis nunc.</p>
                        <p className="text-gray-700">Phasellus et felis nec leo efficitur tincidunt. Aenean volutpat vehicula magna, vel ullamcorper purus congue vel. Nulla interdum libero vel enim posuere, a dictum risus lobortis. Nulla facilisi. Phasellus non lectus sed odio pellentesque eleifend nec a nisi. Vivamus aliquam erat nulla, nec tempor turpis elementum non. Nam id urna felis. Suspendisse potenti. Curabitur id magna vel ligula aliquam sagittis vel id nunc. Donec condimentum nulla nec est pellentesque fermentum. Aliquam blandit congue erat, et tincidunt erat viverra ac. Phasellus sit amet lacinia velit. Ut non lorem erat.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default function PrivacyPolicy({ auth }) {

    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Blog" />
                    <Privacy />
                    <Footer />
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    <Head title="Blog" />
                    <Privacy />
                    <Footer />
                </Standard>
            )}
        </>
    );
}
