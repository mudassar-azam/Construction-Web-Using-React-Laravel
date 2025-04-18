<?php

use App\Http\Controllers\Api\Admin\BlogController;
use App\Http\Controllers\Api\Admin\TempImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\ProjectController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Admin\TeamMemberController;
use App\Http\Controllers\Api\Admin\TestimonialController;
use App\Http\Controllers\Api\Front\BlogsController;
use App\Http\Controllers\Api\Front\ProjectsController;
use App\Http\Controllers\Api\Front\ServicesController;
use App\Http\Controllers\Api\Front\TestimonialsController;

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


    // blog routes 
    Route::get('blogs', [BlogController::class, 'index']);
    Route::post('blogs', [BlogController::class, 'store']);
    Route::get('blogs/{id}', [BlogController::class, 'show']);
    Route::put('blogs/{id}', [BlogController::class, 'update']);
    Route::delete('blogs/{id}', [BlogController::class, 'destroy']);


    // testimonial routes 
    Route::get('testimonials', [TestimonialController::class, 'index']);
    Route::post('testimonials', [TestimonialController::class, 'store']);
    Route::get('testimonials/{id}', [TestimonialController::class, 'show']);
    Route::put('testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);


    // team members routes 
    Route::get('team-members', [TeamMemberController::class, 'index']);
    Route::post('team-members', [TeamMemberController::class, 'store']);
    Route::get('team-members/{id}', [TeamMemberController::class, 'show']);
    Route::put('team-members/{id}', [TeamMemberController::class, 'update']);
    Route::delete('team-members/{id}', [TeamMemberController::class, 'destroy']);

    // store image route 
    Route::post('temp-images', [TempImageController::class, 'store']);
});


// front routes / services
Route::get('get-service/{id}', [ServicesController::class, 'service']);
Route::get('get-services', [ServicesController::class, 'index']);
Route::get('get-latest-services', [ServicesController::class, 'latest']);


// front routes / projects
Route::get('get-project/{id}', [ProjectsController::class, 'project']);
Route::get('get-projects', [ProjectsController::class, 'index']);
Route::get('get-latest-projects', [ProjectsController::class, 'latest']);


// front routes / blogs
Route::get('get-blog/{id}', [BlogsController::class, 'blog']);
Route::get('get-blogs', [BlogsController::class, 'index']);
Route::get('get-latest-blogs', [BlogsController::class, 'latest']);

// front routes / blogs
Route::get('get-testimonials', [TestimonialsController::class, 'index']);
Route::get('get-latest-testimonials', [TestimonialsController::class, 'latest']);

Route::get('team-members', [TeamMemberController::class, 'index']);


