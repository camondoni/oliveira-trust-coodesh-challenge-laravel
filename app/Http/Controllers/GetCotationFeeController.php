<?php

namespace App\Http\Controllers;

use App\Services\GetCotationFeeService;
use Illuminate\Http\JsonResponse;


class GetCotationFeeController extends Controller
{
    private GetCotationFeeService $getCotationFeeService;

    public function __construct(GetCotationFeeService $getCotationFeeService)
    {
        $this->getCotationFeeService = $getCotationFeeService;
    }
    public function execute(): JsonResponse
    {
        $cotationFee = $this->getCotationFeeService->execute();
        return response()->json([
            'errors' => false,
            'errorsMessage' => [],
            'data'  => $cotationFee
        ]);
    }
}
