<?php

namespace App\Http\Controllers;

use App\Http\Resources\ColorRescource;
use App\Http\Resources\styleResource;
use App\Models\Color;
use App\Models\styleProject;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function setActiveColor(Request $request){
        $active = Color::where('name', $request->name)->first();
        if ($active) {
            $font = Color::where('name', $request->name)->update(['color' =>  $request->color]);
        } else {
            Color::create([
                'color' => $request->color,
                'name' =>   $request->name,
            ]);
        }
        return new ColorRescource($request);
    }
     public function getActiveColor(Request $request){


         $color = Color::where('name', $request->name)->first();

         return new ColorRescource($color);
     }
}
