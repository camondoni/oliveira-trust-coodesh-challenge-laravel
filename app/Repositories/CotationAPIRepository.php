<?php

namespace App\Repositories;

use App\Interfaces\CotationAPIInterface;
use Illuminate\Support\Facades\Http;

class CotationAPIRepository implements CotationAPIInterface
{
    public function getLastCotation($originCurrency, $destinationCurrency)
    {
        return Http::get("https://economia.awesomeapi.com.br/last/{$destinationCurrency}-{$originCurrency}");
    }
}
