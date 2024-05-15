<?php

use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/save_form_data', [FormController::class, 'saveFormData']);
