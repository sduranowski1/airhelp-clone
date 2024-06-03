<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\MultiStepFormController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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
//Route::get('/multi-step-form', function (Request $request) {
//    return Inertia::render('MultiStepForm', [
//        'input1' => $request->input('input1'),
//        'input1a' => $request->input('input1a'),
//    ]);
//})->name('multistep.iatas');
Route::post('/multi-step-form/validate-discount', [DiscountController::class, 'validateDiscount'])->name('multistep.validateDiscount');

Route::get('/form-data', [FormController::class, 'index'])->name('form-data.index');

// Define route to handle form submission
Route::post('/multi-step-form/submit', [MultiStepFormController::class, 'submit'])->name('form.submit');
//Route::post('/multi-step-form/submit', [MultiStepFormController::class, 'store']);

Route::get('/success', function () {
    return Inertia::render('Success');
})->name('form.success');


Route::get('/dashboard',  [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::put('/update-status/{id}', [AdminController::class, 'updateStatus'])->name('admin.update-status');

    // Add more admin routes here
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/discounts', [AdminController::class, 'discounts'])->name('admin.discounts');
    Route::get('/discounts/create', [AdminController::class, 'createDiscount'])->name('admin.discounts.create');
    Route::post('/discounts', [AdminController::class, 'storeDiscount'])->name('admin.discounts.store');    // Add edit route for discounts
    Route::get('/discounts/{id}/edit', [AdminController::class, 'editDiscount'])->name('admin.discounts.edit');
    // Add update route for discounts
    Route::put('/discounts/{id}', [AdminController::class, 'updateDiscount'])->name('admin.discounts.update');
    Route::delete('/discounts/{id}', [AdminController::class, 'deleteDiscount'])->name('admin.discounts.delete');

});

require __DIR__.'/auth.php';
