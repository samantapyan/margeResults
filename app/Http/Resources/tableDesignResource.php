<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class tableDesignResource extends JsonResource
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
            'image' => $this-> image,
            'isActive' => $this->isActive,
            'id' => $this->id
        ];
    }
}
