<?php

namespace App\Repositories;

use App\Interfaces\CotationFeeInterface;
use App\Models\CotationFee;
use Illuminate\Http\Request;

class CotationFeeRepository implements CotationFeeInterface
{
    public function getCotationFee()
    {
        return CotationFee::select('credit_card_fee', 'boleto_fee', 'min_value_fee', 'max_value_fee')->firstOrFail();
    }

    public function updateCotationFee(Request $request)
    {
        $cotationFee = CotationFee::select('id')->firstOrFail();
        $cotationFeeData = ['credit_card_fee' => $request->creditCardFee, 'boleto_fee' => $request->boletoFee, 'min_value_fee' => $request->minValueFee, 'max_value_fee' => $request->maxValueFee, 'updated_at' => new \DateTime()];
        return CotationFee::where('id', $cotationFee->id)->update($cotationFeeData);
    }
}
