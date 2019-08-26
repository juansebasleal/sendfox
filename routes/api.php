<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('emails', 'EmailsController@list');
// Route::get('emails/list', 'EmailsController@list');
// Route::get('emails/create', 'EmailsController@new');
// Route::post('emails/create', 'EmailsController@save');
// Route::get('emails/view/{id}', 'EmailsController@show');

Route::get('emails', 'EmailsController@list');
// Route::get('emails/create', 'EmailsController@create');
Route::post('emails/create', 'EmailsController@create');
Route::get('emails/view/{id}', 'EmailsController@view');

// Route::post('emails', 'EmailsController@save');
// Route::get('emails/{id}', 'EmailsController@show');