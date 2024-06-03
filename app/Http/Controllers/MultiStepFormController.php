<?php

namespace App\Http\Controllers;

use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MultiStepFormController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('MultiStepForm', [
            'input1' => $request->query('input1'),
            'input1a' => $request->query('input1a'),
        ]);
    }

//    public function showStep3(Request $request)
//    {
//        return Inertia::render('Step3', [
//            'input1' => $request->query('input1'),
//            'input1a' => $request->query('input1a'),
//        ]);
//    }

    public function submit(Request $request)
    {
        // Validate form data
        $validatedData = $request->validate([
            'input1' => 'max:255',
            'input1a' => 'max:255',
            'input1b' => 'required|max:255',
            'input1c' => 'required|max:255',
//            'input2' => 'required|string|max:255',
            'input3' => 'max:255',
            'input3a' => 'max:255',
            'input4' => 'required|string|max:255',
            'input4a' => 'required|string|max:255',
            'input4b' => 'required|string|max:255',
            'input5' => 'required|max:255',
            'input5a' => 'required|max:255',
            'input5b' => 'required|max:255',
            'input5c' => 'required|max:255',
            'input5d' => 'required|max:255',
            'input5e' => 'required|max:255',
            'input5f' => 'required|max:255',
            'input5g' => 'required|max:255',
            'input5h' => 'required|max:255',
            'input5i' => 'required|max:255',
            'input5j' => 'required|max:255',
            'input6' => 'required|string|max:255',
            'input6a' => 'required|string|max:255',
            'input6b' => 'required|string|max:255',
            'input6c' => 'required|max:255',
            'input6d' => 'required|max:255',
            'input6e' => 'required|max:255',
            'input7a' => 'required|max:255',
            'input7b' => 'required|max:255',
            'input7c' => 'max:255',

            'input6b' => 'required|string|max:255',
            'input8' => 'required|string|max:255',
            'input8a' => 'required|string|max:255',
            'input8b' => 'required|string|max:255',
            'input8c' => 'required|string|max:255',
            'input8d' => 'required|string|max:255',
            'input8e' => 'required|string|max:255',
            'input8f' => 'required|string|max:255',
            'input9' => 'required|string|max:255',
            'input10' => 'max:255',
            'signature' => 'required|string', // Add validation for signature
        ]);

        // Decode the base64 signature image
        $signatureData = $validatedData['signature'];
        list($type, $data) = explode(';', $signatureData);
        list(, $data) = explode(',', $data);
        $data = base64_decode($data);

        // Define the signature path
        $signaturePath = 'media/signatures/' . uniqid() . '.png';
        $fullSignaturePath = public_path($signaturePath);

        // Ensure the directory exists
        if (!File::exists(public_path('media/signatures'))) {
            File::makeDirectory(public_path('media/signatures'), 0755, true);
        }

        // Save the signature image to the public/media/signatures directory
        file_put_contents($fullSignaturePath, $data);

        // Create a new FormData instance and save it to the database
        $formData = new FormData();
        $formData->user_id = Auth::id();
        $formData->status = 'Oczekuje'; // Set default status
        $formData->input1 = $validatedData['input1'];
        $formData->input1a = $validatedData['input1a'];
        $formData->input1b = $validatedData['input1b'];
        $formData->input1c = $validatedData['input1c'];
//        $formData->input2 = $validatedData['input2'];
        $formData->input3 = $validatedData['input3'];
        $formData->input3a = $validatedData['input3a'];
        $formData->input4 = $validatedData['input4'];
        $formData->input4a = $validatedData['input4a'];
        $formData->input4b = $validatedData['input4b'];
        $formData->input5 = $validatedData['input5'];
        $formData->input5a = $validatedData['input5a'];
        $formData->input5b = $validatedData['input5b'];
        $formData->input5c = $validatedData['input5c'];
        $formData->input5d = $validatedData['input5d'];
        $formData->input5e = $validatedData['input5e'];
        $formData->input5f = $validatedData['input5f'];
        $formData->input5g = $validatedData['input5g'];
        $formData->input5h = $validatedData['input5h'];
        $formData->input5i = $validatedData['input5i'];
        $formData->input5j = $validatedData['input5j'];
        $formData->input6 = $validatedData['input6'];
        $formData->input6a = $validatedData['input6a'];
        $formData->input6b = $validatedData['input6b'];
        $formData->input6c = $validatedData['input6c'];
        $formData->input6d = $validatedData['input6d'];
        $formData->input6e = $validatedData['input6e'];
        $formData->input7a = $validatedData['input7a'];
        $formData->input7b = $validatedData['input7b'];
        $formData->input7c = $validatedData['input7c'];
        $formData->input8 = $validatedData['input8'];
        $formData->input8a = $validatedData['input8a'];
        $formData->input8b = $validatedData['input8b'];
        $formData->input8c = $validatedData['input8c'];
        $formData->input8d = $validatedData['input8d'];
        $formData->input8e = $validatedData['input8e'];
        $formData->input8f = $validatedData['input8f'];
        $formData->input9 = $validatedData['input9'];
        $formData->input10 = $validatedData['input10'];
        // Save the signature path in the database
        $formData->signature = $signaturePath;
        // Assign other form fields as needed
        $formData->save();

        // Redirect to the success page
        return redirect()->route('form.success')->with('success', 'Form submitted successfully.');
    }
}

