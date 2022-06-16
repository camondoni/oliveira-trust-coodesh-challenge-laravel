<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface CotationFeeInterface
{
    public function getCotationFee();
    public function updateCotationFee(Request $request);
}
