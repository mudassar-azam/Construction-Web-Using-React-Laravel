<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\Admin\DashboardController;

Route::post('authenticate',[AuthenticationController::class,'authenticate']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']] , function(){
    Route::get('authenticate',[DashboardController::class,'authenticate']);
});
