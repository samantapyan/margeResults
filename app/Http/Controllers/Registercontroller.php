<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RegisterController extends Controller
{
    public function save(Request $request){
        if (Auth::check()){
            return redirect(route('user.mergeResults'));
        }
      ;
        $vals = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required'
        ]);
        $user = User::create($vals);

        if ($user) {
            Auth::login($user);
            return redirect(route('user.mergeResults'));
        }
        return redirect(route('user.login'))->withErrors([
            'formError' => 'error ... check it again!'
        ]);
    }
}
