<?php

namespace App\Http\Controllers;

use App\Models\FormData;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $userData = User::all(); // Fetch all data from form_data table
        return Inertia::render('Admin/UserTable',compact('userData'));
    }
}
