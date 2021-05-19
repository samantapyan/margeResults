<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'admin'], function () {

    Route::get('/logout', function(){
        Auth::logout();
    })->name('logout');
    Route::post('/login', [LoginController::class, 'login'] )->name('login');
    Route::post('registration', [RegisterController::class, 'save']);
    Route::get('logout', [LoginController::class, 'logout']);


    Route::get('users/get-all', [UserController::class, 'getAll']);
    Route::post('users/{id}', [UserController::class, 'update']);
    Route::resource('users', UserController::class);





//    Route::post('/forgot-password', [AdminController::class, 'forgotPassword']);

//    Route::group(['middleware' => ['jwt.verify:admin']], function () {



//
//        Route::get('me', [AdminController::class, 'userProfile']);
//        //language
//        Route::get('language/get-all', [LanguageController::class, 'getAll']);
//        Route::get('language/{id}/restore', [LanguageController::class, 'restore']);
//        Route::resource('language', LanguageController::class);
//        //faq-category
//        Route::get('faq-category/get-all', [FaqCategoryController::class, 'getAll']);
//        Route::get('faq-category/{id}/restore', [FaqCategoryController::class, 'restore']);
//        Route::resource('faq-category', FaqCategoryController::class);
//        //faq
//        Route::get('faq/get-all', [FaqController::class, 'getAll']);
//        Route::get('faq/{id}/restore', [FaqController::class, 'restore']);
//        Route::resource('faq', FaqController::class);
//        //news
//        Route::get('news/get-all', [NewsController::class, 'getAll']);
//        Route::get('news/{id}/restore', [NewsController::class, 'restore']);
//        Route::post('news/{id}', [NewsController::class, 'update']);
//        Route::resource('news', NewsController::class);
//
//        //video
//        Route::get('video/{id}/restore', [VideoController::class, 'restore']);
//        Route::resource('video', VideoController::class);
//
//        //Dynamic pages with Texts
//        Route::get('dynamic-page/{id}/restore', [DynamicPageController::class, 'restore']);
//        Route::get('dynamic-page/get-all', [DynamicPageController::class, 'getAll']);
//        Route::resource('dynamic-page', DynamicPageController::class);
//
//        Route::get('dynamic-page-text/{id}/restore', [DynamicPageTextController::class, 'restore']);
//        Route::resource('dynamic-page-text', DynamicPageTextController::class,);
//    });
});



//Route::name('user.')->group(function(){
//    Route::view('/mergeResults', 'mergeResults')->middleware('auth')->name('mergeResults');
//    Route::get('/login', function(){
//        if (Auth::check()){
//            return redirect(route('user.mergeResults'));
//        }
//        return view('login');
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
//        Auth::logout();
//        return redirect('/');
//    })->name('logout');
//    Route::post('registration', [RegisterController::class, 'save']);
//});