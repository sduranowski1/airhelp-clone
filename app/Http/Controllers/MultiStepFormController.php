<?php

namespace App\Http\Controllers;

use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MultiStepFormController extends Controller
{
    public function index()
    {
        return Inertia::render('MultiStepForm');
    }

    public function submit(Request $request)
    {
        // Validate form data
        $validatedData = $request->validate([
//            'input1' => 'required|string|max:255',
//            'input1a' => 'required|string|max:255',
////            'input1b' => 'required|string|max:255',
////            'input1c' => 'required|string|max:255',
            'input2' => 'required|string|max:255',
            'input3' => 'string|max:255',
            'input3a' => 'string|max:255',
//            'input4' => 'required|string|max:255',
//            'input4a' => 'required|string|max:255',
//            'input4b' => 'required|string|max:255',
//            'input6' => 'required|string|max:255',
//            'input6a' => 'required|string|max:255',
//            'input6b' => 'required|string|max:255',
//            'input8' => 'required|string|max:255',
//            'input8a' => 'required|string|max:255',
//            'input8b' => 'required|string|max:255',
//            'input8c' => 'required|string|max:255',
//            'input8d' => 'required|string|max:255',
//            'input8e' => 'required|string|max:255',
//            'input8f' => 'required|string|max:255',
//            'input9' => 'required|string|max:255',
            // Add validation rules for other fields
        ]);

        // Create a new FormData instance and save it to the database
        $formData = new FormData();
        $formData->user_id = Auth::id();
//        $formData->input1 = $validatedData['input1'];
//        $formData->input1a = $validatedData['input1a'];
////        $formData->input1b = $validatedData['input1b'];
////        $formData->input1c = $validatedData['input1c'];
        $formData->input2 = $validatedData['input2'];
        $formData->input3 = $validatedData['input3'];
        $formData->input3a = $validatedData['input3a'];
//        $formData->input4 = $validatedData['input4'];
//        $formData->input4a = $validatedData['input4a'];
//        $formData->input4b = $validatedData['input4b'];
//        $formData->input6 = $validatedData['input6'];
//        $formData->input6a = $validatedData['input6a'];
//        $formData->input6b = $validatedData['input6b'];
//        $formData->input8 = $validatedData['input8'];
//        $formData->input8a = $validatedData['input8a'];
//        $formData->input8b = $validatedData['input8b'];
//        $formData->input8c = $validatedData['input8c'];
//        $formData->input8d = $validatedData['input8d'];
//        $formData->input8e = $validatedData['input8e'];
//        $formData->input8f = $validatedData['input8f'];
//        $formData->input9 = $validatedData['input9'];
        // Assign other form fields as needed
        $formData->save();

        // Redirect back to the form page with a success message
        return redirect('/multi-step-form')->with('success', 'Form submitted successfully.');
    }

}

