<?php

namespace App\Interfaces;

interface CotationAPIInterface
{
    public function getLastCotation(String $originCurrency, String $destinationCurrency);
}
