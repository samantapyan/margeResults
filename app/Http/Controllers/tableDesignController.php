<?php

namespace App\Http\Controllers;

use App\Http\Resources\tableDesignResource;
use App\Models\styleProject;
use Illuminate\Http\Request;
use App\Models\tableDesign;
use Illuminate\Support\Facades\Validator;

class tableDesignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $image = tableDesign::orderBy('created_at')->get();
        return response()->json($image);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($request->file('image') !== null) {
            $file = $request->file('image');
            $fileName = '/images/' . $file->getClientOriginalName();
            $file->move(public_path('images'), $fileName);
            $pic = $fileName;
            tableDesign::create([
                'image' => $pic,
                'isActive' => $request->isActive === 'true' || $request->isActive === true ? true : false
            ]);
            return response()->json(['message' => 'ok']);
        } else {
            dd($request->file('image'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($request, $id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'image' => 'required',
            'isActive' => 'required'
        ]);

        $image = tableDesign::where('id', $id)->update($request);

        if ($image) {
            return new tableDesignResource($image);
        }
    }


    public function changeActive(Request $request, $id)
    {


        tableDesign::where('isActive', 1)->update(['isActive' => 0]);


        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'image' => 'required',
            'isActive' => 'required'
        ]);

        tableDesign::where('id', $id)->update($validator->validate());
        return response()->json(['status'=>'ok']);

    }
    public function getActiveImageLine(Request $request){
        $data = tableDesign::where('isActive', 1)->first();
        return  $data;
    }

//    public function getActiveImageLine(Request $request)
//    {
//
//        $data = tableDesign::where('isActive', 1)->first();
//
//        return response()->json(['something'=>'aaaaaaaaaaaaaaaaaa']);
//    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}







































//namespace App\Http\Controllers;
//
//use Illuminate\Http\Request;
//use App\Models\tableDesign;
//class projectStyleController extends Controller
//{
//    /**
//     * Display a listing of the resource.
//     *
//     * @return \Illuminate\Http\Response
//     */
//    public function index()
//    {
//        $image = tableDesign::orderBy('created_at')->get();
//
////        $image[0]->image = json_decode($image[0]->image);
//
//        return response()->json($image);
//    }
//
//    /**
//     * Show the form for creating a new resource.
//     *
//     * @return \Illuminate\Http\Response
//     */
//    public function create()
//    {
//        //
//    }
//
//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param \Illuminate\Http\Request $request
//     * @return \Illuminate\Http\Response
//     */
//    public function store(Request $request)
//    {
//
//        if ($request->file('image') !== null) {
//            $file = $request->file('image');
//            $fileName = '/images/' . $file->getClientOriginalName();
//            $file->move(public_path('images'), $fileName);
//            $pic = $fileName;
//            tableDesign::create([
//                'image' => $pic
//            ]);
//            return response()->json(['message' => 'ok']);
//        } else {
//            dd($request->file('image'));
//        }
//    }
//
//    /**
//     * Display the specified resource.
//     *
//     * @param int $id
//     * @return \Illuminate\Http\Response
//     */
//    public function show($id)
//    {
//        //
//    }
//
//    /**
//     * Show the form for editing the specified resource.
//     *
//     * @param int $id
//     * @return \Illuminate\Http\Response
//     */
//    public function edit($id)
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param \Illuminate\Http\Request $request
//     * @param int $id
//     * @return \Illuminate\Http\Response
//     */
//    public function update(Request $request, $id)
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param int $id
//     * @return \Illuminate\Http\Response
//     */
//    public function destroy($id)
//    {
//        //
//    }
//}

























