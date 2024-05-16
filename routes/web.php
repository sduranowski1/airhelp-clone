<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\MultiStepFormController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Define route to render the page with the multi-step form
Route::get('/multi-step-form', [MultiStepFormController::class, 'index'])->name('multistep.index');

Route::get('/form-data', [FormController::class, 'index'])->name('form-data.index');

// Define route to handle form submission
Route::post('/multi-step-form/submit', [MultiStepFormController::class, 'submit']);
Route::post('/multi-step-form/submit', [MultiStepFormController::class, 'store']);

Route::get('/success', function () {
    return Inertia::render('Success');
})->name('success');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    // Add more admin routes here
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
});

require __DIR__.'/auth.php';
