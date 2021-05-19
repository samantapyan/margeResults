<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\margeUserResource;
use App\Models\Faq;
use App\Models\News;
use App\Models\User;
use App\Models\margeUser;
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
        $users = margeUser::get();

        return margeUserResource::collection($users);
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
            'name' => 'required',
            'marge' => 'required'
        ]);
dd($request->all());
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'errors' => $errors
            ], 400);
        }

        $user = margeUser::create($validator->validate());

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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();


        margeUser::where('id', $id)->update($data);

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




