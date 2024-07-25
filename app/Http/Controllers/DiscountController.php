<?php

// app/Http/Controllers/DiscountController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    public function validateDiscount(Request $request)
    {
        $code = $request->input('input10');
        $discount = Discount::where('code', $code)->first();

        if ($discount) {
            return response()->json(['valid' => true, 'message' => 'Poprawny kod rabatowy']);
        } else {
            return response()->json(['valid' => false, 'message' => 'Niepoprawny kod rabatowy lub jego brak']);
        }
    }
}
