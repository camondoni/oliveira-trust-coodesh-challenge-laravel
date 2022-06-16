<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CotationFee extends Model
{
    use HasFactory;
    protected $table = "cotation_fee";
    protected $fillable = [
        'credit_card_fee',
        'boleto_fee',
        'min_value_fee',
        'max_value_fee'
    ];
}
