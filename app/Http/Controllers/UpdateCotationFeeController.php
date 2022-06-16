<?php

namespace App\Http\Controllers;

use App\Services\UpdateCotationFeeService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UpdateCotationFeeRequest;

class UpdateCotationFeeController extends Controller
{
    private UpdateCotationFeeService $UpdateCotationFeeService;

    public function __construct(UpdateCotationFeeService $updateCotationFeeService)
    {
        $this->updateCotationFeeService = $updateCotationFeeService;
    }
    public function execute(UpdateCotationFeeRequest $request): JsonResponse
    {
        $cotationFee = $this->updateCotationFeeService->execute($request);
        return response()->json([
            'errors' => false,
            'errorsMessage' => [],
            'data'  => $cotationFee
        ], 204);
    }
}
