<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\FormData;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $dashFormData = FormData::where('user_id', Auth::id())->get();
        Log::info('dashFormData:', ['dashFormData' => $dashFormData]);

        return Inertia::render('Dashboard', [
            'auth' => Auth::user(),
            'dashFormData' => $dashFormData
        ]);
    }
}
