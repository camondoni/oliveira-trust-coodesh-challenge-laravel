<?php

namespace Database\Seeders;

use App\Models\CotationFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CotationFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        CotationFee::insert([
            'credit_card_fee' => 7.63,
            'boleto_fee' => 1.45,
            'min_value_fee' => 2.0,
            'max_value_fee' => 1.0,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
