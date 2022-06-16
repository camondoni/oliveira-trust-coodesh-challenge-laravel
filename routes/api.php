<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GetCotationFeeController;
use App\Http\Controllers\MakeCotationController;
use App\Http\Controllers\UpdateCotationFeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('auth/login', [AuthController::class, 'login'])->name('auth.login');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('cotation_fee', [GetCotationFeeController::class, 'execute']);
Route::put('cotation_fee', [UpdateCotationFeeController::class, 'execute']);
Route::post('make_cotation', [MakeCotationController::class, 'execute'])->middleware('auth');
