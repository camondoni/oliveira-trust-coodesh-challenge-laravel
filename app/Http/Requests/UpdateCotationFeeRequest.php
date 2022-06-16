<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UpdateCotationFeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }


    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = new JsonResponse([
            'errors' => true,
            'errorsMessage' => $validator->errors()->all(),
            'data' => []
        ], Response::HTTP_BAD_REQUEST);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'creditCardFee' => 'required|numeric|between:0,100.00',
            'boletoFee' => 'required|numeric|between:0,100.00',
            'minValueFee' => 'required|numeric|between:0,100.00',
            'maxValueFee' => 'required|numeric|between:0,100.00',
        ];
    }
}
