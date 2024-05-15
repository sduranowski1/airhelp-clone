<?php

namespace App\Http\Controllers;

use App\Models\FormData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $formData = FormData::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/Dashboard', ['formData' => $formData]);
    }
}
