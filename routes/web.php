<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

// Basic controllers
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/emails_list', 'EmailsController@index');

// For Email Management react component
Route::get('emails/{path?}', 'EmailsController@management');
Route::get('emails/{path?}/{id?}', 'EmailsController@management');