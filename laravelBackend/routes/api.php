<?php

use App\Http\Controllers\Api\Admin\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\ProjectController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Front\ProjectsController;
use App\Http\Controllers\Api\Front\ServicesController;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);

    // services routes 
    Route::get('services', [ServiceController::class, 'index']);
    Route::post('services', [ServiceController::class, 'store']);
    Route::get('services/{id}', [ServiceController::class, 'show']);
    Route::put('services/{id}', [ServiceController::class, 'update']);
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);

    // project routes 
    Route::get('projects', [ProjectController::class, 'index']);
    Route::post('projects', [ProjectController::class, 'store']);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);

    // store image route 
    Route::post('temp-images', [TempImageController::class, 'store']);
});


// front routes / services
Route::get('get-services', [ServicesController::class, 'index']);
Route::get('get-latest-services', [ServicesController::class, 'latest']);


// front routes / projects
Route::get('get-projects', [ProjectsController::class, 'index']);
Route::get('get-latest-projects', [ProjectsController::class, 'latest']);
