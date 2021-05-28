<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class marginPriceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'margin' => $this->margin,
            'user_id' => $this->user_id,
            'id' => $this->id,
            'isDone' =>  $this->isDone,

        ];
    }
}
