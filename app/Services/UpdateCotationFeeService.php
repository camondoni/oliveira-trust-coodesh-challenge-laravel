<?php

namespace App\Services;

use App\Interfaces\CotationFeeInterface;
use Illuminate\Http\Request;

class UpdateCotationFeeService
{
    private CotationFeeInterface $cotationFeeRepository;

    public function __construct(CotationFeeInterface $cotationFeeRepository)
    {
        $this->cotationFeeRepository = $cotationFeeRepository;
    }

    public function execute(Request $request)
    {
        return $this->cotationFeeRepository->updateCotationFee($request);
    }
}
