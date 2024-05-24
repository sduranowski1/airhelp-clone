<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\FormData;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $formData = FormData::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/Dashboard', ['formData' => $formData]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required|in:Oczekuje,Odrzucone,Zatwierdzone', // Adjust validation rules as needed
            // Add validation rules for other form fields
        ]);

        // Create new FormData instance and save to database
        $formData = FormData::create($validatedData);

        // Optionally, return a response or redirect
    }

    public function update(Request $request, FormData $formData)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required|in:Oczekuje,Odrzucone,Zatwierdzone', // Adjust validation rules as needed
            // Add validation rules for other form fields
        ]);

        // Update the FormData instance with the validated data
        $formData->update($validatedData);

        // Optionally, return a response or redirect
    }

    public function destroy(FormData $formData)
    {
        $formData->delete();

        // Optionally, return a response or redirect
    }

    public function users()
    {
        $userData = User::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/UserTable',['userData' => $userData]);
    }

    public function discounts()
    {
        $discountData = Discount::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/DiscountTable',['discountData' => $discountData]);
    }
}
