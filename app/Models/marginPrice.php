<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\margeUser;
class marginPrice extends Model
{
    use HasFactory;
    protected $guarded = [];


    protected $casts = [
      "isDone" => "boolean"
    ];
   public function getUser()
   {
        return $this->belongsTo(margeUser::class);
    }
}
