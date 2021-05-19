<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
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
Route::view('/', 'welcome');
Route::view('/dashboard', 'welcome');
Route::view('/auth/sign-in', 'welcome');

    Route::get('/logout', function(){
       Auth::logout();
       return redirect('/');
    })->name('logout');
//Route::get('/auth/sign-in', function(){
//    return view('login');
//})->name('login');

//Route::name('user.')->group(function(){
//   Route::view('/mergeResults', 'mergeResults')->middleware('auth')->name('mergeResults');
//    Route::get('/login', function(){
//       if (Auth::check()){
//           return redirect(route('user.mergeResults'));
//       }
//       return view('login');
//    })->name('login');
//    Route::get('/auth/sign-in', function(){
//        if (Auth::check()){
//            return redirect(route('user.mergeResults'));
//        }
//        return view('login');
//    })->name('login');
//
//
//
//    Route::get('/registration', function(){
//        if (Auth::check()){
//            return redirect(route('user.mergeResults'));
//        }
//        return view('registration');
//    })->name('registration');
//
//
//
//
//
//    Route::post('/login', [LoginController::class, 'login'] )->name('login');
//    Route::get('/logout', function(){
//       Auth::logout();
//       return redirect('/');
//    })->name('logout');
//    Route::post('registration', [RegisterController::class, 'save']);
//});

//Route::get('/', function () {
//    return view('welcome');
//});
