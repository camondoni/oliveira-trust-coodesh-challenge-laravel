<?php

namespace App\Services;

use App\Interfaces\CotationAPIInterface;
use App\Interfaces\CotationFeeInterface;
use Illuminate\Http\Request;
use Mail;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Auth;

class MakeCotationService
{
    private CotationFeeInterface $cotationFeeRepository;
    private CotationAPIInterface $cotationAPIRepository;

    public function __construct(CotationFeeInterface $cotationFeeRepository, CotationAPIInterface $cotationAPIRepository)
    {
        $this->cotationFeeRepository = $cotationFeeRepository;
        $this->cotationAPIRepository = $cotationAPIRepository;
    }

    public function execute(Request $request)
    {
        $cotationFees = $this->cotationFeeRepository->getCotationFee();
        $cotation = $this->cotationAPIRepository->getLastCotation($request->originCurrency, $request->destinationCurrency)->json();
        $cotation = $cotation[key($cotation)];
        $paymentMethodFee = $this->getPaymentMethodFee($request->paymentMethod, $cotationFees['credit_card_fee'], $cotationFees['boleto_fee']);
        $paymentMethodFeeAmount =  $this->calculatePaymetMethodFee($paymentMethodFee, $request->conversionAmount);
        $conversionFee = $this->getConversionFee($request->conversionAmount, $cotationFees['min_value_fee'],  $cotationFees['max_value_fee']);
        $conversionFeeAmount = $this->calculateConversionFee($conversionFee, $request->conversionAmount);
        $conversionAmountWithFees = $this->calculateCotationFee($request->conversionAmount, $paymentMethodFeeAmount, $conversionFeeAmount);
        $purchaseAmount = $this->calculatePurchaseAmount($conversionAmountWithFees, $cotation['bid']);

        $calculatedCotation = array_merge($request->all(), array(
            "paymentMethod" => $request->paymentMethod === "credit" ? "Cartão de Crédito" : "Boleto",
            "conversionAmount" => $this->getPrefix($request->originCurrency) . number_format((float)$request->conversionAmount, 2, '.', ''),
            "currencyDestinyValue" =>  $this->getPrefix($request->destinationCurrency) . number_format((float)$cotation['bid'], 2, '.', ''),
            "purchaseAmount" => $this->getPrefix($request->destinationCurrency) . number_format((float)$purchaseAmount, 2, '.', ''),
            "paymentMethodFee" => $this->getPrefix($request->originCurrency) .  number_format((float)$paymentMethodFeeAmount, 2, '.', ''),
            "conversionFee" => $this->getPrefix($request->originCurrency) . number_format((float)$conversionFeeAmount, 2, '.', ''),
            "conversionWithFee" => $this->getPrefix($request->originCurrency) . number_format((float)$conversionAmountWithFees, 2, '.', '')
        ));

        $this->sendCotationEmail($calculatedCotation);
        return $calculatedCotation;
    }

    private function calculatePurchaseAmount($conversionWithFees, $currencyValue): float
    {
        return $conversionWithFees / $currencyValue;
    }

    private function calculateCotationFee($conversionAmount, $paymentMethodFeeAmount, $conversionFeeAmount): float
    {
        return $conversionAmount - $paymentMethodFeeAmount - $conversionFeeAmount;
    }

    private function calculatePaymetMethodFee(float $fee, float $conversionAmount): float
    {
        return ($conversionAmount * ($fee / 100));
    }

    private function calculateConversionFee(float $fee, float $conversionAmount): float
    {
        return ($conversionAmount * ($fee / 100));
    }

    private function getPaymentMethodFee($paymentMethod, $creditCardFee, $boletoFee): float
    {
        return $paymentMethod === "credit" ?  $creditCardFee : $boletoFee;
    }

    private function getConversionFee($conversionAmount, $minValueFee, $maxValueFee): float
    {
        return $conversionAmount < 3000.00 ?  $minValueFee : $maxValueFee;
    }

    private function getPrefix($currency): string
    {
        if ($currency === "USD") {
            return "$";
        } elseif ($currency === "BRL") {
            return "R$";
        } elseif ($currency === "EUR") {
            return "€";
        } elseif ($currency === "CAD") {
            return "CA$";
        }
    }

    private function sendCotationEmail($cotation): void
    {
        $user = Auth::user();
        $mailData = array_merge(array(
            'title' => 'Sua Cotação da Oliveira Trust Chegou !',
            'body' => 'Sua Cotação está pronta !',
            'user' => $user->name
        ), $cotation);

        Mail::to($user->email)->send(new SendMail($mailData));
    }
}
