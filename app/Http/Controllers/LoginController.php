<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request) {

//        if (Auth::check()){
//            return response()->json(['message' => 'Already logined'], 400);
////            return redirect()->intended('mergeResults');
//        }
//        $formFields = $request->only(['email', 'password']);
//       dd(Auth::attempt($formFields));
//        if (Auth::attempt($formFields)) {
//            return response()->json(['message' => 'Good'], 200);
////            return redirect()->intended('mergeResults');
//        }
//        return response()->json(['message' => 'Error'], 400);

//        $validator = Validator::make($request->all(), [
//            'email'    => 'required|email',
//            'password' => 'required|string|min:6',
//        ]);
//
//        if ($validator->fails()) {
//            return response()->json($validator->errors(), 422);
//        }
//        dd($validator);
//        if (!$token = auth()->attempt($validator->validated())) {
//            return response()->json([
//                'error'   => 'incorrect_credentials',
//                'message' => 'Incorrect email or password!'
//            ], 500);
//        }
//        return response()->json($this->createNewToken($token), 200);
    }


    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out'], 200);
    }


}
