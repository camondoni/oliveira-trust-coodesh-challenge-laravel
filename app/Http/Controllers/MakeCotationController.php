<?php

namespace App\Http\Controllers;

use App\Http\Requests\MakeCotationRequest;
use App\Services\MakeCotationService;
use Illuminate\Http\JsonResponse;


class MakeCotationController extends Controller
{
    private MakeCotationService $makeCotationService;

    public function __construct(MakeCotationService $makeCotationService)
    {
        $this->makeCotationService = $makeCotationService;
    }
    public function execute(MakeCotationRequest $request): JsonResponse
    {
        $cotation = $this->makeCotationService->execute($request);
        return response()->json([
            'errors' => false,
            'errorsMessage' => [],
            'data'  => $cotation
        ]);
    }
}
