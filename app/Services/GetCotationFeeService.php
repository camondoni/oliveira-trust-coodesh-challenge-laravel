<?php

namespace App\Services;

use App\Interfaces\CotationFeeInterface;

class GetCotationFeeService
{
    private CotationFeeInterface $cotationFeeRepository;

    public function __construct(CotationFeeInterface $cotationFeeRepository)
    {
        $this->cotationFeeRepository = $cotationFeeRepository;
    }

    public function execute()
    {
        return $this->cotationFeeRepository->getCotationFee();
    }
}
