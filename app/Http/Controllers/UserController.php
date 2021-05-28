<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\margeUserResource;
use App\Models\Faq;
use App\Models\News;
use App\Models\styleProject;
use App\Models\User;
use App\Models\margeUser;
use App\Models\marginPrice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

//        $users = margeUser::get();
//
//        foreach ($users as $user) {
//            $user->marge = json_decode($user->marge);
//
//        }
//
//
//        return response()->json([
//            "data" =>$users
//        ]);


        $news = margeUser::get();

        return margeUserResource::collection($news);


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
        $dat = $request->all();
        $date=date_create($request->margeTime);
        $d = date_format($date,"Y/m/d H:i:s");
        $request->merge([
            'margeTime' =>  $d,
        ]);

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'margeTime' => 'required'
        ]);

//        $validator->validate()->marge = [];

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'errors' => $errors
            ], 400);
        }

        $user = margeUser::create([
            'name' => $request->name,
            'marge' =>  json_encode($request->marge),
            'margeTime' => $request->margeTime
        ]);

        return new margeUserResource($user);
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
    public function addMargin(Request $request){

//        $data = margeUser::where('id',$request->id)->first();
//        $margeData = json_decode($data->marge);
//         $newAll[] = $data->marge;
//         $allD = [];
//             $allD = ["actionDate" => $request->actionId, "price" => $request->price , "isDone" =>$request->isDone ];
//        $newAll[] =  $allD;
        $request->marge =  json_encode($request->marge);
//             dd($margeData);
//        $data->marge = $data->marge + $request->price;

        margeUser::where('id', $request->id)->update(["marge" => $request->marge]);
        return ['price' =>$request->marge];
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request;

        $d=date_create($request->margeTime);

        $data->margeTime = date_format($d,"Y/m/d H:i:s");


        margeUser::where('id', $id)->update([
            'name' =>  $data->name,
            'marge' =>   $data->marge,
            'margeTime' =>  $data->margeTime
        ]);
//dd(margeUser::findOrFail($id)->getMarginPrices());
        return new margeUserResource(margeUser::findOrFail($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */





    public function destroy($id)
    {

        $user = margeUser::findOrFail($id);

        $deleteType = null;
        $user->forceDelete();


        return response()->json([
            'status' => true,
            'deleteType' => $deleteType,
            'message' => 'User has been deleted successfully!'
        ], 200);
    }
}




