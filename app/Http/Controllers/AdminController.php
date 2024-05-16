<?php

namespace App\Http\Controllers;

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

    public function users()
    {
        $userData = User::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/UserTable',['userData' => $userData]);
    }
}
