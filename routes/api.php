<?php

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

Route::post('token', 'Auth\VerificationController@token');

Route::middleware('auth.app:api')->group(function () {
    Route::delete('token', 'Auth\VerificationController@deleteToken');
    Route::get('newsfeed', 'ArticleController@index');
    Route::post('map', 'MapController@region');
    Route::post('track', 'MapController@track');
});
