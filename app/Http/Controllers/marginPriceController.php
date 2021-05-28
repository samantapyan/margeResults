<?php

namespace App\Http\Controllers;

use App\Http\Resources\margeUserResource;
use App\Http\Resources\marginPriceResource;
use App\Models\margeUser;
use Illuminate\Http\Request;
use App\Models\marginPrice;
use Illuminate\Support\Facades\Validator;

class marginPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'margin' => 'required',
            'isDone' => 'required',
            'user_id' => 'required'
        ]);

//        $validator->validate()->marge = [];

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'errors' => $errors
            ], 400);
        }

        $user = marginPrice::create([
            'margin' => $request->margin,
            'id' => $request->id,
            'isDone' => $request->isDone ,
            'user_id' => $request->user_id
        ]);

        return new marginPriceResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePrice(Request $request, $id)
    {

        $data = $request;
//        dd(marginPrice::where('id', $id)->get());
        $d = marginPrice::where('id', $id)->update(["isDone" => $request->isDone]);
//        return new marginPriceResource(marginPrice::findOrFail($id));

        return response()->json([
            'status' => "ok",
            'data' => $d
        ], 200);
    }

    public function clean(){
        marginPrice::whereNotNull('id')->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $flight = marginPrice::find($id);

        $flight->delete();
    }
}
