<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormData;
use Inertia\Inertia;

// Import your model

class FormController extends Controller
{
    public function index()
    {
        $formData = FormData::all(); // Fetch all data from form_data table
        dd($formData);
        return Inertia::render('FormDataTable', ['formData' => $formData]);
    }
//    public function saveFormData(Request $request)
//    {
//        // Validate incoming request data if needed
//        $validatedData = $request->validate([
//            // Define validation rules for your form fields
//        ]);
//
//        // Save form data to the database
//        $formData = new FormData();
//        $formData->input1 = $request->input('input1');
//        $formData->input1a = $request->input('input1a');
//        // Assign other form fields similarly
//        $formData->save();
//
//        // Return a response indicating success or failure
//        return response()->json(['message' => 'Form data saved successfully'], 200);
//    }
}
