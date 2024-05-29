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

    public function updateStatus(Request $request, $id)
    {
        $status = $request->input('status');

        // Update status in the database
        $row = FormData::findOrFail($id);
        $row->status = $status;
        $row->save();

        return response()->json(['message' => 'Status updated successfully']);
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

    public function createDiscount()
    {
        return Inertia::render('Admin/DiscountCreate');
    }

    public function storeDiscount(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:discounts|max:255',
            'description' => 'required',
            'end_date' => 'required|date',
        ]);

        Discount::create($request->all());

        return redirect()->route('admin.discounts');
    }

    public function editDiscount($id)
    {
        $discount = Discount::findOrFail($id);
        return Inertia('Admin/DiscountEdit', ['discount' => $discount]);
    }

    public function updateDiscount(Request $request, $id)
    {
        $discount = Discount::findOrFail($id);
        $discount->update($request->all());
        return redirect()->route('admin.discounts');
    }

    public function deleteDiscount($id)
    {
        $discount = Discount::findOrFail($id);
        $discount->delete();

        return response()->json(['success' => 'Discount deleted successfully']);
    }
}
