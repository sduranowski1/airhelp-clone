<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Discount;
use Faker\Factory as Faker;

class DiscountsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Generate 10 random discounts
        for ($i = 0; $i < 10; $i++) {
            Discount::create([
                'code' => $faker->unique()->word,
                'description' => $faker->sentence,
                'amount' => $faker->randomFloat(2, 1, 100),
                'start_date' => $faker->dateTimeBetween('-1 month', '+1 month'),
                'end_date' => $faker->dateTimeBetween('+1 month', '+3 months')
            ]);
        }
    }
}

